<template>
  <ElCard shadow="never" class="file-card">
    <p :style="getFileCardStyle(file.type)" class="icon-text">
      {{ getFileType(file.type) }}
    </p>
    <div class="file-info">
      <ElTooltip effect="dark" :content="file.name" placement="bottom-start">
        <ElText truncated>{{ file.name }}</ElText>
      </ElTooltip>
      <ElText truncated>{{ formatFileSize(file.size) }}</ElText>
    </div>
    <ElIcon v-if="isClose" class="close-icon" @click="emit('clear-file')">
      <Close />
    </ElIcon>
  </ElCard>
</template>

<script setup lang="ts">
import { formatFileSize, getFileCardStyle, getFileType } from "../shared/utils";

const props = defineProps<{
  file: File;
  isClose?: boolean;
}>();

const emit = defineEmits<{
  (e: "clear-file"): void;
}>();
</script>

<style scoped>
:deep(.el-card__body) {
  padding: 8px 10px 8px 10px;
  display: flex;
}

:deep(.el-text) {
  align-self: normal;
}

.file-card {
  display: flex;
  flex-direction: row;
  width: 240px;
  height: 65px;
  font-size: 14px;
  margin-bottom: 5px;
  align-items: center;
  position: relative;
}

.icon-text {
  width: 45px;
  height: 45px;
  color: white;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 4px;
  margin-right: 5px;
}

.file-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 150px;
}

.close-icon {
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
