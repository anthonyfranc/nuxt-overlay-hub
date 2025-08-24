---
title: Guide — Auth Flows
---

# Auth Flows

Close Login then open Register:

```ts
const { closeLatestOfName, openByName, anyOpen } = useOverlayHub()

function startRegister() {
  // example condition
  closeLatestOfName('auth/UserLogin')
  setTimeout(() => openByName('auth/UserRegister'), 250)
}
```
