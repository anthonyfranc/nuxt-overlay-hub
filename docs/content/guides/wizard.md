---
title: Guide — Wizard Flows
description: Chain multi-step overlays and pause until they close.
---

# Wizard Flows

```ts
const hub = useOverlayHub()
const waitUntilClosedByName = (hub as any).waitUntilClosedByName

async function runWizard() {
  hub.openByName('wizard/StepOne')
  await waitUntilClosedByName?.('wizard/StepOne')

  hub.openByName('wizard/StepTwo')
  await waitUntilClosedByName?.('wizard/StepTwo')

  hub.openByName('wizard/StepThree')
  await waitUntilClosedByName?.('wizard/StepThree')
}
```
