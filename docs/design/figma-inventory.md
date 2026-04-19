# Figma Design Inventory — Branded Baristas

**Source file:** `emjXrPQhns9PvbxuRO8ggH`
**URL:** https://www.figma.com/design/emjXrPQhns9PvbxuRO8ggH/Branded-Baristas-%7C-Stefan--Copy-
**Last pulled:** 2026-04-18
**Access:** Personal Access Token in `.env.local` (`FIGMA_TOKEN`) — REST API, free plan

---

## Canonical frames per route

NL-VERSION frames (`99:*`) are the canonical source. Older English frames (`75/86:*`) are fallback templates where no NL-VERSION exists yet.

| Route                        | NL                                      | Figma frame                     | Status                                       |
| ---------------------------- | --------------------------------------- | ------------------------------- | -------------------------------------------- |
| Home                         | `/nl/`                                  | `99:301` Home NL                | NL canonical                                 |
| Over ons                     | `/nl/over-ons`                          | `99:512` Over ons               | NL canonical                                 |
| Blog overview                | `/nl/blog`                              | `99:1000` Blog Overvieuw        | NL canonical                                 |
| Blog detail                  | `/nl/blog/[slug]`                       | `99:653` Blog Artikel           | NL canonical                                 |
| Concept detail (sample)      | `/nl/diensten/events/mobile-coffee-bar` | `99:1120` Mobiele Koffiebar     | NL canonical — template for other 6 concepts |
| Privacy                      | `/nl/privacy`                           | `99:1435` Privacy               | NL canonical                                 |
| Diensten overview            | `/nl/diensten`                          | `86:312` Services Page          | EN fallback — localize in Week 3             |
| Cases overview               | `/nl/cases`                             | `86:523` Our work Page          | EN fallback — localize in Week 3             |
| Cases detail                 | `/nl/cases/[slug]`                      | `86:921` Asset Page (tentative) | EN fallback — verify with Stefan             |
| Offerte / Contact / Branding | —                                       | Not designed yet                | Compose from Home sections                   |

**Older iterations (ignore):** `75:275` Home Page, `86:664` Article Blog Page, `86:801` Blog Page, `86:1236` Privacy Statement Page, Options 1–9 (`33:*`, `56:*`, `70:*`), Frame 118, Frame 11, Frame 137.

---

## Brand colour palette

Sourced from the "Toolkit" page (`0:1`) `Paleta de cores` frame and fill-usage analysis across all frames.

| Hex       | Role (inferred)                                         | Usage count |
| --------- | ------------------------------------------------------- | ----------- |
| `#25211e` | Near-black brown — primary text / dark surfaces         | 550         |
| `#ece8dd` | Cream / bone — page background                          | 32          |
| `#9e623e` | Copper / terracotta — primary accent (CTAs, highlights) | 19          |
| `#0a2d28` | Deep forest green — secondary dark surface              | 12          |
| `#1b493a` | Deeper green — tertiary dark                            | 7           |
| `#4b2b1d` | Dark mocha — accent on accent                           | 3           |
| `#eee3d8` | Off-cream                                               | 1           |
| `#f49639` | Amber highlight                                         | 1           |
| `#dac9b5` | Oat / tan                                               | 1           |

**Proposed Tailwind token names** (to lock in Week 3):

```ts
colors: {
  ink:     "#25211e",  // body text, headings on light
  cream:   "#ece8dd",  // page bg
  copper:  "#9e623e",  // primary accent / CTA
  forest:  "#0a2d28",  // dark surface
  pine:    "#1b493a",  // dark surface alt
  mocha:   "#4b2b1d",  // deep accent
  amber:   "#f49639",  // highlight
  oat:     "#dac9b5",  // muted surface
}
```

---

## Typography

Two families, used exclusively on canonical frames:

| Family        | Role                                           | Weights observed |
| ------------- | ---------------------------------------------- | ---------------- |
| **Roie**      | Display serif — hero headlines, section titles | 400              |
| **Questrial** | Sans — body, UI, labels                        | 400              |

Other fonts seen in `75:*`/`86:*` older frames (Instrument Sans, Aldrich, Bricolage Grotesque, Inter, Aileron, Manrope) are **iteration remnants** — ignore.

### Type scale (from canonical Home frame `99:301` + web-scale Home frame `75:275`)

| Size (px) | Family    | Observed use                     |
| --------- | --------- | -------------------------------- |
| 58        | Roie      | Hero headline (H1)               |
| 50        | Roie      | Section headlines (H2)           |
| 36        | Roie      | Sub-section (H3)                 |
| 24        | Roie      | Card titles (H4)                 |
| 20        | Questrial | Lead paragraph / large body      |
| 18        | Questrial | Body                             |
| 16        | Questrial | Small body / labels / navigation |

### Font loading

Both families need hosting. `Questrial` is on Google Fonts. `Roie` is a commercial face — verify licence with Stefan before Week 3 implementation; otherwise swap to a near-match serif (e.g. Fraunces, Instrument Serif).

---

## Radii

Corner radius values observed (px): `6`, `9`, `20`, `100`, `1000`, `9999`.

Proposed Tailwind scale:

```ts
borderRadius: {
  sm:    "6px",    // chips, small inputs
  md:    "9px",    // buttons, cards
  lg:    "20px",   // large cards, image tiles
  pill:  "100px",  // pill buttons
  full:  "9999px", // circles / avatars
}
```

---

## Spacing & grid

Not extracted from JSON in this pass (requires deeper frame inspection). Week 3 task: measure grid gutters, section paddings, and container widths from `99:301` before writing any component.

---

## Components / design system

**No published Figma styles or components** on this file — all fills and typography are raw, per-layer. This means:

- No one-click import of tokens — they're manually catalogued in this doc.
- When building components, rely on this inventory + direct frame measurement via Figma MCP (`get_design_context`) per component.

---

## Open items

1. **Roie licence** — confirm commercial licence or pick fallback (Fraunces / Instrument Serif).
2. **Concept detail variants** — only `Mobiele Koffiebar` is designed. Reuse its structure for the other 6 concepts (Coffee Truck, Piaggio Tuk-Tuk, Barista Service, Espresso Bar, Pop-up, Executive).
3. **Offerte / Contact / Branding** — no Figma designs yet. Either get designs from Stefan or compose from Home sections + a simple form layout.
4. **Cases detail template** — verify `86:921 Asset Page` is the cases-detail template (name is ambiguous).
5. **Grid/spacing system** — extract in Week 3 kickoff before first component build.

---

## How to re-pull

```bash
source .env.local
curl -s -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/emjXrPQhns9PvbxuRO8ggH/nodes?ids=99:301&depth=10" \
  > .tmp-home.json
```

Frame-to-image (rate-limited, use sparingly):

```bash
curl -s -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/images/emjXrPQhns9PvbxuRO8ggH?ids=99:301&format=png&scale=2"
```
