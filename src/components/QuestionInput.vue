<template>
  <FileCard
      v-if="file"
      :file="file"
      is-close
      @clear-file="file = undefined"
  />
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
            :icon="Delete"
            size="large"
            type="danger"
            circle
            @click="dialog = true"
        />
      </ElTooltip>

      <div style="display: flex;">
        <div class="upload-container">
          <ElTooltip
              effect="dark"
              content="Загрузить файл"
              placement="bottom"
          >
            <ElButton
                :icon="Paperclip"
                size="large"
                text
                circle
                @click="triggerUpload"
            />
          </ElTooltip>
          <input
              type="file"
              ref="fileInput"
              :accept="acceptedFormats"
              style="display: none;"
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
              :icon="Search"
              type="primary"
              size="large"
              circle
              style="margin-left: 10px"
              @click="onSendQuestion"
          />
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
  (e: "update-dialog", question?: string, file?: File): void
  (e: "clear-history"): void
}>()

const input = ref("");
const isValidFile = ref(false);

const fileInput = ref<HTMLInputElement | null>(null);
const acceptedFormats = '.doc,.docx,.pdf,.md,.xls,.xlsx';
const file = defineModel<File | undefined>({ default: undefined });

const dialog = ref(false);

const isActiveSendButton = computed(() => {
  return input.value?.trim()?.length || file.value;
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
  ];

  return validTypes.includes(file.type);
};

const clearHistory = () => {
  input.value = "";
  file.value = undefined;
  dialog.value = false;

  emit("clear-history");
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  file.value = target.files?.[0];
};

const onSendQuestion = () => {
  isValidFile.value = file.value ? validateFileType(file.value) : true;

  if (!isValidFile.value) {
    return ElNotification({
      title: 'Ошибка',
      message: 'Недопустимый формат файла!',
      type: 'error',
    })
  }

  emit("update-dialog", input.value, file.value ?? undefined);
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
  margin-top: 10px;
  justify-content: space-between;
}

.upload-container {
  display: flex;
  align-items: center;
}
</style>