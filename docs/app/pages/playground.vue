<!-- app/pages/playground.vue -->
<script setup lang="ts">
definePageMeta({ layout: 'docs' })
const { openByName, ensureSingleByName, closeLatestOfName } = useOverlayHub()

function openLogin() {
  // open and listen for a "switch" event via props binding if you want (not required for demo)
  openByName('auth/UserLogin')
}
function openRegister() {
  ensureSingleByName('auth/UserRegister')
}
function swapLoginToRegister() {
  closeLatestOfName('auth/UserLogin')
  setTimeout(() => ensureSingleByName('auth/UserRegister'), 200)
}
</script>

<template>
  <UApp>
    <UContainer class="py-8 prose dark:prose-invert max-w-none">
      <h1>Playground</h1>
      <div class="flex flex-wrap gap-3">
        <UButton @click="openLogin">Open Login</UButton>
        <UButton color="neutral" @click="openRegister">Open Register</UButton>
        <UButton color="primary" variant="soft" @click="swapLoginToRegister">Swap Login → Register</UButton>
        <UButton color="red" variant="soft" @click="closeLatestOfName('auth/UserLogin')">Close Latest Login</UButton>
      </div>
    </UContainer>
  </UApp>
</template>
