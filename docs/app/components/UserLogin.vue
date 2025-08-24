<!-- app/components/auth/UserLogin.vue -->
<template>
  <UModal title="Login">
    <div class="space-y-3">
      <UInput placeholder="Email" />
      <UInput placeholder="Password" type="password" />

      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-500">
          New here?
          <UButton variant="link" size="xs" @click="$emit('switch', 'register')">Create account</UButton>
        </div>
        <div class="flex gap-2">
          <UButton @click="$emit('close')">Close</UButton>
          <UButton color="primary" @click="$emit('close', { ok: true })">Sign in</UButton>
        </div>
      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'close', value?: any): void
  (e: 'switch', to: 'login' | 'register'): void
}>()
</script>
