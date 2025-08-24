<!-- app/components/auth/UserLogin.vue -->
<template>
  <UModal title="Login">
    <div class="space-y-3">
      <UInput placeholder="Email" />
      <UInput placeholder="Password" type="password" />

      <div class="flex justify-end gap-2">
        <!-- Clicking these buttons will close the overlay -->
        <UButton @click="$emit('close')">Close</UButton>
        <UButton color="primary" @click="$emit('close', { ok: true })">
          Sign in
        </UButton>
      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
defineEmits<{ (e: 'close', value?: any): void }>()
</script>
