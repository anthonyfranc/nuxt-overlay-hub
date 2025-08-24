title: Reference — Events (Dev Only)
description: Planned lifecycle events: beforeOpen, afterOpen, beforeClose, afterClose.
---

# Events (Dev Only)

> These hooks are available in development and may evolve.

- **beforeOpen** — fired before creating/opening an overlay
- **afterOpen** — fired after the overlay opens
- **beforeClose** — fired before closing an overlay
- **afterClose** — fired after the overlay closes

Example (dev only):
```ts
if (import.meta.dev) {
  // @ts-ignore
  useOverlayHub().__dev?.on('afterOpen', (e) => console.debug('[overlay]', e))
}
```
