<template>
  <div class="query-box">
    <ElCard v-if="question" class="card">
      <p>{{ question }}</p>
    </ElCard>

    <div v-if="files?.length" class="file-query">
      <FileCard :file="files[0]" style="align-self: end" />
      <p v-if="files.length > 1">+ {{ files.length - 1 }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import FileCard from "./FileCard.vue";

const props = defineProps<{
  question?: string;
  files?: File[] | [];
}>();
</script>

<style scoped>
.query-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 50%;
  max-width: 50%;
}

.card {
  align-self: end;
  width: 100%;

  background: rgba(116, 21, 4, 0.25) !important;
  border-radius: 4px !important;
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
  box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5) !important;
  color: #ffffff !important;
  font-family: inherit !important;
  transition: all 0.3s ease !important;
}

.file-query {
  display: flex;
  flex-direction: column;
  align-self: end;
  color: white;
}

:deep(.el-card__body) {
  padding: 10px;
}
</style>
