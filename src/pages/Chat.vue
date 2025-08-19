<template>
  <div class="app-container" :class="{ 'has-dialog': dialog?.length }">
    <ElScrollbar
        v-if="dialog?.length"
        class="dialog-panel"
        :class="{ 'has-file': files?.length > 0 }"
    >
      <div v-for="item in dialog" style="margin-bottom: 20px">
        <QueryBox :question="item?.question" :files="item?.files" />
        <ResultBox :answer="item?.answer" />
      </div>
    </ElScrollbar>

    <div class="question-input-wrapper" :class="{ 'is-fixed': dialog?.length }">
      <QuestionInput
          v-model="files"
          :has-dialog="dialog?.length !== 0"
          @update-dialog="updateDialog"
          @clear-history="onClearHistory"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import QuestionInput from "../components/QuestionInput.vue";
import QueryBox from "../components/QueryBox.vue";
import ResultBox from "../components/ResultBox.vue";
import { onMounted, ref } from "vue";
import type { Dialog, File } from "../shared/types";
import { ElNotification } from "element-plus";

const answer = "ответ";
const dialog = ref<Dialog[]>([]);
const files = ref<File[] | []>([]);

const onClearHistory = () => {
  dialog.value = [];
  localStorage.removeItem("dialog");
};

const updateDialog = (question?: string, fileList?: File[] | []) => {
  const fileListNames = fileList?.map((f) => f?.name);
  const hasDuplicateFile = dialog.value?.some((d) =>
      d.files?.some((f) => fileListNames?.includes(f.name))
  );
  let filesToSave: File[] | [] = [];

  if (hasDuplicateFile) {
    ElNotification({
      title: "Ошибка",
      message: "Файл с таким же наименованием уже загружен!",
      type: "error",
    });
    return;
  }

  if (fileList?.length) {
    filesToSave = fileList?.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }));
  } else {
    filesToSave = [];
  }

  dialog.value.push({ question, files: filesToSave, answer });
  localStorage.setItem("dialog", JSON.stringify(dialog.value));
  files.value = [];
};

onMounted(async () => {
  const localDialog = localStorage.getItem("dialog");
  dialog.value = localDialog ? JSON.parse(localDialog) : [];
});
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 60%;
}

.app-container.has-dialog {
  justify-content: space-between;
}

.dialog-panel {
  height: 74vh;
  margin-bottom: 10px;
  border-radius: 4px;
  margin-top: 2rem;
  background: #fcf9c4;
}

.dialog-panel.has-file {
  height: calc(71vh - 70px);
}

.question-input-wrapper {
  background: #741504;
  margin-top: 10px;
  border-radius: 4px;
}

.question-input-wrapper.is-fixed {
  position: fixed;
  bottom: 2rem;
  left: 20%;
  right: 20%;
}

:deep(.el-scrollbar__wrap) {
  padding: 10px;
}
</style>
