<script setup lang="ts">
definePageMeta({ layout: 'docs' })

// Load home page content from /content/index.md
const { data: home } = await useAsyncData(() =>
  queryCollection('content').path('/').first()
)

useSeoMeta({
  title: home.value?.title || 'Nuxt Overlay Hub',
  description: home.value?.description
})
</script>

<template>
  <UApp>
    <UContainer class="py-8 prose dark:prose-invert max-w-none">
      <ContentRenderer v-if="home" :value="home" />
      <div v-else>Home not found</div>
    </UContainer>
  </UApp>
</template>
