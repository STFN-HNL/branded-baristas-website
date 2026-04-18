# Conventions

## Imports

- Gebruik `@/` alias voor alle imports uit `src/` (bv. `@/lib/env`, `@/components/ui/button`)
- Relatieve imports alleen binnen dezelfde module-folder

## Environment variables

- Alle env vars door `src/lib/env.ts` (zod-validated)
- Lazy Proxy: validatie pas bij eerste access, niet bij import (anders kapotte tests)
- Nieuwe var? Voeg toe aan `envSchema` + `.env.example` + Railway variables
- Nooit `process.env.X` direct in code — altijd `env.X`

## Sanity queries

- Elke query in eigen file onder `src/lib/sanity/queries/`
- Query export + TypeScript type export per file
- Voorbeeld: `src/lib/sanity/queries/settings.ts` exports `SETTINGS_QUERY`, `Settings` type, `getSettings()`
- Query results wrappen in try/catch — fallback naar `null` bij build-time prerender

## Componenten

- `src/components/ui/` — shadcn primitives (alleen via shadcn CLI toevoegen)
- `src/components/blocks/` — page sections die 1-op-1 mappen naar Sanity blocks (later)
- `src/components/forms/` — quote calculator stappen, contact form (later)
- Geen business-logic in UI-componenten — extract naar hooks of server actions

## Forms

- Default: Next.js server actions
- Uitzondering: `/api/quote` — expliciet webhook met Supabase + Resend
- Valideer client-side én server-side met zod

## Images

- `next/image` voor alles
- Sanity images via `urlFor()` uit `src/lib/sanity/client.ts`
- `cdn.sanity.io` staat in `next.config.ts` remotePatterns
- Geef altijd `width` + `height` (voorkomt CLS)

## Metadata & SEO

- `generateMetadata` per publieke route
- Vereiste fields: title, description, openGraph, canonical, alternates (hreflang)
- Structured data waar relevant (Organization, Service, Article, BlogPosting)

## i18n

- Nieuwe route? Maak hem in `src/app/[locale]/...` — dan werkt NL én EN
- Nieuwe UI-string? Voeg toe aan beide `messages/nl.json` én `messages/en.json`
- `pnpm i18n:check` moet altijd OK melden (CI enforcet dit)
- Slugs per taal (Sanity slug object met nl + en fields)

## Error handling

- Boundaries: `src/app/[locale]/error.tsx` (later)
- Niet-opgevangen fetches naar Sanity/Supabase: wrap in try/catch met null fallback
- Errors naar Sentry (later geïntegreerd)

## Testing

- Unit (vitest): utilities, schemas, pure functies — `tests/unit/`
- Integration (vitest): API routes met mocked externals — toekomstig
- E2E (playwright): user flows — `tests/e2e/`
- Nieuwe util? Eerst failing test schrijven (TDD)

## Commits

- Conventional Commits: feat, fix, chore, docs, test, refactor, ci
- Scope optioneel: `feat(quote): ...`
- Engelse commits (git blame, GitHub integration)

## Niet doen

- Geen nieuwe UI-libs (shadcn + base-ui is de standaard)
- Geen CSS-modules of styled-components — Tailwind only
- Geen client-side data fetching voor indexeerbare content (gebruik RSC + fetch)
- Geen hardcoded strings — alles naar Sanity of `messages/`
- Geen redirects in code zonder update van `src/lib/redirects.ts`
