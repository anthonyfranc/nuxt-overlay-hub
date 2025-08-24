---
title: Guide — Cart & Patch
description: Update props without reopening using hub.patch.
---

# Cart & Patch

```ts
const hub = useOverlayHub()
await hub.ensureSingleByName('commerce/Cart', {
  items: [{ name: 'Socks', qty: 2, price: 6 }]
})

const id = (hub as any).getLatestIdByName?.('commerce/Cart')
if (id) {
  (hub as any).patch?.(id, {
    items: [
      { name: 'Socks', qty: 2, price: 6 },
      { name: 'Tee', qty: 1, price: 18 }
    ]
  })
}
```
