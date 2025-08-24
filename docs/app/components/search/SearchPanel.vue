<template>
  <USlideover title="Search">
    <div class="space-y-4">
      <UInput v-model="q" placeholder="Type to search…" />
      <div class="text-xs text-gray-500">Try: "plan", "modal", "overlay"</div>

      <div v-if="!results.length" class="text-sm text-gray-500">No results</div>
      <ul v-else class="space-y-2">
        <li v-for="(r, i) in results" :key="i" class="flex items-center justify-between">
          <span>{{ r }}</span>
          <UButton size="xs" variant="soft" @click="$emit('close', { open: r })">Open</UButton>
        </li>
      </ul>
    </div>
  </USlideover>
</template>

<script setup lang="ts">
const q = ref('')
const results = computed(() => {
  if (!q.value) return []
  // toy algo
  const pool = ['Project Plan', 'Modal Guide', 'Overlay API', 'Cart', 'Login']
  return pool.filter(x => x.toLowerCase().includes(q.value.toLowerCase()))
})
defineEmits<{ (e: 'close', value?: any): void }>()
</script>
