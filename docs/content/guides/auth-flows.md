---
title: Guide — Auth Flows
description: Swap Login → Register, avoid duplicates, and await results.
---

# Auth Flows

## Swap Login → Register
```ts
const { openByName, ensureSingleByName, closeLatestOfName } = useOverlayHub()

function openLogin() {
  openByName('auth/UserLogin')
}

function swapLoginToRegister() {
  closeLatestOfName('auth/UserLogin')
  setTimeout(() => ensureSingleByName('auth/UserRegister'), 200)
}
```
