<template>
  <ElCard v-loading="isLoading" class="card">
    <div v-if="answer?.message">
      <p>{{ answer?.message }}</p>
      <br/>
    </div>
    <p v-if="isLoading">ожидайте ...</p>
    <p v-if="!isLoading && answer?.answer">{{ answer.answer }}</p>
    <br/>
    <div v-if="answer?.sources?.length">
      <b>Источники:</b>
      <div v-for="(source, index) in answer.sources" :key="index">
        <p>{{ source }}</p>
      </div>
    </div>
  </ElCard>
</template>

<script setup lang="ts">
import type {Answer} from "../shared/types";

const props = defineProps<{
  answer: Answer;
  isLoading: boolean;
}>();
</script>

<style scoped>
.card {
  max-width: 50%;
  align-self: end;
  margin-top: 20px;

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

:deep(.el-card__body) {
  padding: 10px;
}

:deep(.el-card) {
  background: rgba(116, 21, 4, 0.25) !important;
  border-radius: 4px !important;
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
  box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px rgba(255, 255, 255, 0.1) !important;
  color: #ffffff !important;
  font-family: inherit !important;
  transition: all 0.3s ease !important;
}
</style>
