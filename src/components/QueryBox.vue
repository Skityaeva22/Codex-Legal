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
}

.file-query {
  display: flex;
  flex-direction: column;
  align-self: end;
}

:deep(.el-card__body) {
  padding: 10px;
}
</style>
