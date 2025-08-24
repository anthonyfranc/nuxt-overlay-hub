
import { defineNuxtModule, addPlugin, addImports, createResolver } from '@nuxt/kit'

export interface ModuleOptions {
  strictMode?: boolean
  closeOnRouteChange?: boolean
  closeOnEscape?: boolean
  lockBodyScroll?: boolean
  devExposeGlobal?: boolean
  plus?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: { name: 'nuxt-overlay-hub', configKey: 'overlayHub' },
  defaults: {
    strictMode: false,
    closeOnRouteChange: false,
    closeOnEscape: false,
    lockBodyScroll: false,
    devExposeGlobal: process.env.NODE_ENV !== 'production',
    plus: false
  },
  setup(_, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    addPlugin(resolve('./plugin'))
    addImports([{ name: 'useOverlayHub', from: resolve('./composables') }])
  }
})
