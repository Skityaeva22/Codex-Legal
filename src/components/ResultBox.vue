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
}

:deep(.el-card__body) {
  padding: 10px;
}
</style>
