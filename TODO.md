# Branded Baristas — Follow-up TODO

Living checklist of things that were intentionally deferred or require a human
(credentials, content, a design call, etc). Tick items off as you finish them.

## 1. Credentials & env vars

Paste these into Railway (and `.env.local` for dev when you want them). All are
optional — the app runs fine without them, individual features just no-op.

- [x] `NEXT_PUBLIC_GA_ID` — set to G-EYKMNTH8T3 on 2026-04-25.
- [x] `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` — set 2026-04-25.
- [x] `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` — set 2026-04-25.
- [x] Create a Supabase table `leads` — created via migration 2026-04-25.

## 2. Content ops (Sanity)

Migration complete 2026-04-25. All content lives in Sanity with hardcoded
fallback still in place (`src/content/*.ts`). Fetcher layer at `src/lib/content/`.

- [x] Move home-page copy (hero, services blurbs, FAQ, footer) into Sanity
      `homePage` singleton + `faqItem` + `concept` docs — done 2026-04-25.
- [x] Move case studies from `src/content/cases.ts` into Sanity `case` docs — done 2026-04-25.
- [x] Move about/branding copy from `src/content/about.ts` and
      `src/content/branding.ts` — done 2026-04-25.
- [x] Replace the two long-form guides with Sanity docs:
      - `src/content/guides/coffee-catering.ts` → Sanity `guide` doc
      - `src/content/guides/barista-bar-specs.ts` → Sanity `guide` doc
      — done 2026-04-25.
- [x] Create a Sanity `testimonial` doc type and wire `TrustRow.tsx` to fetch
      from Sanity with messages fallback — done 2026-04-25.
- [ ] Replace placeholder `publishedTime: "2026-04-15"` in guide pages with
      real dates from the CMS (`guide.updatedAt` field is now populated).
- [ ] After visual verification on Railway: delete hardcoded content files
      (`src/content/about.ts`, `branding.ts`, `cases.ts`, `guides/*.ts`) and
      remove fallback imports from `src/lib/content/*.ts` fetchers.

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
- [x] Add the guide pages to the footer — `/gids` index page created, linked in footer nav 2026-04-26.
- [ ] Fill in real FAQ content beyond the ~20 starter questions in
      `messages/*.json` — direct answers rank well in AI search.

## 5. Legal / consent

- [ ] Ship a cookie banner. GA4 is wired with `consent mode v2` defaulting
      to "denied" (see `src/components/analytics/GoogleAnalytics.tsx`). The
      banner just needs to call `gtag('consent', 'update', { ... })` after
      the user agrees.
- [ ] Review `/privacy` copy — currently placeholder-ish. Add DPA reference
      for Supabase + Resend + GA4 processors.
- [x] Add a cookie policy page — `/cookies` route created, linked in footer 2026-04-26.

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

- [x] `CLAUDE.md` says "Next 15" — already fixed (says 16.2.4).
- [x] Architecture doc `docs/architecture.md` — updated "Next.js 15" → "Next.js 16.2.4" 2026-04-26.
- [ ] `EN` legacy-slug redirects in `src/lib/redirects.ts` assume no one
      has deep links to `/en/over-ons` etc. from before the translated-slug
      rollout. Check logs after deploy to see if more redirects are needed.

---

_Last updated: 2026-04-25. Generated from the audit roadmap at_
_`.cursor/plans/audit_+_seo_llm_conversion_roadmap_38a721a5.plan.md`._
