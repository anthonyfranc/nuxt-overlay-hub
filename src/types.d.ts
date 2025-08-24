// src/types.d.ts
declare module '#app' {
  interface NuxtApp { $overlayHub: any }
}
declare module 'vue' {
  interface ComponentCustomProperties { $overlayHub: any }
}
export {}
