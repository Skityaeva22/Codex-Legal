<template>
  <ElDialog v-model="dialog" title="Внимание!" width="500">
    <span>
      Вы действительно хоите удалить историю запросов?
    </span>
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="dialog = false">Нет</ElButton>
        <ElButton
            type="primary"
            @click="emit('clear-history')"
        >
          Да
        </ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "clear-history"): void
}>()

const dialog = defineModel({ default: false });
</script>
