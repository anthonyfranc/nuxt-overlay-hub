
---
title: Troubleshooting
---

# Troubleshooting

**Component not found**
- Check the name/path: `AuthUserLogin`, `auth/UserLogin`, or `auth/user-login`.
- Ensure Nuxt auto-components is enabled. In Nuxt 4, components should be inside the `app/` dir.

**Closing from inside the overlay**
- Do not import the component from `#components` inside itself. Use:
```ts
const self = getCurrentInstance()!.type
closeLatestOf(self)
```

**Scroll remains locked**
- Disable `lockBodyScroll` if you manage it elsewhere.
