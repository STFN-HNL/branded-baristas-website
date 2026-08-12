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
- [x] Replace the two long-form guides with Sanity docs: - `src/content/guides/coffee-catering.ts` → Sanity `guide` doc - `src/content/guides/barista-bar-specs.ts` → Sanity `guide` doc
      — done 2026-04-25.
- [x] Create a Sanity `testimonial` doc type and wire `TrustRow.tsx` to fetch
      from Sanity with messages fallback — done 2026-04-25.
- [x] Replace placeholder `publishedTime: "2026-04-15"` in guide pages with
      real dates from the CMS — reads `guide.updatedAt` since 2026-07-09.
- [ ] After visual verification on Railway: delete hardcoded content files
      (`src/content/about.ts`, `branding.ts`, `cases.ts`, `guides/*.ts`) and
      remove fallback imports from `src/lib/content/*.ts` fetchers.

## 3. Design / brand assets

- [x] Design a real OG image template — dynamic OG route uses the hero photo
      with a brand gradient overlay since 2026-07-10. Still to do: re-capture
      the static fallback cards (`public/images/og/default-{nl,en}.png`) from
      the new template.
- [ ] Shoot / source real client logo grayscale strip. Note 2026-07-10: the
      old `ClientLogoStrip` (fictional brands Wealthro/Finyon/…) was removed
      from the home page and deleted; build a new image-based strip once real
      logos (with permission) exist.
- [x] Validate address, geo coords, phone and opening hours in `src/lib/schema.ts`
      — Zoetermeer address correct, hours updated to 09:00–20:00 2026-04-29.

## 4. SEO / LLM follow-ups

- [ ] Submit `https://branded-baristas.com/sitemap.xml` to Google Search
      Console for both `nl` and `en` properties.
- [x] Add real `sameAs` URLs (LinkedIn, Instagram) to `organizationSchema`
      in `src/lib/schema.ts` — already present (instagram.com/branded_baristas,
      linkedin.com/company/branded-baristas).
- [ ] Expand `public/llms.txt` and `public/llms-full.txt` once long-form
      content is in Sanity — they're currently summaries.
- [x] Add the guide pages to the footer — `/gids` index page created, linked in footer nav 2026-04-26.
- [ ] Fill in real FAQ content beyond the ~20 starter questions in
      `messages/*.json` — direct answers rank well in AI search.

## 5. Legal / consent

- [x] Ship a cookie banner — `CookieBanner.tsx` built and mounted in layout,
      calls `gtag('consent', 'update', ...)` on accept, localStorage key
      `cookie_consent`, NL+EN i18n — done 2026-04-26 (commit 7f54e93).
- [x] Review `/privacy` copy — entity type (eenmanszaak), KvK 74669907, address
      and GA4 as processor added 2026-04-29.
- [x] Add a cookie policy page — `/cookies` route created, linked in footer 2026-04-26.

## 6. Developer ergonomics / ops

- [ ] Hook `pnpm i18n:check` and `pnpm typecheck` into GitHub Actions CI as
      required checks for PRs (scripts exist; the workflow doesn't yet).
- [x] Set up the Sanity webhook to ping `/api/revalidate` on publish so
      ISR tags actually flush — `SANITY_WEBHOOK_SECRET` set in Railway,
      webhook configured in Sanity dashboard 2026-04-28.
- [x] Add a Playwright smoke test for the quote form end-to-end —
      `tests/e2e/quote-form.spec.ts` (API intercepted, asserts UTM payload)
      since 2026-07-10.
- [ ] Run `pnpm analyze` once and eyeball the treemap — good baseline
      before anything else gets added.

## 7. Things worth doing eventually

- [ ] A/B test the quote form layout (P3 in the audit plan).
- [x] Add a date picker to the quote form — native `<input type="date">`
      since 2026-07-10.
- [x] Track `utm_source/medium/campaign` on quote submissions —
      `UtmCapture` (sessionStorage, first touch) + merged into the payload in
      `QuoteForm` since 2026-07-10.
- [x] "Book a call" Cal.com secondary CTA — built into the hero and the
      offerte aside, gated behind `NEXT_PUBLIC_CAL_URL` (renders only when
      set). **Stefan: set the env var in Railway to activate.**
- [ ] Set up Core Web Vitals dashboard in GA4 (filter on event names
      `LCP`, `CLS`, `INP`, `FCP`, `TTFB`, `FID`) once data starts flowing.

## 8. Known debt / drift

- [x] `CLAUDE.md` says "Next 15" — already fixed (says 16.2.4).
- [x] Architecture doc `docs/architecture.md` — updated "Next.js 15" → "Next.js 16.2.4" 2026-04-26.
- [ ] `EN` legacy-slug redirects in `src/lib/redirects.ts` assume no one
      has deep links to `/en/over-ons` etc. from before the translated-slug
      rollout. Check logs after deploy to see if more redirects are needed.
      (2026-07-09: barista-hire/beverage-catering targets fixed, they 404'd.)

## 9. Launch 2026-07-09 — remaining polish

- [ ] Submit `https://branded-baristas.com/sitemap.xml` in Google Search
      Console (also listed in §4 — the one open launch task).
- [ ] `www.branded-baristas.com` serves the app but does not redirect to the
      apex domain. Canonicals point to apex so SEO is safe, but add a
      Cloudflare redirect rule (www → apex, 301) for cleanliness.
- [ ] Remove stale Resend DNS records for `contact.branded-baristas.com` in
      Cloudflare (old account's DKIM/SPF; root domain verified 2026-07-09 in
      the new Resend account).
- [ ] Consider uploading the seven 2026-07-09 Figma photos to the Sanity
      singletons so editors can swap them; they're currently repo assets
      mapped in `src/lib/content/*.ts`.

## 10. Verbeterronde 2026-07-10 — input van Stefan nodig

Context: full-scope audit (SEO/conversie/vertrouwen). Legacy-WordPress 301's
toegevoegd, nep-content (merken-cases, logostrip, cijfers, demo-blog,
testimonial) verwijderd uit repo én Sanity (backup:
`docs/superpowers/sanity-backup-2026-07-10.json`), hero-CTA → /offerte,
WhatsApp/telefoon-CTA's, UTM-capture + date picker, Fraunces geladen, OG met
hero-foto. Openstaand voor Stefan:

- [ ] **Vanaf-prijzen invoeren** — maak per concept een `pricingTier` document
      aan in Sanity Studio (basisprijs in centen). De "Vanaf €…"-regel op de
      dienst-detailpagina's verschijnt automatisch zodra een tier bestaat;
      zonder tiers wordt er bewust géén prijs getoond. NB: de meta-description
      belooft "vaste dagtarieven" — prijzen invoeren maakt die belofte waar.
- [ ] **`NEXT_PUBLIC_CAL_URL` zetten in Railway** — activeert de
      "Plan een kennismaking"-knoppen (hero + offertepagina).
- [ ] **Bevestig dat `hello@branded-baristas.com` bestaat/ontvangt** — alle
      zichtbare vermeldingen zijn gelijkgetrokken naar hello@ (was mix van
      Info@/info@/hello@). De interne Resend-fallback in `src/lib/leads.ts`
      staat nog op info@ tot dit bevestigd is.
- [ ] **Typo in Sanity fixen** — `concept-espresso-bar` →
      `shortDescription.nl`: "een unieke kantoorperk" moet bv. "een uniek
      kantoorvoordeel" worden (patch via Studio; de repo-fallback is al
      gefixt, maar Sanity-content wint).
- [ ] **TrustRow-cijfers** — de verzonnen "500+ events / 10+ jaar / 200+
      klanten" zijn vervangen door kwalitatieve claims. Lever echte,
      verifieerbare cijfers aan als je die wilt terugbrengen.
- [ ] **Echte cases + blog** — de secties zijn verborgen (nav + sitemap +
      noindex) zolang Sanity leeg is; publiceer echte `case`/`post` documenten
      en alles verschijnt vanzelf weer.
- [ ] **Echte eventfoto's** — meerdere site-foto's ogen AI-gegenereerd; echte
      foto's van eigen events zijn de hoogste merk-ROI (zie ook §9 punt 4).
- [ ] Overweeg daarna: city-landingspagina's ("barista huren Amsterdam/
      Rotterdam/…") — de oude site rankte op zulke termen; vergt echte
      lokale content.

---

_Last updated: 2026-07-10 (verbeterronde). Eerder gegenereerd vanuit_
_`.cursor/plans/audit_+_seo_llm_conversion_roadmap_38a721a5.plan.md`._
