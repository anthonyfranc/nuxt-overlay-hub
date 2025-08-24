---
title: Reference — Helper Matrix
description: Side-by-side comparison of Core vs Plus vs Name-based helpers.
---

# Helper Matrix

| Category | Core | Plus | Name-based |
|---|---|---|---|
| Open | `openByComponent` | `openOrFocus` | `openByName` |
| Ensure single | `ensureSingle` | `openOnce` | `ensureSingleByName` |
| Close latest | `closeLatestOf` | `closeAllExceptLatest` | `closeLatestOfName` |
| State | `anyOpen` | `idsOf`, `countOf`, `getLatestId` | `idsOfByName`, `countOfByName`, `getLatestIdByName` |
| Await/flow | — | `waitUntilClosed` | `waitUntilClosedByName` |
| Observe | — | `onChange` | `onChangeByName` |
| Patch | `patch` | — | — |
| Predicates | — | `closeWhere` | `closeWhereByName` |
