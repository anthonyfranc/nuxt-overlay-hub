---
title: Advanced — Testing Overlays
description: Unit and integration testing patterns for Overlay Hub with Vitest and Testing Library.
---

# Testing Overlays

## Unit: await results
```ts
import { render, fireEvent } from '@testing-library/vue'
import DeleteConfirm from '~/app/components/dialogs/DeleteConfirm.vue'

it('emits confirm on click', async () => {
  const { getByText, emitted } = render(DeleteConfirm, { props: { title: 'Delete' } })
  await fireEvent.click(getByText('Delete'))
  expect(emitted().close?.[0]).toEqual(['confirm'])
})
```

## Integration: openByName
```ts
const hub = useOverlayHub()
const promise = hub.openByName('dialogs/DeleteConfirm')
// ...find button and click...
expect(await promise).toBe('confirm')
```

Tips:
- Mock external services (e.g., Supabase) at the component boundary.
- Prefer by-name helpers in tests to mirror app usage.
