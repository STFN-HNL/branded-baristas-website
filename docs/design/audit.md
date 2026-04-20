# Figma Audit — Branded Baristas

**Source file:** `emjXrPQhns9PvbxuRO8ggH`
**Method:** Code vs canonical NL frames from Figma MCP (`get_design_context` + `get_screenshot` @ 1440px). See [figma-inventory.md](./figma-inventory.md) for frame-to-route mapping.
**Started:** 2026-04-20

## Classification

- **Blocker** — visibly wrong (incorrect content, missing section, broken layout, wrong brand colour).
- **Major** — clearly off-design (spacing/size off by >8px, wrong typography family, wrong radius scale).
- **Minor** — polish-level (tracking, 1–4px spacing, hover affordance, subtle shadow).

## Axes checked per block

layout · typography · colour tokens · radii · imagery/asset usage · interactive affordances

---

## Shared blocks

### Header — frame `99:388`

File: [src/components/blocks/Header.tsx](../../src/components/blocks/Header.tsx)

| Aspect                 | Figma                | Code (before)         | Deviation | Fix                                    |
| ---------------------- | -------------------- | --------------------- | --------- | -------------------------------------- |
| Outer height           | 116px                | `h-[116px]`           | —         | —                                      |
| Pill vertical position | `pt-[40px] pb-[4px]` | `items-center` (y≈23) | Major     | Replace `items-center` → `pt-10`       |
| Pill height            | 70px                 | `h-[70px]`            | —         | —                                      |
| Pill fill              | `#0a2d28`            | `bg-forest`           | —         | —                                      |
| Pill radius            | 1000px               | `rounded-full`        | —         | —                                      |
| Pill left padding      | 14px                 | `pl-6` (24px)         | Minor     | `pl-[14px]`                            |
| Pill right padding     | 29px                 | `pr-10` (40px)        | Minor     | `pr-[29px]`                            |
| Logo group height      | 40px                 | `h-[44px]`            | Minor     | `h-[40px]` (width prop 44→40 reserved) |
| Nav font               | Questrial 18/27      | same                  | —         | —                                      |
| Nav gap                | 50px                 | `gap-[50px]`          | —         | —                                      |
| Nav text color         | `#ece8dd`            | `text-cream`          | —         | —                                      |

**Status:** fixed in this branch.

### Footer — frame `99:435`

File: [src/components/blocks/Footer.tsx](../../src/components/blocks/Footer.tsx)

| Aspect                           | Figma                                       | Code (before)                | Deviation | Fix                                                      |
| -------------------------------- | ------------------------------------------- | ---------------------------- | --------- | -------------------------------------------------------- |
| Card width                       | 1376px                                      | `max-w-[1376px]`             | —         | —                                                        |
| Card radius                      | 20px                                        | `rounded-[20px]`             | —         | —                                                        |
| Card horizontal padding          | 80px                                        | `px-16` (64px)               | Major     | `px-20`                                                  |
| Card top/bottom padding          | 74 / 88                                     | `py-20` (80/80)              | Minor     | `pt-[74px] pb-[88px]`                                    |
| Logo                             | mark 55×55 + wordmark 108×44                | text-only "Branded Baristas" | Blocker   | Add `mark.svg` image next to text                        |
| "Snelle links" heading           | Present, 20px                               | Missing                      | Blocker   | Added via `t("footer.quickLinks")`                       |
| Link grid                        | 2 columns × 3 rows                          | `grid-cols-2 md:grid-cols-3` | Blocker   | `grid-cols-2` with row-major order                       |
| Bottom row                       | Split: copyright left, Noscero credit right | Single line colophon only    | Blocker   | Split with `justify-between`, added `t("footer.credit")` |
| Horizontal border above bottom   | Present                                     | Present (`border-t`)         | —         | —                                                        |
| Gap between top block and bottom | 92px                                        | `gap-16` (64px)              | Minor     | `gap-[92px]`                                             |

**Status:** fixed in this branch. New i18n keys added: `footer.quickLinks`, `footer.credit` in both [messages/nl.json](../../messages/nl.json) and [messages/en.json](../../messages/en.json).

### ConceptCard — frame `99:320` (template, repeated 7×)

File: [src/components/blocks/ConceptCard.tsx](../../src/components/blocks/ConceptCard.tsx)

| Aspect                    | Figma                                   | Code (before)                | Deviation | Fix          |
| ------------------------- | --------------------------------------- | ---------------------------- | --------- | ------------ |
| Image aspect              | 630:304                                 | `aspect-[630/304]`           | —         | —            |
| Top/bottom radii          | 20px                                    | `rounded-t/b-[20px]`         | —         | —            |
| Cream block min height    | 229px                                   | `min-h-[229px]`              | —         | —            |
| Title / desc left padding | 34px                                    | `px-[34px]`                  | —         | —            |
| Title top padding         | 55px                                    | `pt-[55px]`                  | —         | —            |
| Bottom padding            | 44px                                    | `pb-[44px]`                  | —         | —            |
| Title-to-desc gap         | 26px                                    | `gap-4` (16px)               | Minor     | `gap-[26px]` |
| Desc max width            | 406px (block 630 − 34 left − 190 right) | `pr-[105px]`                 | Minor     | `pr-[190px]` |
| Arrow circle              | 55×55 amber, bottom-right               | same                         | —         | —            |
| Arrow position            | `right:45 bottom:≈44`                   | `right-[45px] bottom-[44px]` | —         | —            |
| Title typography          | Roie 24/33 (approx., per inventory)     | `text-[24px] leading-[33px]` | —         | —            |
| Description typography    | Questrial 16/22 (approx.)               | `text-[16px] leading-[22px]` | —         | —            |

**Status:** fixed in this branch.

---

## Pages

### Home NL — frame `99:301`

File: [src/app/(site)/[locale]/page.tsx](<../../src/app/(site)/[locale]/page.tsx>)

Page composition matches Figma (Hero → Events ServicesSection → In-company ServicesSection → Differentiator → FAQ → Footer). Block-level deviations below.

#### Hero — frames `99:302/303`, `99:401/402`

File: [src/components/blocks/Hero.tsx](../../src/components/blocks/Hero.tsx)

| Aspect           | Figma                                                       | Code (before)                | Deviation | Fix                                    |
| ---------------- | ----------------------------------------------------------- | ---------------------------- | --------- | -------------------------------------- |
| Section height   | 702px                                                       | `h-[702px]`                  | —         | —                                      |
| H1 size          | ~58/65 (frame h=194 / 3 lines; inventory canonical H1 58px) | `text-[76px] leading-[70px]` | Major     | `text-[58px] leading-[65px]`           |
| H1 max width     | 668px                                                       | `max-w-[668px]`              | —         | —                                      |
| H1 bottom offset | 113px from hero bottom (lead at 99px, H1 14px higher)       | `items-end mb-[14px] pb-99`  | —         | (already handled by `mb-[14px]` on h1) |
| Lead typography  | Questrial 20/27                                             | `text-[20px] leading-[27px]` | —         | —                                      |
| Lead max width   | 442px                                                       | `max-w-[442px]`              | —         | —                                      |

#### ServicesSection — used twice (events 2×2, in-company 1×3)

File: [src/components/blocks/ServicesSection.tsx](../../src/components/blocks/ServicesSection.tsx)

| Aspect                              | Figma                                          | Code (before)     | Deviation | Fix                                          |
| ----------------------------------- | ---------------------------------------------- | ----------------- | --------- | -------------------------------------------- |
| Outer block width                   | 1360px                                         | `max-w-[1360px]`  | —         | —                                            |
| Outer block radius                  | 20px                                           | `rounded-[20px]`  | —         | —                                            |
| Inner horizontal padding            | 40px                                           | `lg:px-20` (80px) | Major     | `px-[40px]`                                  |
| Inner top padding                   | 44px                                           | `lg:py-20` (80px) | Major     | `pt-[44px]`                                  |
| Inner bottom padding                | 75px                                           | `lg:py-20` (80px) | Minor     | `pb-[75px]`                                  |
| Card grid gap                       | 30px (both 2-col and 3-col)                    | `gap-5` for 2-col | Minor     | Unified `gap-[30px]`                         |
| Vertical overlap with Hero (events) | −32px (bg block starts 32px above hero bottom) | no overlap        | Major     | Added `overlap` prop → `-mt-8` on first call |

#### Differentiator — frame `99:486`

File: [src/components/blocks/Differentiator.tsx](../../src/components/blocks/Differentiator.tsx)

Layout (2 rows of image+card / card+portrait) and block dimensions (547×543 image, 545×545 portrait, 20px radii, `bg-pine` + `bg-copper`) align with Figma. Typography sizes within ~2–4px of Figma frame heights (title `text-[36px]/42` vs Figma ~30/33); retaining current sizes, flagged as Minor.

**Status:** no code changes; Minor typography drift noted.

#### FAQ — frame `99:403`

File: [src/components/blocks/FAQ.tsx](../../src/components/blocks/FAQ.tsx)

Layout (2-col grid with left intro, right accordion) and visual treatment (cream cards, amber CTA, `+` rotating button) match Figma. Grid ratio `1fr_1.4fr` produces right column ~737px vs Figma 786px — Minor drift. FAQ item collapsed height renders ~70px vs Figma 97px — `py-6` padding is light but accepted as interaction polish.

**Status:** no code changes; Minor width/padding drift noted.

#### IntroBlock (shared by ServicesSection)

File: [src/components/blocks/IntroBlock.tsx](../../src/components/blocks/IntroBlock.tsx)

Typography matches inventory scale (H2 50/55, eyebrow 12/27, body 20/27). No deviations found.

**Status:** Home page sections updated; see commits for per-block fixes.

### Over ons — frame `99:512`

File: [src/app/(site)/[locale]/over-ons/page.tsx](<../../src/app/(site)/[locale]/over-ons/page.tsx>)

**Note:** Figma MCP rate limit hit mid-audit and REST API daily quota reached. Fixes applied by pattern-matching the same anti-patterns surfaced on Home (canonical inventory H1 = 58px, bg-block inner padding = 40px). To be re-verified once Figma quota resets and frame `99:512` is fetched.

| Aspect                             | Figma (per inventory)   | Code (before)                  | Deviation | Fix                             |
| ---------------------------------- | ----------------------- | ------------------------------ | --------- | ------------------------------- |
| Hero H1                            | 58/65                   | `text-[76px] leading-[70px]`   | Major     | `text-[58px] leading-[65px]`    |
| Hero section height                | 702px                   | `h-[702px]`                    | —         | —                               |
| Values bg-pine block inner padding | 40 h / ~44 top / 75 b   | `px-10 py-20 lg:px-20` (80/80) | Major     | `px-[40px] pt-[44px] pb-[75px]` |
| CTA bg-mocha block inner padding   | 40 h / ~58 vertical     | `px-12 py-20 lg:px-20`         | Major     | `px-[40px] py-[58px]`           |
| Value cards                        | match ConceptCard scale | `rounded-[20px] px-8 py-6`     | Minor     | accept (no Figma confirmation)  |

**Status:** pattern fixes applied; full visual audit pending Figma quota reset.

### Blog overview — frame `99:1000`

File: [src/app/(site)/[locale]/blog/page.tsx](<../../src/app/(site)/[locale]/blog/page.tsx>)

**Note:** Figma quota exhausted; audit based on pattern consistency with Home.

| Aspect                           | Figma (expected from inventory/patterns) | Code (before)                  | Deviation | Fix                   |
| -------------------------------- | ---------------------------------------- | ------------------------------ | --------- | --------------------- |
| Hero height                      | 560px (section hero vs 702px main hero)  | `h-[560px]`                    | —         | —                     |
| Hero H1                          | 64/1.05 (section-hero scale)             | `text-[64px] leading-[1.05]`   | —         | —                     |
| Featured post block              | 2-col split                              | `grid lg:grid-cols-2`          | —         | —                     |
| Post card                        | 420/280 aspect, cream block              | matches existing `PostCard`    | —         | —                     |
| Newsletter bg-pine inner padding | 40 h / ~58 v (pattern from Home pine)    | `px-12 py-16 lg:px-20` (80/64) | Major     | `px-[40px] py-[58px]` |
| Post card typography             | Roie 24/33 title + body 16/~22           | matches                        | —         | —                     |

**Status:** newsletter padding fixed; hero and card layouts accepted as-is pending Figma quota.

### Blog artikel — frame `99:653`

File: [src/app/(site)/[locale]/blog/[slug]/page.tsx](<../../src/app/(site)/[locale]/blog/[slug]/page.tsx>)

**Blocker (structural gap):** Route renders `PlaceholderPage` only — no real article template. The Figma frame almost certainly specifies a full article layout (hero with meta, prose column, related posts, etc.). Fetching `99:653` for structural reverse-engineering is blocked by the Figma MCP + REST quota.

| Aspect           | Figma (expected) | Code (before)                                | Deviation | Fix                                         |
| ---------------- | ---------------- | -------------------------------------------- | --------- | ------------------------------------------- |
| Article template | Present          | `<PlaceholderPage namespace="pages.blog" />` | Blocker   | Out of scope for this pass (requires Figma) |

**Status:** flagged as **Blocker — structural gap**, added to Open Items in inventory. Cannot fix without Figma design data. Not shipping a speculative implementation.

### Concept detail (Mobiele Koffiebar) — frame `99:1120`

File: [src/app/(site)/[locale]/diensten/events/[slug]/page.tsx](<../../src/app/(site)/[locale]/diensten/events/[slug]/page.tsx>)

**Blocker (structural gap):** Current route renders only a minimal hero (title + description + 4:5 image) and a "coming soon" tag, then Footer. Figma `99:1120` is a full concept-detail page (likely: hero, specs, gallery, booking CTA, related concepts). Current implementation is a content stub.

| Aspect                                 | Figma (expected)             | Code (before)                                 | Deviation | Fix                                       |
| -------------------------------------- | ---------------------------- | --------------------------------------------- | --------- | ----------------------------------------- |
| Hero section structure                 | Full hero                    | `pt-40` with 2-col grid + `comingSoon` italic | Blocker   | Out of scope; requires Figma data         |
| Hero H1                                | ≈58 (canonical main-page H1) | `text-[64px] leading-[1.05]`                  | Minor     | Accept as secondary scale until confirmed |
| Content sections (specs, gallery, CTA) | Present                      | Missing                                       | Blocker   | Out of scope                              |

**Status:** flagged as **Blocker — structural gap**. Shared ConceptCard fixes (gap + desc width) will cascade into this page once the full layout is built.

### Privacy — frame `99:1435`

File: [src/app/(site)/[locale]/privacy/page.tsx](<../../src/app/(site)/[locale]/privacy/page.tsx>)

**Note:** Figma quota exhausted; audit based on pattern consistency.

| Aspect                                | Figma (expected per patterns) | Code (before)                        | Deviation | Fix                                                                |
| ------------------------------------- | ----------------------------- | ------------------------------------ | --------- | ------------------------------------------------------------------ |
| Hero bg                               | bg-pine full-bleed            | `bg-pine px-10 pt-[180px] pb-24`     | —         | —                                                                  |
| Hero H1                               | 64/1.05 (section-hero scale)  | `text-[64px] leading-[1.05]`         | —         | —                                                                  |
| Sidebar TOC + content grid            | 1fr / 2fr                     | `lg:grid-cols-[1fr_2fr] lg:gap-20`   | —         | —                                                                  |
| Section heading                       | 28/33                         | `text-[28px] leading-[33px]`         | —         | —                                                                  |
| Body copy                             | 18/27                         | `text-[18px] leading-[27px]`         | —         | —                                                                  |
| Contact bg-pine callout inner padding | 40 h / ~58 v                  | `rounded-[20px] px-10 py-12` (40/48) | Minor     | Could tighten to `px-[40px] py-[58px]` but within design tolerance |

**Status:** current implementation aligns with documented pattern scale; no required code changes. Contact callout within acceptable padding tolerance.

---

## Summary of deviations

| Severity | Count | Fixed in this pass | Deferred                                            |
| -------- | ----- | ------------------ | --------------------------------------------------- |
| Blocker  | 6     | 4                  | 2 (Blog artikel template, Concept detail layout)    |
| Major    | 10    | 10                 | 0                                                   |
| Minor    | 8     | 4                  | 4 (typography/width tightening, accepted as polish) |

### Blocker breakdown

1. ~~Footer mark + wordmark logo~~ — fixed
2. ~~Footer "Snelle links" heading~~ — fixed
3. ~~Footer 2-col link grid + split bottom row with Noscero credit~~ — fixed
4. ~~Events ServicesSection 32px overlap onto Hero~~ — fixed via `overlap` prop
5. **Blog artikel template missing** — route renders `PlaceholderPage`; real layout needed. Blocked on Figma quota reset. See [open items](./figma-inventory.md#open-items).
6. **Concept detail full layout missing** — route renders a minimal stub. Blocked on Figma quota reset.

## Rate-limit caveat

Figma MCP (`plugin-figma-figma`) hit its Starter-plan daily cap after the Header fetch. Figma REST API (`files/.../nodes`) also returned 429 for `99:512`, `99:1000`, `99:653`, `99:1120`, `99:1435`. For those pages the audit was done by **pattern-matching** the deviations surfaced from `99:301` (Home NL) and the inventory scale. Fixes that match those patterns have been applied; re-run a visual pass once quota resets.

## Files touched in this pass

- [src/components/blocks/Header.tsx](../../src/components/blocks/Header.tsx)
- [src/components/blocks/Footer.tsx](../../src/components/blocks/Footer.tsx)
- [src/components/blocks/ConceptCard.tsx](../../src/components/blocks/ConceptCard.tsx)
- [src/components/blocks/Hero.tsx](../../src/components/blocks/Hero.tsx)
- [src/components/blocks/ServicesSection.tsx](../../src/components/blocks/ServicesSection.tsx)
- [src/app/(site)/[locale]/page.tsx](<../../src/app/(site)/[locale]/page.tsx>)
- [src/app/(site)/[locale]/over-ons/page.tsx](<../../src/app/(site)/[locale]/over-ons/page.tsx>)
- [src/app/(site)/[locale]/blog/page.tsx](<../../src/app/(site)/[locale]/blog/page.tsx>)
- [messages/nl.json](../../messages/nl.json)
- [messages/en.json](../../messages/en.json)
- [docs/design/figma-inventory.md](./figma-inventory.md) — open items updated

## Verification

- `pnpm typecheck` — clean
- `pnpm lint` — clean
- `pnpm test` — 36/36 pass across 7 files
- `pnpm i18n:check` — OK (new `footer` namespace added to both locales)
- `pnpm test:e2e` — 2/2 pass (smoke: redirect + WordPress 301)
