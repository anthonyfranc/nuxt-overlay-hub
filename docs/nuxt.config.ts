/* nuxt.config.ts — Nuxt 4 docs app using Nuxt Content v3 */
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    // Use the published module name or a local link during dev
    'nuxt-overlay-hub'
  ],

  app: {
    head: {
      title: 'Nuxt Overlay Hub — Docs',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  // Dark mode support
  colorMode: {
    preference: 'system',     // default theme (system, light, dark)
    fallback: 'light',        // fallback if system preference can't be detected
    classSuffix: ''           // no "-dark" suffix on classes
  },

  // Nuxt Content v3 configuration
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark'
          },
          langs: [
            'json', 'js', 'ts', 'html', 'css', 'vue',
            'shell', 'mdc', 'md', 'yaml'
          ]
        },
        toc: {
          depth: 3,
          searchDepth: 3
        }
      }
    }
  },

  // OverlayHub module configuration
  overlayHub: {
    plus: true,
    strictMode: false,
    devExposeGlobal: process.env.NODE_ENV !== 'production',
    closeOnRouteChange: false,
    closeOnEscape: false,
    lockBodyScroll: false
  }
})
