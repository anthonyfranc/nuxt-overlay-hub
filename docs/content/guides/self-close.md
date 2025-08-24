---
title: Guide — Self-Closing Overlays
description: Close from inside without importing your component.
---

# Self-Closing Overlays

```ts
import { getCurrentInstance } from 'vue'

const { closeLatestOf } = useOverlayHub()
const self = getCurrentInstance()!.type
closeLatestOf(self)
```
