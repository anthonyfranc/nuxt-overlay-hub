---
title: Project — Roadmap
description: Planned features and future improvements for Overlay Hub.
---

# Roadmap

## ✅ v1.0.0
- Core helpers (openByComponent, closeLatestOf, ensureSingle, anyOpen)
- Plus helpers (idsOf, countOf, openOnce, waitUntilClosed, closeWhere, etc.)
- By-name resolution (no imports required)
- Nuxt 4 module + config support

## 🚧 v1.x
- Devtools inspector panel
- patchByName(name, props) convenience method
- Improved type inference for open/close result values
- More Playground demos (wizard, multi-open stress test)

## 🛠️ v2.x (longer-term)
- Async guards (prevent close until condition met)
- Cross-tab overlay sync (via BroadcastChannel or storage events)
- Extended accessibility: return-focus policies, escape stack control

