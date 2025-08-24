// src/module.ts
import {
  defineNuxtModule,
  createResolver,
  addPlugin,
  addImports,
  installModule
} from '@nuxt/kit'

export interface ModuleOptions {
  strictMode?: boolean
  closeOnRouteChange?: boolean
  closeOnEscape?: boolean
  lockBodyScroll?: boolean
  devExposeGlobal?: boolean
  plus?: boolean
  autoInstallUI?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: { name: 'nuxt-overlay-hub', configKey: 'overlayHub' },
  defaults: {
    strictMode: false,
    closeOnRouteChange: false,
    closeOnEscape: false,
    lockBodyScroll: false,
    devExposeGlobal: process.env.NODE_ENV !== 'production',
    plus: false,
    autoInstallUI: true
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    if (options.autoInstallUI) {
      await installModule('@nuxt/ui')
    }

    addImports([{ name: 'useOverlay', from: '@nuxt/ui' }])

    nuxt.options.runtimeConfig.public ||= {}
    nuxt.options.runtimeConfig.public.overlayHub = {
      ...(nuxt.options.runtimeConfig.public.overlayHub || {}),
      strictMode: options.strictMode,
      closeOnRouteChange: options.closeOnRouteChange,
      closeOnEscape: options.closeOnEscape,
      lockBodyScroll: options.lockBodyScroll,
      devExposeGlobal: options.devExposeGlobal,
      plus: options.plus
    }

    addPlugin({ src: resolve('./plugin')})
  }
})
