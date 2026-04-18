# Architectuur

Voor de volledige design-context zie
`docs/superpowers/specs/2026-04-18-branded-baristas-website-design.md`.
Dit document is een werkbare samenvatting.

## Systeemoverzicht

```
Cloudflare (CDN + DNS)
        │
        ▼
Railway (Next.js app)
        │
        ├──► Sanity (CMS + CDN)      content, images
        ├──► Supabase (leads)         quote requests
        └──► Resend (email)           confirmations, notifs

Sanity Studio embedded op /studio
Webhook Sanity → /api/revalidate (revalidateTag)
```

## Runtime

- Volledig op Railway als Docker container (Dockerfile multi-stage, output: standalone)
- Next.js 15 App Router, RSC, ISR
- Sanity CDN serveert images en content
- Cloudflare voor static asset caching + DNS

## Datamodel

- Sanity: settings (singleton), page, concept, case, post, author, category,
  pricingTier, testimonial, brandingOption
- Schemas onder `/sanity/schemas/`
- `localeString` en `seo` als herbruikbare object types
- Supabase: `leads` table (zie spec §5)

## i18n

- next-intl v4
- Paden: `/nl/...` en `/en/...`
- `localePrefix: "always"`
- `messages/` voor UI-strings, Sanity voor redactionele content
- CI guardrail: `i18n:check`

## Belangrijke files

- `src/middleware.ts` — locale routing + redirect map
- `src/lib/env.ts` — zod-gevalideerde env vars
- `src/lib/redirects.ts` — 301s vanaf WordPress
- `src/lib/sanity/` — client, queries, image helpers
- `src/lib/i18n/` — routing config, request loader, parity checker
- `sanity.config.ts` + `sanity/schemas/` — CMS definitie

## Deploy

- Railway met Dockerfile
- Preview environments per PR (Railway + GitHub)
- Production op `main` branch
- GitHub Actions CI: lint, typecheck, format:check, test, build, e2e
