---
title: Advanced — Best Practices
description: Practical patterns for naming, props, and flow control.
---

# Best Practices

- **Name overlays by feature**: `auth/UserLogin`, `dialogs/DeleteConfirm`, `commerce/Cart`.
- **Keep overlays focused**: UI + local logic; lift business logic outside.
- **Prefer props over global inject** for data input.
- **Use ensureSingle** for panels that should be unique (search, cart).
- **Use openOnce** to avoid duplicates for transient dialogs.
- **Chain flows** by closing then opening, or `waitUntilClosedByName` if plus is enabled.
