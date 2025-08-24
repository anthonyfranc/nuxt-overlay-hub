<template>
  <UModal :title="title">
    <p class="text-sm text-gray-600 dark:text-gray-300">{{ message }}</p>

    <div class="flex justify-end gap-2 mt-6">
      <UButton @click="$emit('close', 'cancel')">Cancel</UButton>
      <UButton color="red" @click="$emit('close', 'confirm')">Delete</UButton>
    </div>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{ title?: string; message?: string }>()
defineEmits<{ (e: 'close', value?: 'confirm'|'cancel'): void }>()
</script>
