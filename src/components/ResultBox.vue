<template>
  <ElCard v-loading="isLoading" v-if="answer" class="card">
    <p>{{ answerInfo }}</p>
  </ElCard>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";

const props = defineProps<{
  answer?: string;
}>()

const isLoading = ref(true);
const answerInfo = ref("");

watch(
    () => props.answer,
    (newValue) => {
      answerInfo.value = "Ответ не получен :(";
      if (newValue) {
        isLoading.value = true;
        setTimeout(() => {
          answerInfo.value = newValue;
          isLoading.value = false;
        }, 3000);
      }
    },
    { immediate: true }
);
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