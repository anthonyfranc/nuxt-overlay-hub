---
title: Guide — Dialogs & Confirmations
description: Build confirm dialogs that return values you can await.
---

# Dialogs & Confirmations

```vue [components/dialogs/DeleteConfirm.vue]
<template>
  <UModal title="Delete item">
    <p>Are you sure? This cannot be undone.</p>
    <div class="flex justify-end gap-2 mt-6">
      <UButton @click="$emit('close', 'cancel')">Cancel</UButton>
      <UButton color="red" @click="$emit('close', 'confirm')">Delete</UButton>
    </div>
  </UModal>
</template>
```
