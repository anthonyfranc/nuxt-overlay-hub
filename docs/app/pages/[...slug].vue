
<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const route = useRoute()
const path = computed(() => '/' + (Array.isArray(route.params.slug) ? route.params.slug.join('/') : (route.params.slug || '')))
const { data: page } = await useAsyncData(() => queryCollection('content').path(path.value).first(), { watch: [path] })

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description
})
</script>

<template>
  <UApp>
    <UContainer class="py-8 prose dark:prose-invert max-w-none">
      <ContentRenderer v-if="page" :value="page" />
      <div v-else>Page not found</div>
    </UContainer>
  </UApp>
</template>
