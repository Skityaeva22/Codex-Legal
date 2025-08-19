<template>
  <div
      class="app-container"
      :class="{ 'has-dialog': dialog?.length }"
  >
    <ElScrollbar
        v-if="dialog?.length"
        class="dialog-panel"
        :class="{ 'has-file': file }"
    >
      <div v-for="item in dialog" style="margin-bottom: 20px;">
        <QueryBox :question="item?.question" :file="item?.file" />
        <ResultBox :answer="item?.answer" />
      </div>
    </ElScrollbar>

    <div
        class="question-input-wrapper"
        :class="{ 'is-fixed': dialog?.length }"
    >
      <QuestionInput
          v-model="file"
          :has-dialog="dialog?.length !== 0"
          @update-dialog="updateDialog"
          @clear-history="dialog = []"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import QuestionInput from "../../components/QuestionInput.vue";
import QueryBox from "../../components/QueryBox.vue";
import ResultBox from "../../components/ResultBox.vue";
import {ref} from "vue";
import type {Dialog} from "../../shared/types";
import {ElNotification} from "element-plus";

const answer = "ответ";
const dialog = ref<Dialog[]>([]);
const file = ref<File | undefined>();

const updateDialog = (question?: string, fileInfo?: File) => {
  if (dialog.value?.find((item) => item.file && item.file?.name === fileInfo?.name)) {
    return ElNotification({
      title: 'Ошибка',
      message: 'Файл с таким же наименованием уже загружен!',
      type: 'error',
    });
  }

  dialog.value.push({ question, file: fileInfo, answer });
  file.value = undefined;
};
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
  height: 75vh;
  margin-bottom: 10px;
  border-radius: 4px;
  margin-top: 2rem;
  background: #fcf9c4;
}

.dialog-panel.has-file {
  height: calc(75vh - 70px);
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
