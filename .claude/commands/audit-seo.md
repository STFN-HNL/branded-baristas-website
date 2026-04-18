---
description: Audit SEO metadata across all public routes
---

Audit SEO metadata across all public routes.

1. Start dev server (`pnpm dev`).
2. For each route in `src/app/[locale]/`, fetch both NL and EN variants.
3. Verify each has: title (30-60 chars), description (120-155), canonical, hreflang (nl/en/x-default), og:image.
4. Print a table of results. Flag any route missing required metadata.
