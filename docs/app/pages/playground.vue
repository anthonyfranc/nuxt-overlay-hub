<script setup lang="ts">
definePageMeta({ layout: 'docs' })
const { openByName, ensureSingleByName, closeLatestOfName } = useOverlayHub()
const plus = useOverlayHub() // plus methods are mixed into hub when plus: true

async function askDelete() {
  const res = await openByName('dialogs/DeleteConfirm', {
    title: 'Delete file',
    message: 'This action is permanent.'
  })
  if (res === 'confirm') {
    // e.g., toast.success('Deleted')
  }
}

function openCart() {
  ensureSingleByName('commerce/Cart', {
    items: [{ name: 'Socks', qty: 2, price: 6 }]
  })
}

function addTeeToCart() {
  // patch latest cart with a new item
  // getLatestIdByName is provided when overlayHub.plus = true
  // @ts-ignore
  const id = plus.getLatestIdByName?.('commerce/Cart')
  if (id) {
    // @ts-ignore
    plus.patch?.(id, {
      items: [
        { name: 'Socks', qty: 2, price: 6 },
        { name: 'Tee', qty: 1, price: 18 }
      ]
    })
  } else {
    openCart()
  }
}

function openSearch() {
  ensureSingleByName('search/SearchPanel')
}
</script>

<template>
  <UApp>
    <UContainer class="py-8 prose dark:prose-invert max-w-none">
      <h2>Extra Examples</h2>
      <div class="flex flex-wrap gap-3">
        <!-- Delete Confirm -->
        <UButton color="red" variant="soft" @click="askDelete">Delete Confirm</UButton>

        <!-- Cart -->
        <UButton @click="openCart">Open Cart</UButton>
        <UButton color="neutral" variant="soft" @click="addTeeToCart">Add Tee to Cart (patch)</UButton>

        <!-- Search -->
        <UButton color="primary" variant="soft" @click="openSearch">Open Search</UButton>
      </div>
    </UContainer>
  </UApp>
</template>
