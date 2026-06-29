# Responsive Design Overhaul — Branded Baristas Website

**Date:** 2026-04-26
**Approach:** Full Mobile-First Rewrite (Approach 1)
**Audience split:** 50% mobile / 50% desktop
**Goal:** Every page is beautiful and correct on every device — not just "not broken", but elevated.

---

## Context

The site currently has ~48% of block components with zero responsive Tailwind classes. The two most critical failures are: (1) `Header` has no mobile menu — navigation is completely hidden on mobile — and (2) `Hero` has a fixed 702px height with a hardcoded 2-column layout that breaks on any screen under ~900px. Additionally `ParallaxTagline` uses a hardcoded 68px font at a fixed 560px height, and `ClientLogoStrip`, `InlineCta`, and `ConceptCard` have no responsive handling at all.

The overhaul rewrites every component mobile-first: default styles target mobile (390px), breakpoints scale up. It also elevates visual quality — fluid typography via `clamp()`, consistent spacing tokens, and proper touch targets throughout.

---

## 1. Typography System

All type sizes are replaced with `clamp()` fluid values so headings scale smoothly between 390px and 1440px viewports with no hard jumps.

| Role | Mobile | Desktop | Tailwind / CSS |
|---|---|---|---|
| H1 / Display | 32px | 56px | `text-[clamp(2rem,5vw,3.5rem)]` |
| H2 | 22px | 36px | `text-[clamp(1.375rem,3.5vw,2.25rem)]` |
| H3 | 18px | 26px | `text-[clamp(1.125rem,2.5vw,1.625rem)]` |
| H4 | 16px | 20px | `text-[clamp(1rem,2vw,1.25rem)]` |
| Body | 15px | 17px | `text-[clamp(0.9375rem,1.5vw,1.0625rem)]` |
| Label / eyebrow | 10px | 11px | `text-[0.625rem] lg:text-[0.6875rem]` |

The `ParallaxTagline` hardcoded `font-size: 68px` becomes `clamp(2rem, 6vw, 4.25rem)`.

These values are defined once as CSS custom properties in `globals.css` under `@theme inline` and referenced via Tailwind utilities, keeping single-source-of-truth.

---

## 2. Spacing System

All magic number paddings (`px-20 pb-[99px]`, etc.) are replaced with consistent Tailwind tokens:

| Token | Mobile | Desktop | Class |
|---|---|---|---|
| Section vertical | 40px (py-10) | 96px (py-24) | `py-10 lg:py-24` |
| Section horizontal | 20px (px-5) | 80px (px-20) | `px-5 lg:px-20` |
| Card gap | 12px (gap-3) | 24px (gap-6) | `gap-3 lg:gap-6` |
| Heading bottom margin | 12px (mb-3) | 20px (mb-5) | `mb-3 lg:mb-5` |

Max-width wrapper stays `max-w-[1360px] mx-auto` — unchanged.

---

## 3. Header & Mobile Navigation

**Current state:** Nav links are `hidden` with no mobile alternative. Hamburger icon does not exist.

**New behaviour:**

- **Mobile (< lg):** Logo left, Offerte CTA pill + hamburger `☰` icon right. Nav links hidden.
- **Hamburger tap:** Full-screen dark overlay animates in (`bg-ink/95` backdrop, `fixed inset-0 z-50`). Logo centred top, `✕` close top-right, nav links stacked vertically centred (`text-2xl font-bold`), Offerte CTA pill at bottom. Language switcher at very bottom.
- **Desktop (≥ lg):** Existing horizontal nav unchanged.
- **Animation:** Overlay fades in with `transition-opacity duration-200` + translate on the list items for a subtle entrance stagger.
- **State:** Single `useState<boolean>` for `isOpen`. Close on route change, close on `Escape` key, close on overlay background click.

**Files:** `src/components/blocks/Header.tsx`

---

## 4. Hero Section

**Current state:** Fixed `h-[702px]`, hardcoded `px-20 pb-[99px]`, 2-column side-by-side layout, zero responsive classes.

**New mobile layout (approved):** Full-bleed background image fills screen, `min-h-svh` on mobile (`h-[702px]` on desktop preserved via `lg:h-[702px] lg:min-h-0`). Gradient overlay `from-black/80 via-black/30 to-transparent` bottom-up. Text and CTA anchored to bottom-left (`absolute bottom-0 left-0 right-0 p-5 lg:px-20 lg:pb-24`).

**Layout change:**
- Mobile: Single column, all content stacked, eyebrow → H1 → description → CTA button.
- Desktop (≥ lg): Existing 2-column layout (H1 left, description + CTA right) preserved.

**Files:** `src/components/blocks/Hero.tsx`

---

## 5. ParallaxTagline

**Current state:** Fixed `h-[560px]`, `fontSize: 68`, parallax scroll effect using `useTransform`.

**New behaviour:**
- Mobile: Parallax disabled (`useReducedMotion` hook already accounts for this; additionally skip parallax transform when `window.innerWidth < 1024`). Section becomes a simple full-width accent block, `py-20` vertical padding, text centred.
- Desktop: Parallax effect preserved exactly as-is.
- Font size: `68px` → `clamp(2rem, 6vw, 4.25rem)` (32px mobile → 68px desktop).
- Height: `h-[560px]` → `min-h-[240px] lg:min-h-[560px]`.

**Files:** `src/components/blocks/ParallaxTagline.tsx`

---

## 6. ClientLogoStrip

**Current state:** No responsive classes. Logo container likely overflows on narrow viewports.

**Fix:**
- Container: `flex flex-wrap justify-center gap-6 lg:gap-10` (currently `flex gap-x-...` with no wrap).
- Each logo: `h-7 w-auto lg:h-9` (scale down on mobile, maintain aspect ratio).
- Section heading: apply spacing tokens.

**Files:** `src/components/blocks/ClientLogoStrip.tsx`

---

## 7. InlineCta

**Current state:** No responsive classes — single layout that assumes wide viewport.

**Fix:**
- Text and button stack vertically on mobile, side-by-side on `lg:`.
- `flex flex-col gap-4 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left`.
- Button becomes full-width on mobile (`w-full lg:w-auto`).

**Files:** `src/components/blocks/InlineCta.tsx`

---

## 8. ConceptCard

**Current state:** Fixed aspect ratio and padding, no responsive handling.

**Fix:**
- Aspect ratio: `aspect-[4/3] lg:aspect-[3/2]` — slightly taller on mobile for better image display.
- Padding: `p-4 lg:p-6`.
- Title: apply H3 fluid clamp value.

**Files:** `src/components/blocks/ConceptCard.tsx`

---

## 9. Components Already Partially Responsive — Elevation Pass

These components have some responsive classes but need the spacing token pass and type scale applied:

| Component | Current gap | Fix |
|---|---|---|
| `ServicesSection` | Has `sm:/lg:` grid | Apply spacing tokens, fluid type |
| `Pillars` | Has `sm:/lg:` grid | Apply spacing tokens, fluid type |
| `Differentiator` | Has `lg:` split | Apply spacing tokens, fluid type |
| `FAQ` | Has `lg:` sidebar | Stack on mobile (`flex-col`), apply tokens |
| `CasesGrid` | Has `sm:/lg:` grid | Apply spacing tokens, fluid type |
| `Footer` | Has `lg:/sm:` | Increase touch targets to 44px min, apply tokens |
| `ContactSection` | Has `lg:` 2-col | Apply spacing tokens, fluid type |
| `TrustRow` | Has `lg:` | Apply spacing tokens, KPI grid `grid-cols-2 lg:grid-cols-4` |
| `IntroSplit` | Has `lg:` | Apply spacing tokens, fluid type |
| `IntroBlock` | Has `lg:` | Apply spacing tokens, fluid type |
| `Guide` | Has `lg:/sm:` | Apply spacing tokens, fluid type |
| `CookieBanner` | Has `sm:` | Verify touch targets, apply tokens |

---

## 10. Forms

`QuoteForm`, `ContactForm`, `HomeContactForm`:
- All inputs: `w-full` (already likely true, verify).
- Submit buttons: `w-full lg:w-auto`.
- Field groups: `flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6` for paired fields.

**Files:** `src/components/forms/`

---

## 11. Page-Level Audit

All 17 public pages receive a pass after component fixes are applied:

| Page | Primary risk |
|---|---|
| `/` Home | Hero, ParallaxTagline, ClientLogoStrip |
| `/over-ons` | Story image-text split, values grid |
| `/diensten` | Service card grid |
| `/diensten/events/[slug]` | Detail hero, content layout |
| `/diensten/in-company/[slug]` | Detail hero, content layout |
| `/cases` | CasesGrid (already partially responsive) |
| `/cases/[slug]` | Case detail — hero image, PortableText width |
| `/blog` | Blog card grid |
| `/blog/[slug]` | Post detail — PortableText max-width, h1 scale |
| `/gids` | Guides listing |
| `/gids/barista-bar-specs` | Guide content — PortableText |
| `/gids/koffiecatering` | Guide content — PortableText |
| `/branding` | Process steps grid |
| `/offerte` | QuoteForm full-width |
| `/contact` | ContactSection two-col |
| `/cookies` | PortableText content |
| `/privacy` | PortableText content |

**PortableText (`src/components/PortableText.tsx`):** All prose blocks get `max-w-prose mx-auto` and fluid type applied via the existing heading overrides.

---

## 12. Touch & Accessibility

- All interactive elements minimum `44px` touch target (use `min-h-[44px] min-w-[44px]` where needed).
- Mobile nav links: `py-3` each for generous tap area.
- Footer links: `py-2` each.
- CTA buttons: `py-3 px-6` minimum on mobile.
- Existing skip-to-content link preserved as-is.

---

## 13. `.gitignore` Addition

Add `.superpowers/` to `.gitignore` to prevent brainstorm files from being committed.

---

## Verification

After implementation, verify:

1. **Chrome DevTools device emulation** — test on: iPhone SE (375px), iPhone 14 Pro (393px), iPad (768px), iPad Pro (1024px), 1280px desktop, 1440px desktop.
2. **Navigation:** Hamburger opens full-screen overlay. All links work. Close button and Escape key close it.
3. **Hero:** No overflow on any breakpoint. Text readable over image on all screen sizes.
4. **ParallaxTagline:** No parallax jank on mobile. Renders as simple section.
5. **Typography:** All headings scale fluidly — resize browser window and watch headings scale without jumps.
6. **Run `pnpm typecheck`** — no TypeScript errors.
7. **Run `pnpm lint`** — no lint errors.
8. **Run `pnpm i18n:check`** — NL/EN key parity intact (no new hardcoded strings introduced).
9. **Visual check every public route** in both NL and EN at 390px and 1280px.
