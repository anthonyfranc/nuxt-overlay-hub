---
title: Advanced — SSR & Provide/Inject Caveats
description: Understand overlay mounting context and alternatives to inject.
---

# SSR & Provide/Inject Caveats

Overlays are mounted by `UApp` **outside** the page context. This means `inject()` values provided in pages/layouts are **not available** inside overlays.

**Use props instead:**
```ts
const modal = useOverlay().create(MyOverlay, {
  props: { providedValue, other: x }
})
```

If you must share global state, use a store (Pinia) or a module singleton instead of provide/inject.
