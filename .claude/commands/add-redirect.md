---
description: Add a redirect from an old URL to a new one
---

Add a redirect from an old URL to a new one.

Input: `<old-path> <new-path>`

1. Append the mapping to `src/lib/redirects.ts`.
2. Run `pnpm test tests/unit/redirects.test.ts` — must pass.
3. Commit with message: `chore(redirects): add <old> -> <new>`.
