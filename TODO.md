# Branded Baristas — Follow-up TODO

Living checklist of things that were intentionally deferred or require a human
(credentials, content, a design call, etc). Tick items off as you finish them.

## 1. Credentials & env vars

Paste these into Railway (and `.env.local` for dev when you want them). All are
optional — the app runs fine without them, individual features just no-op.

- [ ] `NEXT_PUBLIC_GA_ID` — GA4 measurement ID (`G-XXXXXXXXXX`).
      Without this, no analytics ships. Create a property at
      <https://analytics.google.com> → Admin → Create property.
- [ ] `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` —
      without these, `/api/quote` accepts the submission but doesn't persist it.
- [ ] `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` —
      without these, no confirmation emails are sent.
- [ ] Create a Supabase table `leads` matching the zod schema in
      `src/lib/leads.ts` before flipping Supabase on.

## 2. Content ops (Sanity)

Everything under `src/content/*.ts` is hardcoded copy marked for migration.
See `src/content/README.md` for the full plan.

- [ ] Move home-page copy (hero, services blurbs, FAQ, footer) from
      `src/content/home.ts` into Sanity `page` / `faqItem` / `concept` docs.
- [ ] Move case studies from `src/content/cases.ts` into Sanity `case` docs.
- [ ] Move about/branding copy from `src/content/about.ts` and
      `src/content/branding.ts`.
- [ ] Replace the two long-form guides with Sanity docs so editors can update
      them without a deploy:
      - `src/content/guides/coffee-catering.ts`
      - `src/content/guides/barista-bar-specs.ts`
- [ ] Create a Sanity `testimonial` doc type and swap the hardcoded KPIs +
      testimonial in `src/components/blocks/TrustRow.tsx` for a Sanity query.
- [ ] Replace placeholder `publishedTime: "2026-04-15"` in guide pages with
      real dates from the CMS once migrated.

## 3. Design / brand assets

- [ ] Design a real OG image template (currently
      `src/app/(site)/[locale]/opengraph-image.tsx` renders a minimal branded
      card). Ideally includes the page title and a hero photo.
- [ ] Shoot / source real client logo grayscale strip for `TrustRow`.
- [ ] Validate Rotterdam address + geo coords in `src/lib/schema.ts`
      (`localBusinessSchema`). Make sure opening hours and phone match
      reality — this feeds `LocalBusiness` JSON-LD and affects local SEO.

## 4. SEO / LLM follow-ups

- [ ] Submit `https://branded-baristas.com/sitemap.xml` to Google Search
      Console for both `nl` and `en` properties.
- [ ] Add real `sameAs` URLs (LinkedIn, Instagram, press mentions) to
      `organizationSchema` in `src/lib/schema.ts` — anchors the brand in
      LLM knowledge graphs.
- [ ] Expand `public/llms.txt` and `public/llms-full.txt` once long-form
      content is in Sanity — they're currently summaries.
- [ ] Add the guide pages to the footer or a "Resources" menu when you want
      visitors (not just crawlers) to find them.
- [ ] Fill in real FAQ content beyond the ~20 starter questions in
      `messages/*.json` — direct answers rank well in AI search.

## 5. Legal / consent

- [ ] Ship a cookie banner. GA4 is wired with `consent mode v2` defaulting
      to "denied" (see `src/components/analytics/GoogleAnalytics.tsx`). The
      banner just needs to call `gtag('consent', 'update', { ... })` after
      the user agrees.
- [ ] Review `/privacy` copy — currently placeholder-ish. Add DPA reference
      for Supabase + Resend + GA4 processors.
- [ ] Add a cookie policy page if the banner is comprehensive.

## 6. Developer ergonomics / ops

- [ ] Hook `pnpm i18n:check` and `pnpm typecheck` into GitHub Actions CI as
      required checks for PRs (scripts exist; the workflow doesn't yet).
- [ ] Set up the Sanity webhook to ping `/api/revalidate` on publish so
      ISR tags actually flush.
- [ ] Add a Playwright smoke test for the quote form end-to-end once
      Supabase + Resend are live.
- [ ] Run `pnpm analyze` once and eyeball the treemap — good baseline
      before anything else gets added.

## 7. Things worth doing eventually

- [ ] A/B test the quote form layout (P3 in the audit plan).
- [ ] Add a date picker to the quote form instead of free-text date.
- [ ] Track `utm_source/medium/campaign` on quote submissions (hidden
      fields that read from the URL on mount).
- [ ] Consider a "Book a 15-min call" Cal.com embed as a lower-friction
      secondary CTA alongside the full quote form.
- [ ] Set up Core Web Vitals dashboard in GA4 (filter on event names
      `LCP`, `CLS`, `INP`, `FCP`, `TTFB`, `FID`) once data starts flowing.

## 8. Known debt / drift

- [ ] `CLAUDE.md` says "Next 15" but the repo is on `next@16.2.4` — update
      the doc.
- [ ] Architecture doc in `docs/architecture.md` may need a refresh after
      this audit round.
- [ ] `EN` legacy-slug redirects in `src/lib/redirects.ts` assume no one
      has deep links to `/en/over-ons` etc. from before the translated-slug
      rollout. Check logs after deploy to see if more redirects are needed.

---

_Last updated: 2026-04-20. Generated from the audit roadmap at_
_`.cursor/plans/audit_+_seo_llm_conversion_roadmap_38a721a5.plan.md`._
