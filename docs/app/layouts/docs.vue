<!-- app/layouts/docs.vue -->
<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

// Nuxt Content v3: build the sidebar tree from your /content markdown
const { data: navigation } = await useAsyncData<ContentNavigationItem[]>(
  'content:navigation',
  () => fetchContentNavigation()
)
</script>

<template>
  <UApp>
    <!-- Top bar -->
    <UHeader>
      <div class="flex items-center gap-3">
        <ULink to="/" class="font-semibold">Nuxt Overlay Hub</ULink>
      </div>
      <template #right>
        <UButton to="/playground" variant="ghost">Playground</UButton>
        <UColorModeButton />
      </template>
    </UHeader>

    <!-- Main docs shell -->
    <UContainer>
      <UPage>
        <!-- Left sidebar -->
        <template #left>
          <UPageAside>
            <UContentNavigation
              :navigation="navigation || []"
              highlight
            />
          </UPageAside>
        </template>

        <!-- Page content -->
        <slot />
      </UPage>
    </UContainer>

    <UFooter>
      <p class="text-sm text-gray-500">© 2025 Nuxt Overlay Hub</p>
    </UFooter>
  </UApp>
</template>
