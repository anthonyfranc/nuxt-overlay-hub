
// src/composables.ts
export function useOverlayHub() {
  return useNuxtApp().$overlayHub as any
}
