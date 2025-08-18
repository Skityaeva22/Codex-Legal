<template>
  <div class="query-box">
    <ElCard v-if="question" class="card">
      <p>{{ question }}</p>
    </ElCard>
    <FileCard v-if="file" :file="file" style="align-self: end;" />
  </div>
</template>

<script setup lang="ts">
import FileCard from "./FileCard.vue";

const props = defineProps<{
  question?: string;
  file?: File;
}>()
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

:deep(.el-card__body) {
  padding: 10px;
}
</style>