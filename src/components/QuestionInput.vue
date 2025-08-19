<template>
  <div style="display: flex; align-items: center;">
    <ElScrollbar v-if="files?.length" style="height: 90px;">
      <div class="scrollbar-flex-content">
        <FileCard
            v-for="(file, index) in files.slice(0, 10)"
            :key="index"
            :file="file"
            is-close
            class="scrollbar-demo-item"
            @clear-file="onClearFile(index)"
        />
      </div>
    </ElScrollbar>
    <div v-if="files.length > 10" style="padding-right: 10px; padding-left: 10px">
      <ElButton style="position: relative;" @click="showFileList = !showFileList">
        + {{ files.length - 10 }}
      </ElButton>

      <div v-if="showFileList" class="file-list">
        <ElScrollbar height="100px" style="width: 200px">
          <div v-for="(file, index) in files.slice(10)" :key="index" class="file-item">
            <ElText truncated>{{ file.name }}</ElText>
            <ElIcon class="close-icon" @click="onClearFile(index)">
              <Close />
            </ElIcon>
          </div>
        </ElScrollbar>
      </div>
    </div>
  </div>
  <div class="question-panel">
    <ElInput
        v-model="input"
        :autosize="{ minRows: 2, maxRows: 10 }"
        type="textarea"
        class="input-place"
    />

    <div class="button-group">
      <ElTooltip
          effect="dark"
          content="Удалить историю запросов"
          placement="bottom"
      >
        <ElButton
            :disabled="!hasDialog"
            size="large"
            text
            @click="dialog = true"
        >
          <ElIcon
              :size="25"
              color="#FF0000"
          >
            <Delete />
          </ElIcon>
        </ElButton>
      </ElTooltip>

      <div style="display: flex; align-items: center;">
        <div class="upload-container">
          <ElTooltip
              effect="dark"
              content="Загрузить файл"
              placement="bottom"
          >
            <ElButton
                size="large"
                text
                @click="triggerUpload"
            >
              <ElIcon
                  :size="25"
                  color="#FFD700"
              >
                <Paperclip />
              </ElIcon>
            </ElButton>
          </ElTooltip>
          <input
              type="file"
              ref="fileInput"
              :accept="acceptedFormats"
              style="display: none;"
              multiple
              @change="onFileChange"
          />
        </div>

        <ElTooltip
            effect="dark"
            content="Отправить запрос"
            placement="bottom"
        >
          <ElButton
              :disabled="!isActiveSendButton"
              size="large"
              text
              style="margin-left: 20px"
              @click="onSendQuestion"
          >
            <ElIcon
                :size="25"
                color="#6cd7ea"
            >
              <Search />
            </ElIcon>
          </ElButton>
        </ElTooltip>
      </div>
    </div>
  </div>
  <HistoryDeleteDialog v-model="dialog" @clear-history="clearHistory" />
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {Delete, Paperclip, Search} from "@element-plus/icons-vue";
import {ElNotification} from "element-plus";
import FileCard from "./FileCard.vue";
import HistoryDeleteDialog from "./HistoryDeleteDialog.vue";

const props = defineProps<{
  hasDialog: boolean;
}>()

const emit = defineEmits<{
  (e: "update-dialog", question?: string, fileList?: File[] | []): void
  (e: "clear-history"): void
}>()

const input = ref("");
const isValidFile = ref(false);
const showFileList = ref(false);

const fileInput = ref<HTMLInputElement | null>(null);
const acceptedFormats = '.doc,.docx,.pdf,.md,.xls,.xlsx,.epub,.fb2';
const files = defineModel<File[] | []>({ default: [] });

const dialog = ref(false);

const isActiveSendButton = computed(() => {
  return input.value?.trim()?.length || files.value?.length;
});

const triggerUpload = () => {
  fileInput.value?.click();
};

const validateFileType = (file: File) => {
  const validTypes = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf',
    'text/markdown',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/epub+zip',
    'application/x-fictionbook+xml',
  ];

  return validTypes.includes(file.type);
};

const clearHistory = () => {
  input.value = "";
  files.value = [];
  dialog.value = false;

  emit("clear-history");
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  Array.from(target.files)?.forEach((item) => {
    files.value.push(item);
  });
};

const onClearFile = (index: number) => {
  files.value?.splice(index, 1);
};

const onSendQuestion = () => {
  isValidFile.value = files.value?.length ? files.value?.every(validateFileType) : true;

  if (!isValidFile.value) {
    return ElNotification({
      title: 'Ошибка',
      message: 'Недопустимый формат файла!',
      type: 'error',
    })
  }

  emit("update-dialog", input.value, files.value?.length ? files.value : []);
  input.value = "";
};
</script>

<style scoped>
.question-panel {
  display: flex;
  flex-direction: column;
}

.button-group {
  display: flex;
  margin: 10px;
  justify-content: space-between;
}

.upload-container {
  display: flex;
  align-items: center;
}

.scrollbar-flex-content {
  display: flex;
  width: fit-content;
  gap: 20px;
  padding-right: 10px;
}

.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
}

.file-list {
  position: absolute;
  background-color: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  margin-top: 10px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.close-icon {
  cursor: pointer;
}
</style>