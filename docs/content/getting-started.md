
---
title: Getting Started
---

# Getting Started (Nuxt 4)

Install the module and enable it in `nuxt.config.ts`.

```bash
npm i nuxt-overlay-hub @nuxt/ui @nuxt/content
```

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/ui', 'nuxt-overlay-hub'],
  overlayHub: {
    plus: true,
    strictMode: false,
    closeOnRouteChange: false,
    closeOnEscape: false,
    lockBodyScroll: false
  }
})
```

Use the composable anywhere:

```vue [Example.vue]
<script setup lang="ts">
const { openByName, ensureSingleByName, closeLatestOfName } = useOverlayHub()
</script>

<template>
  <UButton @click="openByName('auth/UserLogin')">Open Login</UButton>
</template>
```
