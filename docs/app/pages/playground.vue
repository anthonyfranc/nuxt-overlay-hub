
<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const { openByName, ensureSingleByName, closeLatestOfName } = useOverlayHub()
</script>

<template>
  <UApp>
    <UContainer class="py-8 prose dark:prose-invert max-w-none">
      <h1>Playground</h1>
      <p>Live demo using <code>useOverlayHub()</code> and Nuxt UI.</p>
      <div class="flex gap-3">
        <UButton @click="openByName('auth/UserLogin')">Open Login</UButton>
        <UButton color="neutral" @click="ensureSingleByName('auth/UserLogin')">Ensure Single Login</UButton>
        <UButton color="red" variant="soft" @click="closeLatestOfName('auth/UserLogin')">Close Latest Login</UButton>
      </div>
    </UContainer>
  </UApp>
</template>
