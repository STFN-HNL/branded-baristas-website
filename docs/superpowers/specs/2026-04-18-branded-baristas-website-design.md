# Branded Baristas — Nieuwe website

**Status:** Design spec (brainstorm-output, klaar voor implementation plan)
**Datum:** 2026-04-18
**Owner:** Stefan Heinrich
**Locatie:** `/Users/stefanheinrich/Branded Baristas Website`

---

## 1. Context

### Waarom deze verandering

De huidige site op `branded-baristas.com` is WordPress-based, Dutch-only, met 5 coffee concepts en een 3-staps offerteformulier. Geen blog, geen cases, geen internationaal bereik, geen moderne content editor.

### Wat we willen bereiken

Een volledig nieuwe marketing + lead-gen site die:

- **Bredere propositie communiceert** — Events én In-Company services (nieuw segment)
- **Internationaal bereik opent** — volledig bilingual NL + EN
- **Leads beter converteert** — slimme quote calculator met directe prijsindicatie
- **Autoriteit opbouwt** — wekelijks blog + filterable case studies voor SEO en social proof
- **Schaalbaar fundament legt** — modern stack, content-first, CMS-driven

### Uitgangspunten

- Oude site blijft live tijdens bouw — geen tijdsdruk, full launch (P1)
- SEO-rankings van huidige URLs worden behouden via redirect map (M2)
- C1 booking-strategie: instant quote indicator, handmatige bevestiging (geen payments/calendar nu)
- Lead destination: email (Resend) + opslag in Supabase (FL1)
- Analytics: GA4 + GTM (met cookie consent banner vanwege AVG)

---

## 2. Architectuur op hoog niveau

```
Cloudflare (CDN + cache + DNS)
        │
        ▼
┌──────────────────────────────────────┐
│  Next.js 15 app (Railway)            │     ┌──────────────────┐
│  • /nl/..., /en/... via next-intl    │◄───►│  Sanity Cloud    │
│  • Routes: home, diensten, cases,    │     │  (CMS + CDN)     │
│    blog, offerte, contact, about,    │     └──────────────────┘
│    branding                          │
│  • /api/quote → Supabase + Resend    │     ┌──────────────────┐
│  • /api/revalidate (Sanity webhook)  │────►│  Supabase        │
│  • Sanity Studio embedded op /studio │     │  leads table     │
└─────────────┬────────────────────────┘     └──────────────────┘
              │
              └─────────────────────────────►┌──────────────────┐
                                              │  Resend (email)  │
                                              └──────────────────┘
```

### Beslissingen

| Area           | Keuze                                                 | Reden                                              |
| -------------- | ----------------------------------------------------- | -------------------------------------------------- |
| Framework      | Next.js 15 (App Router, RSC)                          | SEO, ISR, image opt, Stefan's stack                |
| Language       | TypeScript strict                                     | Type safety, CMS type generation                   |
| Styling        | Tailwind + shadcn/ui                                  | Design system baseline, Figma compatible           |
| CMS            | Sanity v3                                             | Beste i18n, wekelijks blog vereist goede editor-UX |
| App DB         | Supabase (Postgres)                                   | Leads + eventueel nieuwsbrief; Stefan's stack      |
| Email          | Resend                                                | Transactional mail (lead notify + bevestiging)     |
| i18n           | next-intl                                             | Mature, Sanity i18n compatible, RSC-ready          |
| Hosting        | Railway                                               | Stefan's stack consistency                         |
| CDN            | Cloudflare                                            | Voor Railway; GA/Cloudflare naast Sanity CDN       |
| Design-to-code | Figma MCP                                             | Is al ingesteld                                    |
| Analytics      | GA4 + GTM                                             | Google Ads compat (geplande F2 ads)                |
| Cookie consent | Cookiebot of eigen                                    | AVG vereist                                        |
| Monitoring     | Sentry (errors) + Railway logs + GA4 + Search Console | Dekking errors, performance, rankings              |

---

## 3. Projectstructuur

```
branded-baristas-website/
├── .claude/
│   ├── CLAUDE.md              # project agent rules (zie §7)
│   ├── commands/              # slash commands (/new-blog, /new-case, /add-redirect, /audit-seo)
│   └── settings.json          # hooks + permissies
├── docs/
│   ├── architecture.md        # verbindingen tussen onderdelen
│   ├── content-model.md       # Sanity schemas uitgelegd
│   ├── conventions.md         # code patterns
│   ├── tone-of-voice.md       # content NL + EN
│   ├── decisions/             # ADR's
│   └── superpowers/specs/     # deze spec + toekomstige
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (marketing)/   # home, over-ons, branding
│   │   │   ├── diensten/      # services hub + [category]/[slug]
│   │   │   ├── cases/         # [slug] + filter logic
│   │   │   ├── blog/          # [slug]
│   │   │   ├── offerte/       # quote calculator
│   │   │   └── contact/
│   │   ├── api/
│   │   │   ├── quote/         # POST → Supabase + Resend
│   │   │   └── revalidate/    # Sanity webhook → revalidateTag
│   │   └── studio/[[...tool]] # Sanity Studio embedded
│   ├── components/
│   │   ├── ui/                # shadcn primitives
│   │   ├── blocks/            # page sections (hero, grid, cta, testimonials, ...)
│   │   └── forms/             # quote stappen, contact form
│   ├── lib/
│   │   ├── sanity/            # client, queries, image helper, types
│   │   ├── supabase/          # server client, typed leads
│   │   ├── resend/            # email templates + client
│   │   ├── i18n/              # next-intl config + locale routing
│   │   ├── env.ts             # zod-validated env vars
│   │   └── redirects.ts       # redirect map (code-based)
│   └── styles/
├── sanity/
│   ├── schemas/               # settings, page, concept, case, post, author, category, pricingTier
│   └── sanity.config.ts
├── messages/                  # UI strings (nl.json, en.json) — NIET redactionele content
├── public/                    # logo, favicons, static icons (GEEN redactionele assets)
├── .env.local                 # secrets (gitignored)
├── Dockerfile                 # Railway deploy target
├── next.config.ts
├── middleware.ts              # locale detect + 301 redirects
└── package.json
```

**Belangrijke conventies:**

- Één repo, geen monorepo
- Sanity schemas in `/sanity/`, niet in `/src/`
- `messages/` = UI-strings; redactionele content komt uit Sanity
- `[locale]` segment dwingt bilingual consistentie af (CI fail als route in één taal bestaat)
- Redirect map code-based (`src/lib/redirects.ts`), niet CMS-driven

---

## 4. URL-structuur & sitemap

### Publieke routes (bilingual)

| Functie                   | NL                                         | EN                                      |
| ------------------------- | ------------------------------------------ | --------------------------------------- |
| Home                      | `/nl/`                                     | `/en/`                                  |
| Diensten overview         | `/nl/diensten`                             | `/en/services`                          |
| Event — Mobile Coffee Bar | `/nl/diensten/events/mobile-coffee-bar`    | `/en/services/events/mobile-coffee-bar` |
| Event — Coffee Truck      | `/nl/diensten/events/coffee-truck`         | `/en/services/events/coffee-truck`      |
| Event — Piaggio Tuk-Tuk   | `/nl/diensten/events/piaggio-tuk-tuk`      | `/en/services/events/piaggio-tuk-tuk`   |
| Event — Barista Service   | `/nl/diensten/events/barista`              | `/en/services/events/barista`           |
| In-Company — Espresso Bar | `/nl/diensten/in-company/espresso-bar`     | `/en/services/in-company/espresso-bar`  |
| In-Company — Pop-up       | `/nl/diensten/in-company/pop-up`           | `/en/services/in-company/pop-up`        |
| In-Company — Executive    | `/nl/diensten/in-company/executive`        | `/en/services/in-company/executive`     |
| Branding                  | `/nl/branding`                             | `/en/branding`                          |
| Over ons                  | `/nl/over-ons`                             | `/en/about`                             |
| Cases                     | `/nl/cases` (+ `?type=events\|in-company`) | `/en/cases`                             |
| Case detail               | `/nl/cases/[slug]`                         | `/en/cases/[slug]`                      |
| Offerte                   | `/nl/offerte`                              | `/en/quote`                             |
| Blog                      | `/nl/blog`                                 | `/en/blog`                              |
| Blog post                 | `/nl/blog/[slug]`                          | `/en/blog/[slug]`                       |
| Contact                   | `/nl/contact`                              | `/en/contact`                           |

- `/` → 301 naar `/nl/` (primaire markt)
- Taaldetectie: `accept-language` met header-override knop
- Slugs per taal apart (geen `/en/diensten/...` met NL slug)

### Redirect strategie (van huidige WordPress-site)

1. Exporteer alle URLs uit Google Search Console (traffic last 12 months)
2. Crawl met Screaming Frog voor volledige sitemap
3. Map elke oude URL → nieuwe URL in `src/lib/redirects.ts`
4. `middleware.ts` leest de map, retourneert 301 voor matches
5. Ontbrekende URLs → 404 met nette pagina die naar home/diensten stuurt

Voorbeeld mappings:

```
/coffee-concepts/piaggio-tuk-tuk   → /nl/diensten/events/piaggio-tuk-tuk
/coffee-concepts/mobile-coffee-bar → /nl/diensten/events/mobile-coffee-bar
/offerte-aanvragen                 → /nl/offerte
/contact                           → /nl/contact
```

---

## 5. Data model

### Sanity schemas

- **settings** (singleton) — siteName, logo, defaultOgImage, social, contactInfo, openingsuren, navigation per taal
- **page** (generiek) — title, slug, seo, blocks[] per taal
- **concept** — service types (events én in-company)
  - Veld: `category: 'events' | 'in-company'` (filterbaar)
  - Veld: `title, slug, shortDescription, hero, gallery, specs, pricingTier, blocks, seo` (alles per taal waar nodig)
- **case** — client stories
  - Veld: `category: 'events' | 'in-company'` (filterbaar op cases overzicht)
  - Veld: `title, slug, client, eventDate, location, guestCount, conceptsUsed[], hero, gallery, testimonial, story, seo`
- **post** — blog
  - Veld: `title, slug, publishedAt, author, category, excerpt, body (portable text), coverImage, seo`
- **author** — name, bio, avatar, role
- **category** (blog) — title, slug per taal
- **pricingTier** — `concept`, `basePrice`, `pricePerGuest`, `minGuests`, `maxGuests`, `durationHours`
- **testimonial** — quote, author, role, company, avatar, relatedCase (optional)
- **brandingOption** — title, description, image, priceModifier (voor quote calculator)

**Validation rules:**

- `seo.title` required, 30–60 chars, beide talen
- `seo.description` required, 120–155 chars, beide talen
- `slug` uniek per taal, kebab-case, auto-generated
- Entry kan niet published worden als NL of EN content ontbreekt

### Supabase tabellen

```sql
leads (
  id uuid pk,
  created_at timestamptz default now(),
  locale text,                          -- 'nl' | 'en'
  category text,                        -- 'events' | 'in-company'
  event_type text,
  event_date date,
  location text,
  guest_count int,
  concept_slugs text[],
  branding_options text[],
  estimated_price_cents int,
  contact_name text,
  contact_email text,
  contact_phone text,
  contact_company text,
  message text,
  source text,                          -- utm_source of referrer
  status text default 'new'             -- 'new' | 'contacted' | 'won' | 'lost'
)
```

**RLS:** geen client reads; alleen service-role via `/api/quote` endpoint.

---

## 6. Quote calculator logica

Stappen:

1. **Service kiezen** — Events of In-Company (bepaalt welke concepten beschikbaar zijn)
2. **Event details** — type, datum, locatie, gastenaantal
3. **Concepten selecteren** — multi-select (bv. truck + barista)
4. **Branding opties** — optioneel (branded cups, latte art, custom styling)
5. **Indicatieprijs** — `Σ (tier.basePrice + tier.pricePerGuest × guests)` + branding modifiers
6. **Contact** — naam, email, telefoon, bedrijf, bericht
7. **Submit** — POST `/api/quote`:
   - Supabase insert
   - Resend: notificatie naar intern lead-adres (TBD bij Stefan — BB inbox)
   - Resend: bevestiging naar klant (per taal, uit template)

**Altijd zichtbaar:** disclaimer dat prijs een indicatie is en definitieve offerte volgt.

---

## 7. CLAUDE.md & way-of-working

### Globale structuur

- `~/.claude/CLAUDE.md` — bestaand, ongewijzigd
- `Branded Baristas Website/CLAUDE.md` — nieuw, project-specifiek, compact (≤100 regels)
- `docs/` — diepte per onderwerp

### Project CLAUDE.md (initial content)

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
- `pnpm test` — vitest + playwright
- `pnpm sanity:types` — regen types uit Sanity schemas

## Niet doen

- Geen nieuwe deps zonder overleg
- Geen hardcoded content met `// TODO: move to CMS`
- Geen `useState` voor server data (RSC + `fetch`)
- Geen redirect in code zonder update van `lib/redirects.ts`
```

### ADR's bij start

- `0001-why-sanity.md`
- `0002-why-railway.md`
- `0003-bilingual-url-strategy.md`
- `0004-redirect-strategy-from-wordpress.md`
- `0005-why-ga4-over-plausible.md`

### Slash-commands (`.claude/commands/`)

- `/new-blog` — genereert Sanity blog entry template (NL + EN velden)
- `/new-case` — idem voor case study
- `/add-redirect <oud> <nieuw>` — update redirect map + test
- `/audit-seo` — check metadata/hreflang/structured data op alle routes

### Hooks (`.claude/settings.json`)

- **PostToolUse** op Write/Edit → `pnpm typecheck` op gewijzigde files
- **PreToolUse** op `rm -rf` → block
- **Stop hook** — samenvatting wijzigingen + "still to do"

---

## 8. SEO-strategie

### Technische baseline

- Alle pagina's server-rendered (RSC) of ISR
- `generateMetadata` per route — title, description, canonical, og
- `hreflang` automatisch op elke pagina (nl, en, x-default)
- `sitemap.xml` auto-gegenereerd uit Sanity (`app/sitemap.ts`)
- `robots.txt` met disallow voor `/studio` en `/api`
- Core Web Vitals targets: LCP <2.5s, CLS <0.1, INP <200ms
- Cloudflare voor static cache, `next/image` met Sanity loader (AVIF/WebP)

### Structured data (JSON-LD)

- Home → `Organization` + `LocalBusiness`
- Diensten → `Service` + `Offer`
- Cases → `Article` met klantvermelding
- Blog posts → `BlogPosting` + author + datePublished
- Contact → `ContactPoint` + openingsuren

### Content-level SEO

Sanity verplichte velden per entry:

- `seoTitle` (30–60 chars, gevalideerd)
- `seoDescription` (120–155 chars)
- `ogImage` (fallback naar cover)
- `focusKeyword` (optioneel)

Validatie blokkeert publish als velden ontbreken in een taal.

### Migratie

- Export Search Console data → identificeer top-traffic URLs
- Screaming Frog crawl → volledige URL-lijst
- Map bouwen in `src/lib/redirects.ts`
- 7 dagen post-launch: WordPress op `legacy.branded-baristas.com` als fallback

---

## 9. Figma MCP workflow

1. **Design tokens eerst** (week 1) — kleuren/typo/spacing uit Figma → `tailwind.config.ts`
2. **Component-voor-component** — niet page-dumps; per Figma node een shadcn-conform component
3. **Blocks 1-op-1 met Sanity** — Figma "Hero" variant = `<HeroBlock>` = Sanity `hero` block schema
4. **Typografie-arme componenten** — content komt altijd via props/Sanity, nooit in component
5. **PR review** — Figma node link + screenshot comparison in description

---

## 10. Deployment & CI

### Railway setup

- Eén Railway project, meerdere services
- Multi-stage Dockerfile (deps → build → slim runtime, ~150MB)
- Preview environments per PR (auto via GitHub integration)
- **Preview env**: Sanity dataset `staging`, Supabase `preview`, Resend sandbox
- **Production env**: Sanity dataset `production`, Supabase `prod`, Resend live

### Env vars (Railway UI + `.env.local` voor dev)

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_READ_TOKEN
SANITY_WEBHOOK_SECRET
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
RESEND_FROM_EMAIL
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_GTM_ID
```

Alle gevalideerd via `src/lib/env.ts` met zod — server start faalt bij ontbrekende vars.

### GitHub Actions (CI)

- `lint` → `pnpm lint`
- `typecheck` → `pnpm typecheck`
- `test` → `pnpm test` (vitest)
- `e2e` → `pnpm playwright` (main + nightly)
- `build` → `pnpm build` (verify)
- `i18n-check` → custom: elke route bestaat in NL + EN

Railway deployt alleen bij groen CI op main.

### Launch cutover

1. Live op `staging.branded-baristas.com` — uitgebreid testen
2. Search Console: nieuwe property + sitemap submit
3. DNS switch via Cloudflare: `branded-baristas.com` → Railway
4. Oude WP: 7 dagen live op `legacy.branded-baristas.com` als fallback
5. Monitor eerste week: Search Console crawl, GA4 realtime, Railway logs, Sentry

---

## 11. Kritieke files & hergebruikbare utils

### Nieuw aan te maken

- `src/middleware.ts` — locale detection + redirect map lookup
- `src/lib/env.ts` — zod env validator
- `src/lib/redirects.ts` — exported array met 301 mappings
- `src/lib/sanity/client.ts` — Sanity client + query helpers
- `src/lib/sanity/queries/*.ts` — per content type groq queries
- `src/lib/sanity/image.ts` — `urlFor()` helper met next/image loader
- `src/lib/supabase/server.ts` — service-role client (server-only)
- `src/lib/resend/client.ts` + `src/lib/resend/templates/` — lead-notify, klant-bevestiging
- `src/lib/i18n/config.ts` — locales, fallback
- `src/app/sitemap.ts` — dynamische sitemap uit Sanity
- `src/app/robots.ts` — robots.txt
- `src/app/api/quote/route.ts` — lead handler
- `src/app/api/revalidate/route.ts` — Sanity webhook → `revalidateTag`
- `src/components/ui/*` — shadcn init (button, input, dialog, etc.)
- `src/components/blocks/*` — hero, textImage, cta, grid, testimonials, ...
- `sanity/schemas/*.ts` — alle content types
- `sanity.config.ts`
- `Dockerfile`
- `.claude/CLAUDE.md`, `.claude/commands/*`, `.claude/settings.json`
- `docs/decisions/000{1-5}-*.md`

### Her te gebruiken conventies

- shadcn/ui — init met `pnpm dlx shadcn@latest init`
- next-intl standaard structuur (`messages/`, `src/i18n/`)
- Sanity's `next-sanity` helpers (`@sanity/client`, `@portabletext/react`, `next-sanity/studio`)
- `@supabase/ssr` voor server client

---

## 12. Verificatie (hoe weten we dat het werkt)

### End-to-end checks vóór launch

- **Taal-switch**: elke route is bereikbaar in NL én EN, content klopt
- **Redirects**: alle top-20 oude URLs uit Search Console → 301 naar juiste nieuwe URL (test via curl)
- **Quote flow**: submit in NL → lead in Supabase + mail naar Stefan + bevestiging naar klant (beide talen)
- **SEO meta**: alle publieke routes tonen correct title/description/canonical/hreflang/og (handmatig + `/audit-seo` command)
- **Structured data**: valideer met [schema.org validator](https://validator.schema.org/) voor home, concept, case, post
- **Sitemap**: `/sitemap.xml` bevat alle NL + EN routes, correct `lastmod`
- **Core Web Vitals**: PageSpeed Insights groen voor home, 2 concepten, 1 case, 1 blog post
- **GA4**: events binnen (pageview, quote submit als conversion)
- **Cookie consent**: werkt — GTM laadt pas na consent
- **CMS preview**: Sanity preview URLs renderen correct in Next.js
- **Accessibility**: axe-core of Lighthouse a11y score ≥95 op key pages

### Test infrastructuur

- **Unit (vitest)**: utils, redirect map matching, quote price calculator, env validator
- **Integration**: `/api/quote` handler met mocked Supabase + Resend
- **E2E (Playwright)**: taal-switch, quote submit happy path, redirect voor 3 top-URLs, 404 handling

---

## 13. Fasering binnen P1 (full launch)

Niet publiek gefaseerd, maar intern werkvolgorde voor dev:

**Week 1 — Fundament**

- Repo + `.claude/` setup, CLAUDE.md, ADR's 0001-0005
- Next.js + TS + Tailwind + shadcn init
- next-intl routing, `[locale]` segment, middleware
- Figma design tokens → Tailwind config
- Sanity project + basis schemas (settings, page)
- Railway project + preview env werkend

**Week 2 — Content infrastructure**

- Alle Sanity schemas (concept, case, post, author, category, pricingTier, testimonial, brandingOption)
- Studio embedded op `/studio`
- Queries + type generation
- Revalidation webhook

**Week 3 — Pagina's (Figma → code)**

- Home
- Diensten overview + 7 concept detail pages
- Branding
- Over ons
- Cases overview + detail template
- Blog overview + detail template
- Contact
- 404 + error pages

**Week 4 — Conversie + lead flow**

- Quote calculator (alle stappen + validaties)
- `/api/quote` endpoint + Resend templates
- Supabase tabel + RLS
- Contact form

**Week 5 — SEO + polish**

- Alle `generateMetadata` functies
- Sitemap, robots, hreflang, structured data
- Redirect map volledig (uit Search Console)
- GA4 + GTM + cookie consent
- Core Web Vitals optimalisatie
- E2E test suite groen

**Week 6 — Content migratie + soft launch**

- Huidige content (5 oude concepten) naar Sanity — in beide talen
- Eerste 2-3 cases gepubliceerd
- Eerste 2 blog posts gepubliceerd (voor SEO baseline)
- Staging walkthrough met Stefan
- DNS cutover + monitoring

---

## 14. Open punten voor implementation plan

De volgende dingen zijn nu bewust nog niet vastgelegd — deze komen in het implementation plan:

- Exacte Figma bestanden / node IDs per pagina
- Huidige content (copy, images) — inventariseren in week 1
- Tone-of-voice NL + EN — schrijven in week 1 (`docs/tone-of-voice.md`)
- Prijspunten per `pricingTier` — Stefan levert aan in week 2
- Keyword-lijst voor SEO content strategy — separate workshop
- Email template designs (lead notify + klant bevestiging) — week 4

---

## 15. Volgende stappen na spec-approval

1. Stefan reviewt deze spec
2. Na approval: invoke `writing-plans` skill voor gedetailleerd implementation plan
3. Implementation plan splitst dit uit in concrete, uitvoerbare taken met TDD-discipline
4. Week 1 start met repo setup + fundament
