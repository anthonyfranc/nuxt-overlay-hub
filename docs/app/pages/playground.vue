<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const hub = useOverlayHub()
// core helpers
const { openByName, ensureSingleByName, closeLatestOfName } = hub
// plus helpers are mixed onto the same hub when overlayHub.plus = true
const getLatestIdByName = (hub as any).getLatestIdByName
const patch = (hub as any).patch

// --- Auth demos ---
function openLogin() {
  openByName('auth/UserLogin')
}
function openRegister() {
  ensureSingleByName('auth/UserRegister')
}
function swapLoginToRegister() {
  closeLatestOfName('auth/UserLogin')
  setTimeout(() => ensureSingleByName('auth/UserRegister'), 200)
}

// --- Delete Confirm (returns value) ---
async function askDelete() {
  const res = await openByName('dialogs/DeleteConfirm', {
    title: 'Delete file',
    message: 'This action is permanent.'
  })
  if (res === 'confirm') {
    // e.g. toast or console
    console.log('Deleted!')
  }
}

// --- Cart (slideover + patch) ---
function openCart() {
  ensureSingleByName('commerce/Cart', {
    items: [{ name: 'Socks', qty: 2, price: 6 }]
  })
}
function addTeeToCart() {
  const id = getLatestIdByName?.('commerce/Cart')
  if (id && patch) {
    patch(id, {
      items: [
        { name: 'Socks', qty: 2, price: 6 },
        { name: 'Tee', qty: 1, price: 18 }
      ]
    })
  } else {
    openCart()
  }
}

// --- Search (slideover, ensure single) ---
function openSearch() {
  ensureSingleByName('search/SearchPanel')
}
</script>

<template>
  <UApp>
    <UContainer class="py-8 prose dark:prose-invert max-w-none">
      <h1>Playground</h1>
      <p>Live demos using <code>useOverlayHub()</code> and Nuxt UI.</p>

      <h2>Auth</h2>
      <div class="flex flex-wrap gap-3 mb-6">
        <UButton @click="openLogin">Open Login</UButton>
        <UButton color="neutral" @click="openRegister">Open Register</UButton>
        <UButton color="primary" variant="soft" @click="swapLoginToRegister">
          Swap Login → Register
        </UButton>
        <UButton color="red" variant="soft" @click="closeLatestOfName('auth/UserLogin')">
          Close Latest Login
        </UButton>
      </div>

      <h2>Dialogs & Panels</h2>
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
