# Nuxt Overlay Hub (v1.0.0)

A lightweight wrapper over **Nuxt UI**'s `useOverlay` that adds cross-component helpers and (optionally) advanced utilities — without import clutter.

- Open/close overlays by **component** or by **name/path** (no imports)
- **Singleton** hub (global across app)
- Optional policies: close on route change, Esc to close latest, body scroll lock
- **Plus** features (opt-in via config): de-dupe (`openOnce`), stack tools, async guards, subscriptions, predicates

## Install

```bash
npm i nuxt-overlay-hub
# or pnpm/yarn
```

`nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-overlay-hub'],
  overlayHub: {
    // lightweight defaults
    strictMode: false,          // throw on bad names if true
    closeOnRouteChange: false,  // opt-in
    closeOnEscape: false,
    lockBodyScroll: false,
    devExposeGlobal: process.env.NODE_ENV !== 'production',
    plus: true                  // 👈 enable power helpers (optional)
  }
})
```

This module **auto-imports** `useOverlayHub()`. One composable for everything.

## Quick Start

```ts
const { openByName, closeLatestOfName, ensureSingleByName, anyOpen } = useOverlayHub()

openByName('auth/UserLogin')                         // components/auth/UserLogin.vue
ensureSingleByName('auth/UserRegister', { plan: 'pro' })
closeLatestOfName('home/Welcome')
```

Inside a modal component, close **yourself**:

```ts
import { getCurrentInstance } from 'vue'
const { closeLatestOf } = useOverlayHub()
closeLatestOf(getCurrentInstance()!.type)
```

## Name/Path formats

- `AuthUserLogin` (PascalCase)
- `auth/UserLogin` (path + Pascal)
- `auth/user-login` (path + kebab)

No extra config beyond Nuxt’s default auto-components. If you disabled it, use the **by-component** API.

## Core API (always available)

**By name**

- `openByName(name, props?)`
- `ensureSingleByName(name, props?)`
- `closeLatestOfName(name, value?)`

**By component**

- `openByComponent(component, props?)`
- `ensureSingle(component, props?)`
- `closeLatestOf(component, value?)`
- `anyOpen(component): boolean`

**Passthroughs**

- `overlays`, `open(id, props?)`, `close(id, value?)`, `closeAll()`, `patch(id, props)`, `unmount(id)`, `isOpen(id)`

## Plus API (when `overlayHub.plus = true`)

**Component-based**

- `idsOf(component): symbol[]`
- `countOf(component): number`
- `getLatestId(component): symbol | undefined`
- `openOnce(component, key, props?)`
- `openOrFocus(component, props?)`
- `closeAllExceptLatest(component, value?)`
- `waitUntilClosed(component, { all?: boolean }): Promise<void>`
- `onChange(component, (info) => void)`
- `closeWhere(component, predicate, value?)`

**Name-based mirrors**

- `idsOfByName(name)`, `countOfByName(name)`, `getLatestIdByName(name)`
- `openOnceByName(name, key, props?)`
- `openOrFocusByName(name, props?)`
- `closeAllExceptLatestByName(name, value?)`
- `waitUntilClosedByName(name, { all?: boolean })`
- `onChangeByName(name, (info) => void)`
- `closeWhereByName(name, predicate, value?)`

## Policies (opt-in)

Configure in `overlayHub`:
- `closeOnRouteChange` – close all before navigation
- `closeOnEscape` – Esc closes latest
- `lockBodyScroll` – locks `<html>` scroll while any open

## Strict mode

- `strictMode: true` → throw on unknown names/paths (great for CI)
- `false` (default) → dev-warn, prod no-op

## Devtools

When `devExposeGlobal` is true (default in dev):

```js
window.__overlayHub.overlays
window.__overlayHub.openByName('auth/UserLogin')
```