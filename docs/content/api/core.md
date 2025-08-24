---
title: API — Core
---

# API — Core

## By name
- `openByName(name, props?)`
- `ensureSingleByName(name, props?)`
- `closeLatestOfName(name, value?)`

## By component
- `openByComponent(component, props?)`
- `ensureSingle(component, props?)`
- `closeLatestOf(component, value?)`
- `anyOpen(component): boolean`

## Passthroughs
- `overlays`, `open(id, props?)`, `close(id, value?)`, `closeAll()`, `patch(id, props)`, `unmount(id)`, `isOpen(id)`
