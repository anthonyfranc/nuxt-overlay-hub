---
title: Advanced — Debugging & DevTools
description: Inspect overlays in development and common troubleshooting steps.
---

# Debugging & DevTools

## Quick inspection
```js
// dev only (when devExposeGlobal is true)
window.__overlayHub.overlays        // list of overlays
window.__overlayHub.openByName('auth/UserLogin')
```

## Common issues
- **Component not found**: Check name variants (`AuthUserLogin`, `auth/UserLogin`, `auth/user-login`).
- **Self-import**: Inside an overlay, use `getCurrentInstance().type` to close, not `#components` import.
- **Scroll lock**: Disable `lockBodyScroll` or manage globally.
