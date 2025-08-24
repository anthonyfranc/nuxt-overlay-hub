<template>
  <USlideover title="Your Cart">
    <div class="space-y-4">
      <div v-if="!items?.length" class="text-sm text-gray-500">Cart is empty.</div>

      <div v-for="(it, i) in items" :key="i" class="flex items-center justify-between">
        <div>
          <div class="font-medium">{{ it.name }}</div>
          <div class="text-xs text-gray-500">{{ it.qty }} × {{ it.price | currency }}</div>
        </div>
        <div class="font-semibold">{{ (it.qty * it.price) | currency }}</div>
      </div>

      <div class="border-t pt-3 flex justify-between">
        <span class="text-sm text-gray-500">Total</span>
        <span class="font-semibold">{{ total | currency }}</span>
      </div>

      <div class="flex justify-end gap-2">
        <UButton @click="$emit('close')">Close</UButton>
        <UButton color="primary" @click="$emit('close', { checkout: true })">Checkout</UButton>
      </div>
    </div>
  </USlideover>
</template>

<script setup lang="ts">
const props = defineProps<{ items?: { name: string; qty: number; price: number }[] }>()
defineEmits<{ (e: 'close', value?: any): void }>()
const total = computed(() => (props.items || []).reduce((s, it) => s + it.qty * it.price, 0))
</script>

<script lang="ts">
export default {
  filters: {
    currency(v: number) {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(v || 0)
    }
  }
}
</script>
