# Branded Baristas Website

Next.js 16.2.4 marketing + lead-gen site voor coffee catering. NL/EN bilingual.
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
- `pnpm lint` — eslint
- `pnpm format` — prettier write / `format:check` voor CI
- `pnpm test` — vitest
- `pnpm test:e2e` — playwright
- `pnpm i18n:check` — verify NL/EN message key parity

## Niet doen

- Geen nieuwe deps zonder overleg
- Geen hardcoded content met `// TODO: move to CMS`
- Geen `useState` voor server data (RSC + `fetch`)
- Geen redirect in code zonder update van `lib/redirects.ts`
