// src/plus-enhancer.ts
import type { Component } from 'vue'
import { watchEffect } from 'vue'
import { useState } from 'nuxt/app'

export function applyPlus(hub: any, nuxtApp: any) {
  const app = nuxtApp.vueApp

  // Keep a map of "openOnce" keys -> latest overlay id
  const keyed = useState<Map<string, symbol>>('overlay-hub-plus:keys', () => new Map())

  const idsOf = (c: Component) =>
    (hub.overlays || [])
      .filter((o: any) => o.isOpen && (o as any).component === c)
      .map((o: any) => o.id as symbol)

  const countOf = (c: Component) => idsOf(c).length
  const getLatestId = (c: Component) => {
    const ids = idsOf(c)
    return ids[ids.length - 1]
  }

  const pascalize = (t: string[]) =>
    t.filter(Boolean)
      .map((s) => s.replace(/[^a-zA-Z0-9]/g, '').replace(/^[a-z]/, (c) => c.toUpperCase()))
      .join('')

  const normalize = (input: string) =>
    input.includes('/')
      ? input.split('/').map((s) => pascalize(s.split(/[-_]/))).join('')
      : input.includes('-') || input.includes('_')
        ? pascalize(input.split(/[-_]/))
        : input

  const resolveByName = (nameOrPath: string) => {
    const norm = normalize(nameOrPath)
    const kebab = norm.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
    return (app.component(norm) || app.component(kebab) || app.component(nameOrPath)) as unknown as Component | null
  }

  function openOnce(c: Component, key: string, props?: any) {
    const ex = keyed.value.get(key)
    if (ex && hub.isOpen(ex)) return (hub.overlays || []).find((o: any) => o.id === ex)
    const opened = hub.openByComponent(c, props)
    keyed.value.set(key, (opened as any).id)
    ;(opened as Promise<any>).finally(() => keyed.value.delete(key)).catch(() => keyed.value.delete(key))
    return opened
  }

  function openOrFocus(c: Component, props?: any) {
    const id = getLatestId(c)
    return id && hub.isOpen(id)
      ? (hub.overlays || []).find((o: any) => o.id === id)
      : hub.openByComponent(c, props)
  }

  function closeAllExceptLatest(c: Component, value?: any) {
    const ids = idsOf(c)
    ids.slice(0, -1).forEach((id) => hub.close(id, value))
  }

  function waitUntilClosed(c: Component, opts?: { all?: boolean }) {
    return new Promise<void>((resolve) => {
      const done = () => (opts?.all ? countOf(c) === 0 : !hub.anyOpen(c))
      if (done()) return resolve()
      const stop = watchEffect(() => {
        if (done()) {
          stop()
          resolve()
        }
      })
    })
  }

  function onChange(c: Component, cb: (i: { ids: symbol[]; count: number }) => void) {
    return watchEffect(() => cb({ ids: idsOf(c), count: countOf(c) }))
  }

  function closeWhere(c: Component, pred: (o: any) => boolean, value?: any) {
    ;(hub.overlays || []).forEach((o: any) => {
      if (o.isOpen && (o as any).component === c && pred(o)) hub.close(o.id, value)
    })
  }

  // Name-based mirrors
  const openOnceByName = (n: string, key: string, p?: any) => {
    const c = resolveByName(n)
    return c ? openOnce(c, key, p) : undefined
  }
  const openOrFocusByName = (n: string, p?: any) => {
    const c = resolveByName(n)
    return c ? openOrFocus(c, p) : undefined
  }
  const closeAllExceptLatestByName = (n: string, v?: any) => {
    const c = resolveByName(n)
    if (c) closeAllExceptLatest(c, v)
  }
  const waitUntilClosedByName = (n: string, o?: { all?: boolean }) => {
    const c = resolveByName(n)
    return c ? waitUntilClosed(c, o) : Promise.resolve()
  }
  const onChangeByName = (n: string, cb: (i: { ids: symbol[]; count: number }) => void) => {
    const c = resolveByName(n)
    return c ? onChange(c, cb) : undefined
  }
  const idsOfByName = (n: string) => {
    const c = resolveByName(n)
    return c ? idsOf(c) : []
  }
  const countOfByName = (n: string) => idsOfByName(n).length
  const getLatestIdByName = (n: string) => {
    const ids = idsOfByName(n)
    return ids[ids.length - 1]
  }
  const closeWhereByName = (n: string, p: (o: any) => boolean, v?: any) => {
    const c = resolveByName(n)
    if (c) closeWhere(c, p, v)
  }

  Object.assign(hub, {
    idsOf,
    countOf,
    getLatestId,
    openOnce,
    openOrFocus,
    closeAllExceptLatest,
    waitUntilClosed,
    onChange,
    closeWhere,
    idsOfByName,
    countOfByName,
    getLatestIdByName,
    openOnceByName,
    openOrFocusByName,
    closeAllExceptLatestByName,
    waitUntilClosedByName,
    onChangeByName,
    closeWhereByName
  })
}
