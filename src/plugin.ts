// src/runtime/plugin.ts
import { defineNuxtPlugin } from '#app'
import { useOverlay } from '#imports'
import { reactive, shallowRef, watchEffect, onBeforeUnmount, type Component } from 'vue'
import { applyPlus } from './plus-enhancer'

export default defineNuxtPlugin((_nuxtApp) => {
  const core = useOverlay()

  const reg = shallowRef(new Map<Component, Set<symbol>>())
  const opts = reactive({
    strictMode: false,
    closeOnRouteChange: false,
    closeOnEscape: false,
    lockBodyScroll: false,
    devExposeGlobal: process.dev,
    plus: false,
    ...(_nuxtApp.$config as any)?.overlayHub
  })

  const track = (c: Component, id: symbol) => {
    let s = reg.value.get(c)
    if (!s) reg.value.set(c, (s = new Set()))
    s.add(id)
  }
  const untrack = (c: Component, id: symbol) => {
    const s = reg.value.get(c)
    if (!s) return
    s.delete(id)
    if (!s.size) reg.value.delete(c)
  }

  const pascalize = (ts: string[]) =>
    ts.filter(Boolean).map(t => t.replace(/[^a-zA-Z0-9]/g, '').replace(/^[a-z]/, c => c.toUpperCase())).join('')
  const normalize = (input: string) =>
    input.includes('/')
      ? input.split('/').map(s => pascalize(s.split(/[-_]/))).join('')
      : (input.includes('-') || input.includes('_')) ? pascalize(input.split(/[-_]/)) : input

  const resolveName = (input: string) => {
    const name = normalize(input)
    const app = _nuxtApp.vueApp
    const kebab = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
    const key = app.component(name) ? name : app.component(kebab) ? kebab : app.component(input) ? input : ''
    if (!key) {
      if (opts.strictMode) throw new Error(`[overlayHub] Component not found: "${input}"`)
      if (process.dev) console.warn(`[overlayHub] Component not found: "${input}"`)
    }
    return key
  }
  const resolveComp = (input: string) => {
    const key = resolveName(input)
    return key ? (_nuxtApp.vueApp.component(key) as unknown as Component) : (() => null as any)
  }

  function openByComponent<T extends Component>(c: T, props?: any) {
    const inst = core.create(c)
    track(c, inst.id)
    const opened = inst.open(props)
    opened.finally(() => untrack(c, inst.id))
    return opened
  }
  const getIds = (c: Component) => [...(reg.value.get(c) ?? [])]
  const latestId = (c: Component) => { const ids = getIds(c); return ids[ids.length - 1] }
  const anyOpen = (c: Component) =>
    (reg.value.get(c)?.size ?? 0) > 0 || core.overlays.some(o => o.isOpen && (o as any).component === c)
  const closeLatestOf = (c: Component, v?: any) => {
    const id = latestId(c) ?? [...core.overlays].reverse().find(o => o.isOpen && (o as any).component === c)?.id
    if (id) core.close(id, v)
  }
  const ensureSingle = (c: Component, p?: any) => { getIds(c).forEach(id => core.close(id)); return openByComponent(c, p) }

  const openByName = (n: string, p?: any) => openByComponent(resolveComp(n), p)
  const closeLatestOfName = (n: string, v?: any) => closeLatestOf(resolveComp(n), v)
  const ensureSingleByName = (n: string, p?: any) => ensureSingle(resolveComp(n), p)

  const router = _nuxtApp.$router
  router?.beforeEach?.(() => { if (opts.closeOnRouteChange) core.closeAll() })

  let escHandler: ((e: KeyboardEvent) => void) | undefined
  if (import.meta.client && opts.closeOnEscape) {
    escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const latest = [...core.overlays].reverse().find(o => o.isOpen)
        if (latest) core.close(latest.id)
      }
    }
    window.addEventListener('keydown', escHandler)
  }

  if (import.meta.client) {
    const stop = watchEffect(() => {
      const any = core.overlays.some(o => o.isOpen)
      document.documentElement.style.overflow = (any && opts.lockBodyScroll) ? 'hidden' : ''
    })
    onBeforeUnmount(() => stop())
  }

  const hub: any = {
    overlays: core.overlays, open: core.open, close: core.close, closeAll: core.closeAll,
    patch: core.patch, unmount: core.unmount, isOpen: core.isOpen,
    openByComponent, closeLatestOf, ensureSingle, anyOpen,
    openByName, closeLatestOfName, ensureSingleByName,
    opts
  }

  if (opts.plus) applyPlus(hub, _nuxtApp)

  _nuxtApp.provide('overlayHub', hub)
  if (hub.opts.devExposeGlobal && import.meta.client) (window as any).__overlayHub = hub

  if (import.meta.client && escHandler) {
    onBeforeUnmount(() => window.removeEventListener('keydown', escHandler!))
  }
})
