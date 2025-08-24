
---
title: 'Nuxt Overlay Hub'
description: 'Lightweight wrapper over Nuxt UI useOverlay with cross-component and by-name helpers.'
---

# Nuxt Overlay Hub (Docs — Nuxt 4)

A lightweight wrapper over **Nuxt UI**'s `useOverlay` that adds cross-component helpers and (optionally) advanced utilities — without import clutter.

- Open/close overlays by **component** or by **name/path** (no imports)
- **Singleton** hub (global across app)
- Optional policies: close on route change, Esc to close latest, body scroll lock
- **Plus** features (opt-in via config): de-dupe (`openOnce`), stack tools, async guards, subscriptions, predicates

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/ui', 'nuxt-overlay-hub'],
  overlayHub: { plus: true }
})
```
