
---
title: Guide — Routing Policies
---

# Routing Policies

Enable in `nuxt.config.ts`:

```ts
overlayHub: {
  closeOnRouteChange: true, // Close all before navigation
  closeOnEscape: true,      // ESC closes latest
  lockBodyScroll: true      // Lock scroll when any overlay open
}
```
