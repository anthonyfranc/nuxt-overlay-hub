
---
title: API — Plus
---

# API — Plus

Enabled when `overlayHub.plus = true`.

**Component-based**
- `idsOf(component)`
- `countOf(component)`
- `getLatestId(component)`
- `openOnce(component, key, props?)`
- `openOrFocus(component, props?)`
- `closeAllExceptLatest(component, value?)`
- `waitUntilClosed(component, { all?: boolean })`
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
