<template>
  <UModal title="Create account">
    <div class="space-y-3">
      <UInput placeholder="First name" />
      <UInput placeholder="Last name" />
      <UInput placeholder="Email" />
      <UInput placeholder="Password" type="password" />

      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-500">
          Already have an account?
          <UButton variant="link" size="xs" @click="$emit('switch', 'login')">Sign in</UButton>
        </div>
        <div class="flex gap-2">
          <UButton @click="$emit('close')">Cancel</UButton>
          <UButton color="primary" @click="$emit('close', { registered: true })">
            Create account
          </UButton>
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
