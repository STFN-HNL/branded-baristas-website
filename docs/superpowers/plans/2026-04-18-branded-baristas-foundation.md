# Branded Baristas — Foundation (Week 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up a working, bilingual-ready Next.js 15 + Sanity + Supabase + Railway foundation with testing, i18n routing, env validation, redirect-map infrastructure, Sanity Studio embedded, CI pipeline, and Railway preview deploys — so that week 2+ (schemas, pages, quote flow) can proceed without infrastructure friction.

**Architecture:** Single Next.js 15 app (App Router, RSC) deployed as Docker container on Railway. Sanity Studio embedded at `/studio`. next-intl handles `/nl/...` + `/en/...` routing with middleware that also applies a code-based WordPress→new-URL 301 redirect map. Env vars validated at startup via zod. Testing via Vitest (unit/integration) + Playwright (E2E). CI via GitHub Actions.

**Tech Stack:** Next.js 15 · TypeScript (strict) · Tailwind CSS 4 · shadcn/ui · next-intl 3 · Sanity v3 / next-sanity · `@supabase/ssr` · resend · zod · Vitest · Playwright · ESLint · Prettier · pnpm · Docker · GitHub Actions · Railway · Cloudflare.

---

## Prerequisites (verify before starting)

- Node.js 20.x (LTS), pnpm 9.x installed locally
- Git + `gh` CLI authenticated
- Accounts ready: Sanity.io, Supabase, Railway, Resend, Cloudflare
- GitHub repo created (empty, private initially) — URL noted
- Sanity project created via `sanity.io/manage` — project ID noted
- Supabase project created — URL + service role key noted
- Resend domain verified for `branded-baristas.com` — API key noted
- Working directory: `/Users/stefanheinrich/Branded Baristas Website`
- This plan runs in that directory (not a git worktree — repo is being initialized as part of Task 1)

---

## File structure produced by this plan

```
branded-baristas-website/
├── .claude/
│   ├── CLAUDE.md
│   ├── commands/
│   │   ├── new-blog.md
│   │   ├── new-case.md
│   │   ├── add-redirect.md
│   │   └── audit-seo.md
│   └── settings.json
├── .github/workflows/
│   ├── ci.yml
│   └── i18n-check.yml
├── docs/
│   ├── architecture.md
│   ├── conventions.md
│   ├── tone-of-voice.md            (placeholder, filled later)
│   ├── decisions/
│   │   ├── 0001-why-sanity.md
│   │   ├── 0002-why-railway.md
│   │   ├── 0003-bilingual-url-strategy.md
│   │   ├── 0004-redirect-strategy-from-wordpress.md
│   │   └── 0005-why-ga4-over-plausible.md
│   └── superpowers/
│       ├── specs/2026-04-18-branded-baristas-website-design.md   (already exists)
│       └── plans/2026-04-18-branded-baristas-foundation.md        (this file)
├── messages/
│   ├── nl.json
│   └── en.json
├── public/
│   └── favicon.ico
├── sanity/
│   ├── sanity.config.ts
│   └── schemas/
│       ├── index.ts
│       ├── settings.ts
│       └── page.ts
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── studio/[[...tool]]/page.tsx
│   │   ├── globals.css
│   │   ├── icon.tsx             (optional, skipped in foundation)
│   │   ├── layout.tsx           (root; minimal, defers to [locale])
│   │   └── not-found.tsx
│   ├── components/
│   │   └── ui/                  (empty; shadcn will populate)
│   ├── lib/
│   │   ├── env.ts
│   │   ├── redirects.ts
│   │   ├── i18n/
│   │   │   ├── routing.ts
│   │   │   └── request.ts
│   │   └── sanity/
│   │       ├── client.ts
│   │       └── queries/
│   │           └── settings.ts
│   └── middleware.ts
├── tests/
│   ├── unit/
│   │   ├── env.test.ts
│   │   ├── redirects.test.ts
│   │   └── i18n-check.test.ts
│   └── e2e/
│       └── locale.spec.ts
├── scripts/
│   └── i18n-check.ts
├── .editorconfig
├── .env.example
├── .env.local                   (gitignored; created manually)
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc
├── components.json              (shadcn)
├── Dockerfile
├── next.config.ts
├── package.json
├── playwright.config.ts
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts           (note: Tailwind 4 uses CSS-first; see Task 4)
├── tsconfig.json
└── vitest.config.ts
```

Each task produces a commit. Commit message style: Conventional Commits (`feat:`, `chore:`, `test:`, `docs:`).

---

## Verification (what "foundation done" looks like)

After all tasks complete:

1. `pnpm dev` runs. Visiting `http://localhost:3000/` 301-redirects to `/nl/`. Visiting `/en/` works.
2. Visiting an old WordPress path (e.g. `/coffee-concepts/piaggio-tuk-tuk`) 301-redirects to the new URL.
3. `pnpm test` passes (unit + redirect map + i18n-check).
4. `pnpm playwright test` passes locally (locale routing + redirect spec).
5. `pnpm typecheck` and `pnpm lint` pass.
6. `pnpm build` succeeds.
7. `http://localhost:3000/studio` opens Sanity Studio; editing `settings` document and publishing works.
8. GitHub push triggers CI; all jobs green.
9. Railway preview URL is live and serves the same app.
10. Env var validation fails-fast when a required var is missing (remove from `.env.local`, restart — server refuses to start with a clear error).

---

## Part A — Repo + scaffold

### Task 1: Initialize git repo, connect to GitHub

**Files:**

- Create: `.gitignore`
- Create: `README.md`
- Create: `.editorconfig`

- [ ] **Step 1: Initialize git in working directory**

```bash
cd "/Users/stefanheinrich/Branded Baristas Website"
git init
git branch -M main
```

Expected: `.git/` directory created; branch is `main`.

- [ ] **Step 2: Create `.gitignore`**

Write `.gitignore`:

```gitignore
# Dependencies
node_modules/
.pnpm-store/

# Next.js
.next/
out/
next-env.d.ts

# Production
dist/
build/

# Env
.env
.env*.local

# IDE
.vscode/
.idea/
*.swp
.DS_Store

# Testing
coverage/
playwright-report/
test-results/

# Sanity
.sanity/

# Logs
*.log
npm-debug.log*
pnpm-debug.log*
```

- [ ] **Step 3: Create minimal `README.md`**

Write `README.md`:

````markdown
# Branded Baristas Website

Next.js 15 marketing + lead-gen website for Branded Baristas, bilingual (NL/EN).

## Stack

Next.js 15 · TypeScript · Tailwind 4 · shadcn/ui · Sanity · Supabase · Resend · Railway

## Getting started

Prerequisites: Node 20+, pnpm 9+.

```bash
pnpm install
cp .env.example .env.local   # fill in secrets
pnpm dev
```
````

Visit `http://localhost:3000/`. Sanity Studio lives at `/studio`.

## Docs

- Spec: `docs/superpowers/specs/2026-04-18-branded-baristas-website-design.md`
- Architecture: `docs/architecture.md`
- Conventions: `docs/conventions.md`
- Decisions (ADRs): `docs/decisions/`

````

- [ ] **Step 4: Create `.editorconfig`**

Write `.editorconfig`:

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
````

- [ ] **Step 5: Create GitHub repo (private) + connect**

```bash
gh repo create branded-baristas-website --private --source=. --remote=origin --description "Branded Baristas website — Next.js bilingual"
```

Expected: repo visible on GitHub; `git remote -v` shows `origin` pointing to `github.com:<user>/branded-baristas-website.git`.

- [ ] **Step 6: Commit**

```bash
git add .gitignore README.md .editorconfig
git commit -m "chore: init repo with baseline config"
git push -u origin main
```

---

### Task 2: Scaffold Next.js 15 + TypeScript + Tailwind

**Files:**

- Create: via `create-next-app` — `package.json`, `next.config.ts`, `tsconfig.json`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `postcss.config.mjs`, `.eslintrc.cjs`, `public/`
- Modify: `package.json` (add scripts)
- Modify: `tsconfig.json` (strict, path aliases)

- [ ] **Step 1: Run create-next-app**

```bash
cd "/Users/stefanheinrich/Branded Baristas Website"
pnpm dlx create-next-app@latest . \
  --ts \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack \
  --use-pnpm \
  --skip-install
pnpm install
```

Expected: `src/app/`, `package.json`, `tsconfig.json`, `tailwind.config.ts` (or `app/globals.css` with `@theme` if Tailwind 4 CSS-first), `postcss.config.mjs` all exist.

Note: if create-next-app installs Tailwind 4 (CSS-first), `tailwind.config.ts` may be absent and `src/app/globals.css` contains `@import "tailwindcss";` + `@theme { ... }`. That is expected and correct.

- [ ] **Step 2: Verify dev server boots**

```bash
pnpm dev
```

Expected: starts on `http://localhost:3000/`, default Next.js page visible. Stop with Ctrl-C.

- [ ] **Step 3: Configure strict TypeScript**

Edit `tsconfig.json` — ensure these settings:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "playwright.config.ts", "tests/e2e/**"]
}
```

- [ ] **Step 4: Add npm scripts**

Edit `package.json` — replace `scripts` with:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test",
  "format": "prettier --write .",
  "i18n:check": "tsx scripts/i18n-check.ts"
}
```

- [ ] **Step 5: Verify typecheck passes**

```bash
pnpm typecheck
```

Expected: exits 0, no errors.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: scaffold Next.js 15 + TS strict + Tailwind"
```

---

### Task 3: Configure Prettier + ESLint

**Files:**

- Create: `.prettierrc`
- Create: `.prettierignore`
- Modify: `.eslintrc.cjs` (or `eslint.config.mjs` depending on Next.js version)
- Modify: `package.json` (add devDependencies)

- [ ] **Step 1: Install Prettier + plugin**

```bash
pnpm add -D prettier prettier-plugin-tailwindcss eslint-config-prettier
```

- [ ] **Step 2: Create `.prettierrc`**

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

- [ ] **Step 3: Create `.prettierignore`**

```
.next/
node_modules/
pnpm-lock.yaml
public/
coverage/
playwright-report/
test-results/
.sanity/
```

- [ ] **Step 4: Update ESLint config to extend prettier**

If `.eslintrc.cjs` exists, add `"prettier"` as last item in `extends`. If `eslint.config.mjs`, add prettier config at end.

Example `.eslintrc.cjs`:

```js
module.exports = {
  extends: ["next/core-web-vitals", "next/typescript", "prettier"],
};
```

- [ ] **Step 5: Run format + lint**

```bash
pnpm format
pnpm lint
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "chore: add prettier + eslint config"
```

---

### Task 4: Install and init shadcn/ui

**Files:**

- Create: `components.json`
- Create: `src/components/ui/` (populated by shadcn)
- Modify: `src/app/globals.css` (adds CSS variables)
- Modify: `package.json` (adds @shadcn deps)

- [ ] **Step 1: Initialize shadcn/ui**

```bash
pnpm dlx shadcn@latest init
```

Interactive prompts: choose defaults — TypeScript: yes, style: New York, base color: neutral, CSS variables: yes.

Expected: `components.json` created; `src/app/globals.css` updated with CSS variables; utility helpers (`src/lib/utils.ts`) created.

- [ ] **Step 2: Add core primitives**

```bash
pnpm dlx shadcn@latest add button input label textarea select dialog
```

Expected: `src/components/ui/button.tsx` etc. created.

- [ ] **Step 3: Verify typecheck + lint**

```bash
pnpm typecheck && pnpm lint
```

Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: init shadcn/ui with core primitives"
```

---

## Part B — Testing + env

### Task 5: Set up Vitest

**Files:**

- Create: `vitest.config.ts`
- Create: `tests/unit/sanity.test.ts` (sanity check for Vitest itself)
- Modify: `package.json` (devDependencies)

- [ ] **Step 1: Install Vitest**

```bash
pnpm add -D vitest @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom jsdom tsx
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts", "tests/unit/**/*.test.tsx"],
    globals: false,
  },
});
```

Install plugin:

```bash
pnpm add -D vite-tsconfig-paths
```

- [ ] **Step 3: Write the failing test**

Create `tests/unit/sanity.test.ts`:

```ts
import { describe, it, expect } from "vitest";

describe("vitest sanity", () => {
  it("runs a basic assertion", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 4: Run test**

```bash
pnpm test
```

Expected: 1 test passes.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "test: set up vitest with sanity test"
```

---

### Task 6: Create env validator with zod (TDD)

**Files:**

- Create: `src/lib/env.ts`
- Create: `tests/unit/env.test.ts`
- Create: `.env.example`

- [ ] **Step 1: Install zod**

```bash
pnpm add zod
```

- [ ] **Step 2: Write the failing test**

Create `tests/unit/env.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { envSchema } from "@/lib/env";

const validEnv = {
  NEXT_PUBLIC_SITE_URL: "https://branded-baristas.com",
  NEXT_PUBLIC_SANITY_PROJECT_ID: "abc123",
  NEXT_PUBLIC_SANITY_DATASET: "production",
  SANITY_API_READ_TOKEN: "sk-sanity",
  SANITY_WEBHOOK_SECRET: "webhook-secret",
  NEXT_PUBLIC_SUPABASE_URL: "https://abc.supabase.co",
  SUPABASE_SERVICE_ROLE_KEY: "service-role-key",
  RESEND_API_KEY: "re_123",
  RESEND_FROM_EMAIL: "hello@branded-baristas.com",
};

describe("envSchema", () => {
  it("accepts a fully valid environment", () => {
    const result = envSchema.safeParse(validEnv);
    expect(result.success).toBe(true);
  });

  it("rejects when NEXT_PUBLIC_SITE_URL is not a URL", () => {
    const result = envSchema.safeParse({ ...validEnv, NEXT_PUBLIC_SITE_URL: "not-a-url" });
    expect(result.success).toBe(false);
  });

  it("rejects when RESEND_FROM_EMAIL is not an email", () => {
    const result = envSchema.safeParse({ ...validEnv, RESEND_FROM_EMAIL: "not-email" });
    expect(result.success).toBe(false);
  });

  it("rejects when SUPABASE_SERVICE_ROLE_KEY is empty", () => {
    const result = envSchema.safeParse({ ...validEnv, SUPABASE_SERVICE_ROLE_KEY: "" });
    expect(result.success).toBe(false);
  });

  it("allows optional NEXT_PUBLIC_GTM_ID to be absent", () => {
    const result = envSchema.safeParse(validEnv);
    expect(result.success).toBe(true);
  });
});
```

- [ ] **Step 3: Run test, verify it fails**

```bash
pnpm test tests/unit/env.test.ts
```

Expected: FAIL — `@/lib/env` does not exist.

- [ ] **Step 4: Implement `src/lib/env.ts`**

Important pattern: `envSchema` is exported for tests; `env` is a lazy Proxy that parses `process.env` on first access (so merely importing the module in a test does not require real env vars).

```ts
import { z } from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
  SANITY_API_READ_TOKEN: z.string().min(1),
  SANITY_WEBHOOK_SECRET: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string().email(),
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

let cached: Env | null = null;

function getEnv(): Env {
  if (cached) return cached;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const formatted = parsed.error.flatten().fieldErrors;
    const msg = Object.entries(formatted)
      .map(([k, v]) => `  ${k}: ${v?.join(", ")}`)
      .join("\n");
    throw new Error(`Invalid environment variables:\n${msg}`);
  }
  cached = parsed.data;
  return cached;
}

export const env = new Proxy({} as Env, {
  get(_target, prop: string) {
    return getEnv()[prop as keyof Env];
  },
});
```

- [ ] **Step 5: Run test, verify it passes**

```bash
pnpm test tests/unit/env.test.ts
```

Expected: 5 tests pass.

- [ ] **Step 6: Create `.env.example`**

```bash
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
SANITY_WEBHOOK_SECRET=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=hello@branded-baristas.com

# Optional
NEXT_PUBLIC_GTM_ID=
```

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: add zod-validated env with tests"
```

---

### Task 7: Set up Playwright for E2E

**Files:**

- Create: `playwright.config.ts`
- Create: `tests/e2e/smoke.spec.ts` (sanity E2E)

- [ ] **Step 1: Install Playwright**

```bash
pnpm dlx create-playwright@latest --install-deps --quiet
```

This creates `playwright.config.ts`, `tests/` (default — we'll use `tests/e2e/`), `.gitignore` additions.

- [ ] **Step 2: Update `playwright.config.ts`**

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

- [ ] **Step 3: Create smoke test**

Create `tests/e2e/smoke.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("root path redirects to /nl and page loads", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.ok()).toBe(true);
  expect(page.url()).toContain("/nl");
});
```

Note: this will fail until Task 10 (next-intl middleware). Mark as `test.skip` for now:

```ts
test.skip("root path redirects to /nl and page loads", async ({ page }) => {
  // enabled after Task 10
});
```

- [ ] **Step 4: Verify playwright installs**

```bash
pnpm playwright install --with-deps chromium
pnpm test:e2e
```

Expected: 0 passed, 1 skipped (no failures).

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "test: set up playwright with skipped smoke test"
```

---

## Part C — Internationalization + routing

### Task 8: Install and configure next-intl

**Files:**

- Create: `src/lib/i18n/routing.ts`
- Create: `src/lib/i18n/request.ts`
- Create: `messages/nl.json`
- Create: `messages/en.json`
- Modify: `next.config.ts`
- Modify: `src/app/layout.tsx` (becomes root layout wrapper)

- [ ] **Step 1: Install next-intl**

```bash
pnpm add next-intl
```

- [ ] **Step 2: Create routing config**

Create `src/lib/i18n/routing.ts`:

```ts
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["nl", "en"],
  defaultLocale: "nl",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
```

- [ ] **Step 3: Create request config**

Create `src/lib/i18n/request.ts`:

```ts
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = routing.locales.includes(requested as never)
    ? (requested as string)
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 4: Create translation files**

Create `messages/nl.json`:

```json
{
  "common": {
    "siteName": "Branded Baristas",
    "quoteCta": "Offerte aanvragen"
  },
  "home": {
    "title": "Welkom bij Branded Baristas",
    "lead": "Barista's, mobiele bars en koffie-ervaringen voor events en op kantoor."
  }
}
```

Create `messages/en.json`:

```json
{
  "common": {
    "siteName": "Branded Baristas",
    "quoteCta": "Request a quote"
  },
  "home": {
    "title": "Welcome to Branded Baristas",
    "lead": "Baristas, mobile bars and coffee experiences for events and in-company."
  }
}
```

- [ ] **Step 5: Update `next.config.ts`**

```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 6: Verify build**

```bash
pnpm build
```

Expected: build succeeds. (Routes will change in next task.)

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: install next-intl with nl+en routing config"
```

---

### Task 9: Create [locale] routing structure

**Files:**

- Delete: `src/app/page.tsx` (moves into [locale])
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx`
- Create: `src/app/[locale]/not-found.tsx`
- Modify: `src/app/layout.tsx` (minimal root — just `{children}`)

- [ ] **Step 1: Replace root layout with minimal pass-through**

Overwrite `src/app/layout.tsx`:

```tsx
import type { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
```

Note: next-intl will re-declare `<html>` and `<body>` inside the `[locale]` layout so the `lang` attribute is correct.

- [ ] **Step 2: Delete default root page**

```bash
rm src/app/page.tsx
```

- [ ] **Step 3: Create locale layout**

Create `src/app/[locale]/layout.tsx`:

```tsx
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Create locale home page**

Create `src/app/[locale]/page.tsx`:

```tsx
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("home");
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-4">{t("lead")}</p>
    </main>
  );
}
```

- [ ] **Step 5: Create locale not-found**

Create `src/app/[locale]/not-found.tsx`:

```tsx
export default function NotFound() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">404 — Not found</h1>
    </main>
  );
}
```

- [ ] **Step 6: Start dev server, verify routes**

```bash
pnpm dev
```

In another terminal:

```bash
curl -sI http://localhost:3000/nl | head -3
curl -sI http://localhost:3000/en | head -3
```

Expected: both return 200.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: create [locale] routing with nl+en layouts"
```

---

### Task 10: Implement middleware (locale + redirect map foundation)

**Files:**

- Create: `src/lib/redirects.ts`
- Create: `src/middleware.ts`
- Create: `tests/unit/redirects.test.ts`

- [ ] **Step 1: Write the failing test for redirect map lookup**

Create `tests/unit/redirects.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { findRedirect, redirects } from "@/lib/redirects";

describe("redirects", () => {
  it("returns destination for a known WordPress path", () => {
    const r = findRedirect("/coffee-concepts/piaggio-tuk-tuk");
    expect(r?.destination).toBe("/nl/diensten/events/piaggio-tuk-tuk");
  });

  it("returns null for an unknown path", () => {
    const r = findRedirect("/nothing-here");
    expect(r).toBeNull();
  });

  it("marks redirects as permanent (301)", () => {
    expect(redirects.every((r) => r.permanent === true)).toBe(true);
  });

  it("has no duplicate source paths", () => {
    const sources = redirects.map((r) => r.source);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it("destinations start with /nl/ or /en/ (locale-prefixed)", () => {
    const bad = redirects.filter(
      (r) => !r.destination.startsWith("/nl/") && !r.destination.startsWith("/en/"),
    );
    expect(bad).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test, verify it fails**

```bash
pnpm test tests/unit/redirects.test.ts
```

Expected: FAIL — `@/lib/redirects` not found.

- [ ] **Step 3: Implement `src/lib/redirects.ts`**

```ts
export type RedirectMapping = {
  source: string;
  destination: string;
  permanent: true;
};

export const redirects: RedirectMapping[] = [
  {
    source: "/coffee-concepts/piaggio-tuk-tuk",
    destination: "/nl/diensten/events/piaggio-tuk-tuk",
    permanent: true,
  },
  {
    source: "/coffee-concepts/mobile-coffee-bar",
    destination: "/nl/diensten/events/mobile-coffee-bar",
    permanent: true,
  },
  {
    source: "/coffee-concepts/vintage-coffee-truck",
    destination: "/nl/diensten/events/coffee-truck",
    permanent: true,
  },
  {
    source: "/coffee-concepts/barista-hire",
    destination: "/nl/diensten/events/barista",
    permanent: true,
  },
  {
    source: "/coffee-concepts/beverage-catering",
    destination: "/nl/diensten/events/barista",
    permanent: true,
  },
  { source: "/offerte-aanvragen", destination: "/nl/offerte", permanent: true },
  { source: "/contact", destination: "/nl/contact", permanent: true },
];

export function findRedirect(pathname: string): RedirectMapping | null {
  return redirects.find((r) => r.source === pathname) ?? null;
}
```

Note: This is a seed list. Week 5 expands it using Search Console data.

- [ ] **Step 4: Run test, verify it passes**

```bash
pnpm test tests/unit/redirects.test.ts
```

Expected: 5 tests pass.

- [ ] **Step 5: Implement middleware with redirect + locale handling**

Create `src/middleware.ts`:

```ts
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { findRedirect } from "@/lib/redirects";
import { routing } from "@/lib/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(request: NextRequest) {
  const redirect = findRedirect(request.nextUrl.pathname);
  if (redirect) {
    const url = new URL(redirect.destination, request.url);
    return NextResponse.redirect(url, 301);
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(nl|en)/:path*", "/((?!api|studio|_next|_vercel|.*\\..*).*)"],
};
```

- [ ] **Step 6: Enable the previously-skipped E2E test**

Edit `tests/e2e/smoke.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("root path redirects to /nl and page loads", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.ok()).toBe(true);
  expect(page.url()).toContain("/nl");
});

test("WordPress redirect returns 301 to /nl/...", async ({ request }) => {
  const response = await request.get("/coffee-concepts/piaggio-tuk-tuk", {
    maxRedirects: 0,
  });
  expect(response.status()).toBe(301);
  expect(response.headers()["location"]).toContain("/nl/diensten/events/piaggio-tuk-tuk");
});
```

- [ ] **Step 7: Run E2E**

```bash
pnpm test:e2e
```

Expected: both tests pass.

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat: add middleware with locale routing + wordpress redirect map"
```

---

### Task 11: i18n-check script + CI guardrail

**Files:**

- Create: `scripts/i18n-check.ts`
- Create: `tests/unit/i18n-check.test.ts`

Intent: enforce that every route segment under `src/app/[locale]/` works for both locales (prevents a NL-only or EN-only route slipping through). This is a simple structural check in week 1 — refined as routes grow.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/i18n-check.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { checkMessagesHaveSameKeys } from "@/lib/i18n/check";
import nl from "../../messages/nl.json";
import en from "../../messages/en.json";

describe("messages parity", () => {
  it("nl and en have identical key trees", () => {
    const missing = checkMessagesHaveSameKeys(nl, en);
    expect(missing).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test, verify it fails**

```bash
pnpm test tests/unit/i18n-check.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement checker**

Create `src/lib/i18n/check.ts`:

```ts
type MsgTree = Record<string, unknown>;

function collectKeys(obj: MsgTree, prefix = ""): string[] {
  const keys: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      keys.push(...collectKeys(v as MsgTree, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

export function checkMessagesHaveSameKeys(a: MsgTree, b: MsgTree): string[] {
  const aKeys = new Set(collectKeys(a));
  const bKeys = new Set(collectKeys(b));
  const missing: string[] = [];
  for (const k of aKeys) if (!bKeys.has(k)) missing.push(`missing in b: ${k}`);
  for (const k of bKeys) if (!aKeys.has(k)) missing.push(`missing in a: ${k}`);
  return missing;
}
```

- [ ] **Step 4: Run test, verify it passes**

```bash
pnpm test tests/unit/i18n-check.test.ts
```

Expected: 1 test passes.

- [ ] **Step 5: Create CLI script**

Create `scripts/i18n-check.ts`:

```ts
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { checkMessagesHaveSameKeys } from "../src/lib/i18n/check";

const root = process.cwd();
const nl = JSON.parse(readFileSync(join(root, "messages/nl.json"), "utf8"));
const en = JSON.parse(readFileSync(join(root, "messages/en.json"), "utf8"));

const missing = checkMessagesHaveSameKeys(nl, en);
if (missing.length > 0) {
  console.error("i18n parity check failed:");
  for (const m of missing) console.error(`  - ${m}`);
  process.exit(1);
}
console.log("i18n parity check: OK");
```

- [ ] **Step 6: Run CLI**

```bash
pnpm i18n:check
```

Expected: prints `i18n parity check: OK`.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: add i18n parity checker + CLI script"
```

---

## Part D — Sanity CMS

### Task 12: Initialize Sanity in the Next.js project

**Files:**

- Create: `sanity.config.ts`
- Create: `sanity/schemas/index.ts`
- Create: `src/lib/sanity/client.ts`

- [ ] **Step 1: Install Sanity dependencies**

```bash
pnpm add next-sanity @sanity/image-url @sanity/vision sanity styled-components
```

Note: `styled-components` is a Sanity Studio peer dep.

- [ ] **Step 2: Set env vars**

Add real values to `.env.local` (not committed):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<from sanity.io/manage>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<create viewer token at sanity.io/manage>
SANITY_WEBHOOK_SECRET=<random secret, used later for /api/revalidate>
```

- [ ] **Step 3: Create `sanity.config.ts`**

Create `sanity.config.ts` at repo root:

```ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "branded-baristas",
  title: "Branded Baristas",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
```

- [ ] **Step 4: Create schema registry (empty for now)**

Create `sanity/schemas/index.ts`:

```ts
import type { SchemaTypeDefinition } from "sanity";

export const schemaTypes: SchemaTypeDefinition[] = [];
```

- [ ] **Step 5: Create Sanity client**

Create `src/lib/sanity/client.ts`:

```ts
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { env } from "@/lib/env";

export const sanityClient = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-01-01",
  useCdn: true,
  token: env.SANITY_API_READ_TOKEN,
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: Parameters<typeof builder.image>[0]) => builder.image(source);
```

- [ ] **Step 6: Typecheck**

```bash
pnpm typecheck
```

Expected: passes.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: add sanity config + typed client"
```

---

### Task 13: Create settings + page schemas

**Files:**

- Create: `sanity/schemas/settings.ts`
- Create: `sanity/schemas/page.ts`
- Create: `sanity/schemas/objects/seo.ts`
- Create: `sanity/schemas/objects/localeString.ts`
- Modify: `sanity/schemas/index.ts`

- [ ] **Step 1: Create bilingual string object**

Create `sanity/schemas/objects/localeString.ts`:

```ts
import { defineType, defineField } from "sanity";

export const localeString = defineType({
  name: "localeString",
  type: "object",
  title: "Localized string",
  fields: [
    defineField({
      name: "nl",
      type: "string",
      title: "Nederlands",
      validation: (r) => r.required(),
    }),
    defineField({ name: "en", type: "string", title: "English", validation: (r) => r.required() }),
  ],
});
```

- [ ] **Step 2: Create SEO object**

Create `sanity/schemas/objects/seo.ts`:

```ts
import { defineType, defineField } from "sanity";

export const seo = defineType({
  name: "seo",
  type: "object",
  title: "SEO",
  fields: [
    defineField({
      name: "title",
      type: "localeString",
      description: "30–60 chars recommended",
      validation: (r) =>
        r.custom((val) => {
          if (!val) return "Required";
          const okNl = val.nl && val.nl.length >= 30 && val.nl.length <= 60;
          const okEn = val.en && val.en.length >= 30 && val.en.length <= 60;
          return okNl && okEn ? true : "NL and EN titles must be 30–60 chars";
        }),
    }),
    defineField({
      name: "description",
      type: "localeString",
      description: "120–155 chars recommended",
      validation: (r) =>
        r.custom((val) => {
          if (!val) return "Required";
          const okNl = val.nl && val.nl.length >= 120 && val.nl.length <= 155;
          const okEn = val.en && val.en.length >= 120 && val.en.length <= 155;
          return okNl && okEn ? true : "NL and EN descriptions must be 120–155 chars";
        }),
    }),
    defineField({ name: "ogImage", type: "image", title: "OG Image (fallback)" }),
  ],
});
```

- [ ] **Step 3: Create `settings` singleton schema**

Create `sanity/schemas/settings.ts`:

```ts
import { defineType, defineField } from "sanity";

export const settings = defineType({
  name: "settings",
  type: "document",
  title: "Site settings",
  fields: [
    defineField({ name: "siteName", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", type: "image" }),
    defineField({ name: "defaultOgImage", type: "image" }),
    defineField({
      name: "contactInfo",
      type: "object",
      fields: [
        defineField({ name: "email", type: "string" }),
        defineField({ name: "phone", type: "string" }),
        defineField({ name: "address", type: "text" }),
      ],
    }),
    defineField({
      name: "social",
      type: "object",
      fields: [
        defineField({ name: "instagram", type: "url" }),
        defineField({ name: "linkedin", type: "url" }),
      ],
    }),
  ],
});
```

- [ ] **Step 4: Create `page` schema (minimal — blocks come later)**

Create `sanity/schemas/page.ts`:

```ts
import { defineType, defineField } from "sanity";

export const page = defineType({
  name: "page",
  type: "document",
  title: "Page",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "object",
      fields: [
        defineField({ name: "nl", type: "slug", options: { source: "title.nl" } }),
        defineField({ name: "en", type: "slug", options: { source: "title.en" } }),
      ],
    }),
    defineField({ name: "seo", type: "seo", validation: (r) => r.required() }),
  ],
});
```

- [ ] **Step 5: Register schemas**

Edit `sanity/schemas/index.ts`:

```ts
import type { SchemaTypeDefinition } from "sanity";
import { localeString } from "./objects/localeString";
import { seo } from "./objects/seo";
import { settings } from "./settings";
import { page } from "./page";

export const schemaTypes: SchemaTypeDefinition[] = [localeString, seo, settings, page];
```

- [ ] **Step 6: Typecheck + commit**

```bash
pnpm typecheck
git add .
git commit -m "feat: add localeString, seo, settings, page sanity schemas"
```

---

### Task 14: Embed Sanity Studio at /studio

**Files:**

- Create: `src/app/studio/[[...tool]]/page.tsx`
- Create: `src/app/studio/[[...tool]]/layout.tsx`

- [ ] **Step 1: Create studio page**

Create `src/app/studio/[[...tool]]/page.tsx`:

```tsx
"use client";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

- [ ] **Step 2: Create studio layout**

Create `src/app/studio/[[...tool]]/layout.tsx`:

```tsx
import type { ReactNode } from "react";

export default function StudioLayout({ children }: { children: ReactNode }) {
  return children;
}
```

- [ ] **Step 3: Exclude /studio from locale middleware**

Middleware config already excludes `/studio` (set in Task 10 matcher). Verify.

- [ ] **Step 4: Start dev + visit studio**

```bash
pnpm dev
```

Open `http://localhost:3000/studio`. Sign in with Sanity account.

Expected: Studio loads, shows "Page" and "Site settings" in the sidebar. Create a settings doc and publish → success.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: embed sanity studio at /studio"
```

---

### Task 15: First end-to-end Sanity fetch

**Files:**

- Create: `src/lib/sanity/queries/settings.ts`
- Modify: `src/app/[locale]/page.tsx` (read siteName from Sanity)

- [ ] **Step 1: Write the query**

Create `src/lib/sanity/queries/settings.ts`:

```ts
import { sanityClient } from "../client";

const SETTINGS_QUERY = `*[_type == "settings"][0]{
  siteName,
  "logo": logo.asset->url
}`;

export type Settings = {
  siteName: string | null;
  logo: string | null;
};

export async function getSettings(): Promise<Settings | null> {
  return sanityClient.fetch<Settings | null>(SETTINGS_QUERY, {}, { next: { tags: ["settings"] } });
}
```

- [ ] **Step 2: Use it in the home page**

Edit `src/app/[locale]/page.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { getSettings } from "@/lib/sanity/queries/settings";

export default async function HomePage() {
  const settings = await getSettings();
  const t = useTranslations("home");
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-4">{t("lead")}</p>
      {settings?.siteName && (
        <p className="mt-8 text-sm text-neutral-500">Sanity says: {settings.siteName}</p>
      )}
    </main>
  );
}
```

Note: `useTranslations` works in async Server Components as of next-intl v3+.

- [ ] **Step 3: Verify**

```bash
pnpm dev
```

Visit `http://localhost:3000/nl/`. Expected: home renders; "Sanity says: ..." appears if settings doc published.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: fetch settings from sanity in home page"
```

---

## Part E — Deploy + CI + docs

### Task 16: Create Dockerfile for Railway

**Files:**

- Create: `Dockerfile`
- Create: `.dockerignore`

- [ ] **Step 1: Create `.dockerignore`**

```
node_modules
.next
.git
.github
docs
tests
playwright-report
test-results
coverage
.env.local
.env*.local
README.md
```

- [ ] **Step 2: Create multi-stage `Dockerfile`**

```dockerfile
# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9 --activate
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

- [ ] **Step 3: Test local Docker build**

```bash
docker build -t branded-baristas:dev .
```

Expected: build succeeds. (This requires Docker Desktop running.)

Optional smoke:

```bash
docker run --rm --env-file .env.local -p 3000:3000 branded-baristas:dev
```

Open `http://localhost:3000/nl/`.

- [ ] **Step 4: Commit**

```bash
git add Dockerfile .dockerignore
git commit -m "feat: add dockerfile with multi-stage build for railway"
```

---

### Task 17: GitHub Actions CI

**Files:**

- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Create workflow**

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]

jobs:
  lint-typecheck-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "pnpm"
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm i18n:check

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "pnpm"
      - run: pnpm install --frozen-lockfile
      - env:
          NEXT_PUBLIC_SITE_URL: http://localhost:3000
          NEXT_PUBLIC_SANITY_PROJECT_ID: ci-project
          NEXT_PUBLIC_SANITY_DATASET: production
          SANITY_API_READ_TOKEN: ci-token
          SANITY_WEBHOOK_SECRET: ci-secret
          NEXT_PUBLIC_SUPABASE_URL: https://ci.supabase.co
          SUPABASE_SERVICE_ROLE_KEY: ci-key
          RESEND_API_KEY: ci-key
          RESEND_FROM_EMAIL: hello@branded-baristas.com
        run: pnpm build

  e2e:
    runs-on: ubuntu-latest
    needs: [lint-typecheck-test]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "pnpm"
      - run: pnpm install --frozen-lockfile
      - run: pnpm playwright install --with-deps chromium
      - env:
          NEXT_PUBLIC_SITE_URL: http://localhost:3000
          NEXT_PUBLIC_SANITY_PROJECT_ID: ci-project
          NEXT_PUBLIC_SANITY_DATASET: production
          SANITY_API_READ_TOKEN: ci-token
          SANITY_WEBHOOK_SECRET: ci-secret
          NEXT_PUBLIC_SUPABASE_URL: https://ci.supabase.co
          SUPABASE_SERVICE_ROLE_KEY: ci-key
          RESEND_API_KEY: ci-key
          RESEND_FROM_EMAIL: hello@branded-baristas.com
        run: pnpm test:e2e
      - if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report
          retention-days: 7
```

- [ ] **Step 2: Push + verify CI runs**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add lint/typecheck/test/build/e2e workflow"
git push
```

Expected: GitHub Actions tab shows jobs running; all green.

---

### Task 18: Railway deploy + preview environments

**Files:**

- Create: `railway.json` (optional — for env mapping)

- [ ] **Step 1: Create Railway project via CLI**

```bash
pnpm dlx @railway/cli@latest login
pnpm dlx @railway/cli@latest init   # create new project, link to current dir
```

- [ ] **Step 2: Connect GitHub repo in Railway dashboard**

In Railway UI → Settings → Service → Source: link to `branded-baristas-website` repo → main branch. Enable "PR Preview Environments".

- [ ] **Step 3: Set env vars in Railway**

In Railway → Service → Variables, add each var from `.env.example` with **production** values. For preview environments, Railway allows variable overrides; set Sanity dataset to `staging` for previews if/when that dataset exists.

- [ ] **Step 4: Generate public domain**

Railway → Service → Settings → Networking → "Generate Domain". Note the URL.

- [ ] **Step 5: Trigger deploy**

Push an empty commit or redeploy in Railway UI.

- [ ] **Step 6: Verify**

Open the Railway URL. Expected: `https://<subdomain>.up.railway.app/` redirects to `/nl/`; page loads; `/studio` loads.

- [ ] **Step 7: Document in ADR**

(Done in Task 21.)

- [ ] **Step 8: Commit any config**

```bash
git add .
git commit -m "chore: railway deploy config" --allow-empty
git push
```

---

### Task 19: Write ADRs 0001–0005

**Files:**

- Create: `docs/decisions/0001-why-sanity.md`
- Create: `docs/decisions/0002-why-railway.md`
- Create: `docs/decisions/0003-bilingual-url-strategy.md`
- Create: `docs/decisions/0004-redirect-strategy-from-wordpress.md`
- Create: `docs/decisions/0005-why-ga4-over-plausible.md`

Each ADR follows the MADR-lite template:

```markdown
# <number>. <title>

**Status:** Accepted
**Date:** 2026-04-18

## Context

<What situation prompted this decision?>

## Decision

<What we picked.>

## Consequences

<Positive, negative, and neutral consequences.>

## Alternatives considered

<What we rejected and why.>
```

- [ ] **Step 1: Write 0001-why-sanity.md**

Content summarising: chose Sanity for its mature i18n, strong editor UX (needed for weekly bilingual blog), embedded Studio in Next.js, managed hosting. Rejected: Payload (more ops), MDX (too manual for weekly bilingual), WordPress headless (legacy friction).

- [ ] **Step 2: Write 0002-why-railway.md**

Chose Railway to stay consistent with Stefan's existing stack + single-vendor ops. Accept: manual container tuning, no native image CDN (mitigated via Cloudflare + Sanity's image CDN). Rejected: Vercel (vendor fragmentation), Fly.io (extra infra knobs).

- [ ] **Step 3: Write 0003-bilingual-url-strategy.md**

Chose `/nl/...` + `/en/...` with locale-specific slugs (not translated at runtime). Rationale: SEO clarity, hreflang, dedicated URL per language. Alternative rejected: subdomain-based (`nl.` / `en.`) — more DNS friction without SEO benefit.

- [ ] **Step 4: Write 0004-redirect-strategy-from-wordpress.md**

Chose code-based redirect map in `src/lib/redirects.ts` served by `middleware.ts`. Rationale: version-controlled, reviewable in PR, test-friendly. Week 5 expands using Search Console top-URLs export. Rejected: Sanity-managed redirects (no editor needs this).

- [ ] **Step 5: Write 0005-why-ga4-over-plausible.md**

Chose GA4 + GTM. Rationale: Stefan plans Google Ads; GA4 has native conversion tracking + audience syncing. Accept: cookie consent banner required (AVG). Rejected: Plausible (no Google Ads integration despite cleaner UX).

- [ ] **Step 6: Commit**

```bash
git add docs/decisions
git commit -m "docs: add ADRs 0001-0005"
```

---

### Task 20: Write CLAUDE.md + docs/architecture.md + docs/conventions.md

**Files:**

- Create: `CLAUDE.md`
- Create: `docs/architecture.md`
- Create: `docs/conventions.md`
- Create: `docs/tone-of-voice.md` (placeholder)

- [ ] **Step 1: Write `CLAUDE.md`**

Copy verbatim the content from spec §7 ("Project CLAUDE.md (initial content)"), adapted to actual repo paths. Keep ≤100 lines.

```markdown
# Branded Baristas Website

Next.js 15 marketing + lead-gen site voor coffee catering. NL/EN bilingual.
Content via Sanity, leads via Supabase+Resend, hosted op Railway.

## Hoe we werken

**Stack is gekozen — wijzig niet zonder ADR.** Als je denkt "misschien met X
beter", schrijf eerst een ADR in `docs/decisions/`.

**Content is heilig.** Alle tekst die een bezoeker ziet komt uit Sanity of
`messages/*.json`. Nooit hardcoded NL/EN in componenten.

**Bilingual-by-default.** Nieuwe pagina/component? Werkt het in NL én EN?
CI faalt als een route in één taal bestaat en in de andere niet.

**SEO is een feature.** Elke publieke route heeft:

- `generateMetadata` met title, description, og, canonical, hreflang
- Server-rendered of ISR (nooit pure client-rendering voor indexeerbaar)
- Structured data waar van toepassing

**Forms via server actions**, behalve `/api/quote` (expliciet webhook-contract).

## Conventions

- TypeScript strict, geen `any` zonder comment waarom
- shadcn/ui als component basis — geen nieuwe UI libs
- Tailwind only — geen CSS-modules of styled-components
- `@/` alias voor imports uit `src/`
- Sanity queries in `src/lib/sanity/queries/`, nooit inline
- Env vars via `src/lib/env.ts` (zod), nooit direct `process.env`

## Commands

- `pnpm dev` — Next + Sanity Studio op :3000/studio
- `pnpm typecheck` — tsc noEmit
- `pnpm lint` — eslint + prettier
- `pnpm test` — vitest
- `pnpm test:e2e` — playwright
- `pnpm i18n:check` — verify NL/EN message key parity

## Niet doen

- Geen nieuwe deps zonder overleg
- Geen hardcoded content met `// TODO: move to CMS`
- Geen `useState` voor server data (RSC + `fetch`)
- Geen redirect in code zonder update van `lib/redirects.ts`
```

- [ ] **Step 2: Write `docs/architecture.md`**

Recap the architecture diagram from spec §2 + reference spec for deeper detail. Keep ≤80 lines.

- [ ] **Step 3: Write `docs/conventions.md`**

Concrete patterns:

- Component file layout
- Sanity query location (`src/lib/sanity/queries/`)
- Query result typing (zod parse at boundary or derived TS types)
- Form handling (server actions except `/api/quote`)
- Image handling (`next/image` + Sanity loader via `urlFor()`)
- Error boundaries at `[locale]/error.tsx`
- Metadata generation pattern (`generateMetadata` per route)

- [ ] **Step 4: Write `docs/tone-of-voice.md` placeholder**

```markdown
# Tone of voice

This document defines NL + EN voice for Branded Baristas content.
To be written in Week 1 of content work (pre-week 3 page builds).

## NL

TBD — core vocabulary, formality level, signature phrases.

## EN

TBD — core vocabulary, formality level, signature phrases.
```

- [ ] **Step 5: Commit**

```bash
git add CLAUDE.md docs/
git commit -m "docs: add CLAUDE.md, architecture, conventions, tone-of-voice placeholder"
```

---

### Task 21: Configure .claude/ (settings + slash commands)

**Files:**

- Create: `.claude/settings.json`
- Create: `.claude/commands/new-blog.md`
- Create: `.claude/commands/new-case.md`
- Create: `.claude/commands/add-redirect.md`
- Create: `.claude/commands/audit-seo.md`

- [ ] **Step 1: Create `.claude/settings.json`**

```json
{
  "permissions": {
    "allow": [
      "Bash(pnpm:*)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(curl:*)"
    ],
    "deny": ["Bash(rm -rf *)", "Bash(git push --force*)"]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "pnpm typecheck 2>&1 | tail -20 || true"
          }
        ]
      }
    ]
  }
}
```

- [ ] **Step 2: Create slash command files**

`.claude/commands/new-blog.md`:

```markdown
Create a new blog post entry in Sanity.

1. Ask the user for: title (NL + EN), excerpt (NL + EN), category, author.
2. Create a Sanity document with type `post`, populate NL + EN fields.
3. Validate that SEO title (30-60 chars) and description (120-155 chars) are set for both languages.
4. Print the Studio URL so the user can open + add body content + publish.
```

`.claude/commands/new-case.md`:

```markdown
Create a new case study entry in Sanity.

1. Ask for: client name, event date, location, guest count, category (events|in-company), title NL+EN, testimonial.
2. Create a `case` document with all fields populated.
3. Link to the relevant `concept` documents via reference.
4. Print the Studio URL.
```

`.claude/commands/add-redirect.md`:

```markdown
Add a redirect from an old URL to a new one.

Input: `<old-path> <new-path>`

1. Append the mapping to `src/lib/redirects.ts`.
2. Run `pnpm test tests/unit/redirects.test.ts` — must pass.
3. Commit with message: `chore(redirects): add <old> -> <new>`.
```

`.claude/commands/audit-seo.md`:

```markdown
Audit SEO metadata across all public routes.

1. Start dev server (`pnpm dev`).
2. For each route in `src/app/[locale]/`, fetch both NL and EN variants.
3. Verify each has: title (30-60 chars), description (120-155), canonical, hreflang (nl/en/x-default), og:image.
4. Print a table of results. Flag any route missing required metadata.
```

- [ ] **Step 3: Commit**

```bash
git add .claude/
git commit -m "chore: add .claude config with permissions, hooks, and slash commands"
git push
```

---

### Task 22: Verification sweep

**Files:** None (verification only — no new files.)

- [ ] **Step 1: Run the full verification list from the top of this plan**

Work through the 10 items under "Verification" and tick each:

1. `pnpm dev` → `/` redirects to `/nl/`.
2. `/en/` works.
3. `/coffee-concepts/piaggio-tuk-tuk` → 301 → `/nl/diensten/events/piaggio-tuk-tuk`.
4. `pnpm test` passes.
5. `pnpm test:e2e` passes.
6. `pnpm typecheck` + `pnpm lint` pass.
7. `pnpm build` succeeds.
8. `/studio` loads, can create + publish `settings` doc.
9. GitHub push → CI green.
10. Railway URL serves the app.
11. Remove `RESEND_API_KEY` from `.env.local`, restart → server refuses with clear error.

- [ ] **Step 2: Tag release**

```bash
git tag v0.1.0-foundation
git push --tags
```

- [ ] **Step 3: Final commit if any open changes**

```bash
git status
# if clean: done. Otherwise:
git commit -am "chore: finalize foundation"
git push
```

---

## End of foundation plan

After this plan is executed, we have a working bilingual Next.js app with embedded Sanity Studio, deploying to Railway via CI, with redirect-map + i18n-check guardrails and full TDD infrastructure. The next plan (week 2) expands Sanity schemas (`concept`, `case`, `post`, `author`, `category`, `pricingTier`, `testimonial`, `brandingOption`) and wires revalidation. Subsequent weekly plans cover pages, quote flow, SEO polish, and launch cutover as described in spec §13.
