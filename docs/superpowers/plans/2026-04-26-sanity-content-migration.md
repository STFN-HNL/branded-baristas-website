# Sanity Content Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all hardcoded copy from `src/content/*.ts` into Sanity CMS documents, add a typed fetcher layer with hardcoded fallback, and update all consuming pages and components.

**Architecture:** Five new Sanity schemas are added (faqItem, guide documents; homePage, aboutPage, brandingPage singletons). A `scripts/migrate-sanity.ts` script programmatically imports all content using a write token. A fetcher layer at `src/lib/content/` wraps Sanity queries with fallback to the existing hardcoded files, so pages can be updated before the migration script runs without breaking the site. Consuming pages swap `@/content/*` imports for `@/lib/content/*` async fetchers. Images for cases/concepts are uploaded to Sanity CDN via the migration script; hero images for page singletons (about, home, branding) remain static `/public` assets.

**Tech Stack:** @sanity/client (existing), next-sanity defineQuery (existing), tsx (existing), vitest (existing)

---

## Prerequisites

**Get a Sanity write token** (one-time, done by human):
1. [sanity.io/manage](https://sanity.io/manage) → project **Branded Baristas** → API → Tokens → Add API token
2. Name: `Migration`, Permissions: **Editor**
3. Copy the token and add to `.env.local`:
   ```
   SANITY_WRITE_TOKEN=<token>
   ```
4. Also add to `src/lib/env.ts` (see Task 1).

---

## File Map

**New Sanity schemas:**
- Create: `sanity/schemas/faqItem.ts`
- Create: `sanity/schemas/guide.ts`
- Create: `sanity/schemas/homePage.ts`
- Create: `sanity/schemas/aboutPage.ts`
- Create: `sanity/schemas/brandingPage.ts`
- Modify: `sanity/schemas/index.ts`

**New GROQ queries:**
- Create: `src/lib/sanity/queries/faqItems.ts`
- Create: `src/lib/sanity/queries/guide.ts`
- Create: `src/lib/sanity/queries/homePage.ts`
- Create: `src/lib/sanity/queries/aboutPage.ts`
- Create: `src/lib/sanity/queries/brandingPage.ts`
- Create: `src/lib/sanity/queries/testimonial.ts`

**New fetcher layer:**
- Create: `src/lib/content/faqItems.ts`
- Create: `src/lib/content/guide.ts`
- Create: `src/lib/content/homePage.ts`
- Create: `src/lib/content/aboutPage.ts`
- Create: `src/lib/content/brandingPage.ts`
- Create: `src/lib/content/cases.ts`
- Create: `src/lib/content/concepts.ts`
- Create: `src/lib/content/trustRow.ts`

**Migration script:**
- Create: `scripts/migrate-sanity.ts`

**Updated pages/components (swap imports):**
- Modify: `src/app/(site)/[locale]/page.tsx`
- Modify: `src/app/(site)/[locale]/over-ons/page.tsx`
- Modify: `src/app/(site)/[locale]/branding/page.tsx`
- Modify: `src/app/(site)/[locale]/cases/page.tsx`
- Modify: `src/app/(site)/[locale]/diensten/page.tsx`
- Modify: `src/app/(site)/[locale]/diensten/events/[slug]/page.tsx`
- Modify: `src/app/(site)/[locale]/diensten/in-company/[slug]/page.tsx`
- Modify: `src/app/(site)/[locale]/gids/page.tsx`
- Modify: `src/app/(site)/[locale]/gids/koffiecatering/page.tsx`
- Modify: `src/app/(site)/[locale]/gids/barista-bar-specs/page.tsx`
- Modify: `src/components/blocks/TrustRow.tsx`
- Modify: `src/app/api/revalidate/route.ts`
- Modify: `src/app/sitemap.ts`

**Deleted after migration (in final task):**
- `src/content/about.ts`
- `src/content/branding.ts`
- `src/content/cases.ts`
- `src/content/guides/coffee-catering.ts`
- `src/content/guides/barista-bar-specs.ts`
- `src/content/home.ts` is kept for Footer (footer columns + colophon only), all other exports removed

---

## Phase 1 — Add env var + Sanity schemas

### Task 1: Add `SANITY_WRITE_TOKEN` to env.ts

**Files:** Modify `src/lib/env.ts`

- [ ] Add optional write token to the env schema:

```typescript
// In the z.object({...}) in src/lib/env.ts, add:
SANITY_WRITE_TOKEN: z.string().optional(),
```

- [ ] Run `pnpm typecheck` — expect clean.
- [ ] Commit: `git add src/lib/env.ts && git commit -m "chore: add SANITY_WRITE_TOKEN to env schema"`

---

### Task 2: Create `faqItem` Sanity schema

**Files:** Create `sanity/schemas/faqItem.ts`

- [ ] Create the file:

```typescript
import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  type: "document",
  title: "FAQ item",
  fields: [
    defineField({ name: "question", type: "localeString", title: "Question", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "localeText", title: "Answer", validation: (r) => r.required() }),
    defineField({ name: "order", type: "number", title: "Sort order" }),
  ],
  preview: {
    select: { title: "question.nl" },
    prepare: ({ title }) => ({ title }),
  },
});
```

---

### Task 3: Create `guide` Sanity schema

**Files:** Create `sanity/schemas/guide.ts`

- [ ] Create the file:

```typescript
import { defineField, defineType } from "sanity";

export const guide = defineType({
  name: "guide",
  type: "document",
  title: "Guide",
  fields: [
    defineField({ name: "title", type: "localeString", title: "Title", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "bilingualSlug", title: "Slug", validation: (r) => r.required() }),
    defineField({ name: "lead", type: "localeText", title: "Lead", validation: (r) => r.required() }),
    defineField({
      name: "intro",
      type: "object",
      title: "Intro paragraphs",
      fields: [
        defineField({ name: "nl", type: "array", of: [{ type: "block" }], title: "NL" }),
        defineField({ name: "en", type: "array", of: [{ type: "block" }], title: "EN" }),
      ],
    }),
    defineField({
      name: "sections",
      type: "array",
      title: "Sections",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "id", type: "string", title: "Anchor ID (stable, no spaces)" }),
            defineField({ name: "heading", type: "localeString", title: "Heading" }),
            defineField({
              name: "body",
              type: "object",
              fields: [
                defineField({ name: "nl", type: "array", of: [{ type: "block" }], title: "NL" }),
                defineField({ name: "en", type: "array", of: [{ type: "block" }], title: "EN" }),
              ],
            }),
          ],
          preview: { select: { title: "heading.nl" }, prepare: ({ title }) => ({ title }) },
        },
      ],
    }),
    defineField({
      name: "cta",
      type: "object",
      title: "CTA",
      fields: [
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "description", type: "localeText", title: "Description" }),
        defineField({ name: "label", type: "localeString", title: "Button label" }),
      ],
    }),
    defineField({ name: "updatedAt", type: "date", title: "Last updated" }),
    defineField({ name: "readingTimeMinutes", type: "number", title: "Reading time (minutes)" }),
    defineField({ name: "seo", type: "seo", title: "SEO" }),
  ],
  preview: {
    select: { title: "title.nl", slug: "slug.nl.current" },
    prepare: ({ title, slug }) => ({ title, subtitle: `/${slug}` }),
  },
});
```

---

### Task 4: Create `homePage` singleton schema

**Files:** Create `sanity/schemas/homePage.ts`

- [ ] Create the file:

```typescript
import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  type: "document",
  title: "Home page",
  fields: [
    defineField({
      name: "intro",
      type: "object",
      title: "Intro section",
      fields: [
        defineField({ name: "eyebrow", type: "localeString", title: "Eyebrow" }),
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "description", type: "localeText", title: "Description" }),
        defineField({ name: "ctaLabel", type: "localeString", title: "CTA label" }),
      ],
    }),
    defineField({
      name: "inlineCta",
      type: "object",
      title: "Inline CTA",
      fields: [
        defineField({ name: "text", type: "localeString", title: "Text" }),
        defineField({ name: "ctaLabel", type: "localeString", title: "CTA label" }),
      ],
    }),
    defineField({
      name: "tagline",
      type: "object",
      title: "Tagline",
      fields: [
        defineField({ name: "title", type: "localeString", title: "Title" }),
      ],
    }),
    defineField({
      name: "pillars",
      type: "object",
      title: "Pillars section",
      fields: [
        defineField({ name: "eyebrow", type: "localeString", title: "Eyebrow" }),
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({
          name: "items",
          type: "array",
          title: "Pillars",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "icon", type: "string", title: "Icon name" }),
              defineField({ name: "title", type: "localeString", title: "Title" }),
              defineField({ name: "description", type: "localeText", title: "Description" }),
            ],
            preview: { select: { title: "title.nl" }, prepare: ({ title }) => ({ title }) },
          }],
        }),
      ],
    }),
    defineField({
      name: "differentiator",
      type: "object",
      title: "Differentiator section",
      fields: [
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "description", type: "localeText", title: "Description" }),
        defineField({
          name: "features",
          type: "array",
          title: "Features",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "title", type: "localeString", title: "Title" }),
              defineField({ name: "description", type: "localeText", title: "Description" }),
            ],
          }],
        }),
        defineField({ name: "quote", type: "localeText", title: "Quote" }),
        defineField({ name: "quoteDescription", type: "localeString", title: "Quote description" }),
        defineField({ name: "author", type: "string", title: "Author name" }),
        defineField({ name: "authorRole", type: "localeString", title: "Author role" }),
      ],
    }),
    defineField({
      name: "faqSection",
      type: "object",
      title: "FAQ section labels",
      fields: [
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "description", type: "localeText", title: "Description" }),
        defineField({ name: "ctaLabel", type: "localeString", title: "CTA label" }),
      ],
    }),
    defineField({
      name: "contactSection",
      type: "object",
      title: "Contact section labels",
      fields: [
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "description", type: "localeText", title: "Description" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
```

---

### Task 5: Create `aboutPage` singleton schema

**Files:** Create `sanity/schemas/aboutPage.ts`

- [ ] Create the file:

```typescript
import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  type: "document",
  title: "About page",
  fields: [
    defineField({
      name: "hero",
      type: "object",
      title: "Hero",
      fields: [
        defineField({ name: "eyebrow", type: "localeString", title: "Eyebrow" }),
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "lead", type: "localeText", title: "Lead" }),
      ],
    }),
    defineField({
      name: "story",
      type: "object",
      title: "Story section",
      fields: [
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({
          name: "paragraphs",
          type: "object",
          fields: [
            defineField({ name: "nl", type: "array", of: [{ type: "block" }], title: "NL" }),
            defineField({ name: "en", type: "array", of: [{ type: "block" }], title: "EN" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "values",
      type: "object",
      title: "Values section",
      fields: [
        defineField({ name: "eyebrow", type: "localeString", title: "Eyebrow" }),
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "description", type: "localeText", title: "Description" }),
        defineField({
          name: "items",
          type: "array",
          title: "Values",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "icon", type: "string", title: "Icon name" }),
              defineField({ name: "title", type: "localeString", title: "Title" }),
              defineField({ name: "description", type: "localeText", title: "Description" }),
            ],
            preview: { select: { title: "title.nl" }, prepare: ({ title }) => ({ title }) },
          }],
        }),
      ],
    }),
    defineField({
      name: "cta",
      type: "object",
      title: "CTA",
      fields: [
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "description", type: "localeText", title: "Description" }),
        defineField({ name: "primaryLabel", type: "localeString", title: "Primary button label" }),
        defineField({ name: "secondaryLabel", type: "localeString", title: "Secondary button label" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
```

---

### Task 6: Create `brandingPage` singleton schema

**Files:** Create `sanity/schemas/brandingPage.ts`

- [ ] Create the file:

```typescript
import { defineField, defineType } from "sanity";

export const brandingPage = defineType({
  name: "brandingPage",
  type: "document",
  title: "Branding page",
  fields: [
    defineField({
      name: "hero",
      type: "object",
      title: "Hero",
      fields: [
        defineField({ name: "eyebrow", type: "localeString", title: "Eyebrow" }),
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "lead", type: "localeText", title: "Lead" }),
      ],
    }),
    defineField({
      name: "intro",
      type: "object",
      title: "Intro",
      fields: [
        defineField({ name: "eyebrow", type: "localeString", title: "Eyebrow" }),
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "description", type: "localeText", title: "Description" }),
      ],
    }),
    defineField({
      name: "process",
      type: "object",
      title: "Process section",
      fields: [
        defineField({ name: "eyebrow", type: "localeString", title: "Eyebrow" }),
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "description", type: "localeText", title: "Description" }),
        defineField({
          name: "steps",
          type: "array",
          title: "Steps",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "title", type: "localeString", title: "Title" }),
              defineField({ name: "description", type: "localeText", title: "Description" }),
            ],
            preview: { select: { title: "title.nl" }, prepare: ({ title }) => ({ title }) },
          }],
        }),
      ],
    }),
    defineField({
      name: "cta",
      type: "object",
      title: "CTA",
      fields: [
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "description", type: "localeText", title: "Description" }),
        defineField({ name: "primaryLabel", type: "localeString", title: "Primary button label" }),
        defineField({ name: "secondaryLabel", type: "localeString", title: "Secondary button label" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Branding page" }) },
});
```

---

### Task 7: Register all new schemas in `sanity/schemas/index.ts`

**Files:** Modify `sanity/schemas/index.ts`

- [ ] Open `sanity/schemas/index.ts`. Import and add all new schemas to the `schemaTypes` array. Follow the existing import pattern in the file. Add `faqItem`, `guide`, `homePage`, `aboutPage`, `brandingPage` to the imports and the exported array.

- [ ] Add the singleton types to the Sanity Studio structure. Open `sanity.config.ts` and add the singleton documents (homePage, aboutPage, brandingPage) to the desk structure so they appear as single-document items (not lists). If the studio uses a default structure, wrap them with `S.documentTypeListItem('homePage').title('Home page')` etc.

- [ ] Verify the Studio loads without errors: `pnpm dev` → visit `http://localhost:3000/studio`. The sidebar should show the five new types.

- [ ] Commit: `git add sanity/ && git commit -m "feat(sanity): add faqItem, guide, homePage, aboutPage, brandingPage schemas"`

---

## Phase 2 — GROQ Queries

### Task 8: Create FAQ items query

**Files:** Create `src/lib/sanity/queries/faqItems.ts`

- [ ] Create the file:

```typescript
import { defineQuery } from "next-sanity";

export const FAQ_ITEMS_QUERY = defineQuery(`
  *[_type == "faqItem"] | order(order asc) {
    _id,
    question,
    answer
  }
`);
```

---

### Task 9: Create guide queries

**Files:** Create `src/lib/sanity/queries/guide.ts`

- [ ] Create the file:

```typescript
import { defineQuery } from "next-sanity";

export const GUIDES_LIST_QUERY = defineQuery(`
  *[_type == "guide"] | order(title.nl asc) {
    _id,
    title,
    slug,
    lead,
    readingTimeMinutes
  }
`);

export const GUIDE_QUERY = defineQuery(`
  *[_type == "guide" && slug[$locale].current == $slug][0] {
    _id,
    title,
    slug,
    lead,
    intro,
    sections[] {
      id,
      heading,
      body
    },
    cta,
    updatedAt,
    readingTimeMinutes,
    seo
  }
`);
```

---

### Task 10: Create homePage / aboutPage / brandingPage queries

**Files:** Create `src/lib/sanity/queries/homePage.ts`, `aboutPage.ts`, `brandingPage.ts`

- [ ] `src/lib/sanity/queries/homePage.ts`:

```typescript
import { defineQuery } from "next-sanity";

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0] {
    intro,
    inlineCta,
    tagline,
    pillars,
    differentiator,
    faqSection,
    contactSection
  }
`);
```

- [ ] `src/lib/sanity/queries/aboutPage.ts`:

```typescript
import { defineQuery } from "next-sanity";

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0] {
    hero,
    story,
    values,
    cta
  }
`);
```

- [ ] `src/lib/sanity/queries/brandingPage.ts`:

```typescript
import { defineQuery } from "next-sanity";

export const BRANDING_PAGE_QUERY = defineQuery(`
  *[_type == "brandingPage"][0] {
    hero,
    intro,
    process,
    cta
  }
`);
```

---

### Task 11: Create testimonial query

**Files:** Create `src/lib/sanity/queries/testimonial.ts`

- [ ] Create the file:

```typescript
import { defineQuery } from "next-sanity";

export const TRUST_ROW_TESTIMONIAL_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(_createdAt asc) [0] {
    _id,
    quote,
    author,
    role,
    company
  }
`);
```

---

## Phase 3 — Fetcher Layer

Each fetcher tries Sanity first and falls back to the existing hardcoded export.

### Task 12: FAQ items fetcher

**Files:** Create `src/lib/content/faqItems.ts`

- [ ] Write a failing test first:

```typescript
// src/lib/content/faqItems.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getFaqItems } from "./faqItems";
import { sanityClient } from "@/lib/sanity/client";

vi.mock("@/lib/sanity/client", () => ({ sanityClient: { fetch: vi.fn() } }));

describe("getFaqItems", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns hardcoded items when Sanity returns empty array", async () => {
    vi.mocked(sanityClient.fetch).mockResolvedValueOnce([]);
    const items = await getFaqItems("nl");
    expect(items.length).toBeGreaterThan(0);
    expect(items[0]).toHaveProperty("question");
    expect(items[0]).toHaveProperty("answer");
  });

  it("returns Sanity items when available", async () => {
    vi.mocked(sanityClient.fetch).mockResolvedValueOnce([
      { question: { nl: "Vraag?", en: "Question?" }, answer: { nl: "Antwoord", en: "Answer" } },
    ]);
    const items = await getFaqItems("nl");
    expect(items).toHaveLength(1);
    expect(items[0].question).toBe("Vraag?");
  });
});
```

- [ ] Run test: `pnpm test src/lib/content/faqItems.test.ts` — expect FAIL (file not found).

- [ ] Create `src/lib/content/faqItems.ts`:

```typescript
import { sanityClient } from "@/lib/sanity/client";
import { FAQ_ITEMS_QUERY } from "@/lib/sanity/queries/faqItems";
import type { Locale } from "@/lib/i18n/routing";

export type FaqItem = { question: string; answer: string };

type RawFaqItem = {
  question: { nl: string; en: string };
  answer: { nl: string; en: string };
};

export async function getFaqItems(locale: Locale): Promise<FaqItem[]> {
  const raw = await sanityClient
    .fetch<RawFaqItem[]>(FAQ_ITEMS_QUERY, {}, { next: { tags: ["faqItem"] } })
    .catch(() => null);

  if (raw && raw.length > 0) {
    return raw.map((item) => ({
      question: item.question?.[locale] ?? item.question?.nl ?? "",
      answer: item.answer?.[locale] ?? item.answer?.nl ?? "",
    }));
  }

  // Fallback
  const { getHomeContent } = await import("@/content/home");
  return getHomeContent(locale).faq.items;
}
```

- [ ] Run test: `pnpm test src/lib/content/faqItems.test.ts` — expect PASS.

---

### Task 13: Guide fetcher

**Files:** Create `src/lib/content/guide.ts`

- [ ] Create the fetcher (no separate test file needed — guide data shape is complex, integration-test via the guide page):

```typescript
import { sanityClient } from "@/lib/sanity/client";
import { GUIDES_LIST_QUERY, GUIDE_QUERY } from "@/lib/sanity/queries/guide";
import type { GuideContent, GuideSection } from "@/content/guides/coffee-catering";
import type { Locale } from "@/lib/i18n/routing";

type RawBlock = { _type: string; children?: { text: string }[] };

function blocksToStrings(blocks: RawBlock[] | null | undefined): string[] {
  if (!blocks) return [];
  return blocks
    .filter((b) => b._type === "block")
    .map((b) => b.children?.map((c) => c.text).join("") ?? "")
    .filter(Boolean);
}

type RawGuide = {
  title: { nl: string; en: string };
  slug: { nl: { current: string }; en: { current: string } };
  lead: { nl: string; en: string };
  intro?: { nl?: RawBlock[]; en?: RawBlock[] };
  sections?: {
    id: string;
    heading: { nl: string; en: string };
    body?: { nl?: RawBlock[]; en?: RawBlock[] };
  }[];
  cta?: { title: { nl: string; en: string }; description: { nl: string; en: string }; label: { nl: string; en: string } };
  updatedAt?: string;
  readingTimeMinutes?: number;
};

export type GuideListItem = {
  slug: string;
  title: string;
  lead: string;
  readingTimeMinutes: number;
};

export async function getGuideList(locale: Locale): Promise<GuideListItem[]> {
  const raw = await sanityClient
    .fetch<RawGuide[]>(GUIDES_LIST_QUERY, {}, { next: { tags: ["guide"] } })
    .catch(() => null);

  if (raw && raw.length > 0) {
    return raw.map((g) => ({
      slug: g.slug?.[locale]?.current ?? g.slug?.nl?.current ?? "",
      title: g.title?.[locale] ?? g.title?.nl ?? "",
      lead: g.lead?.[locale] ?? g.lead?.nl ?? "",
      readingTimeMinutes: g.readingTimeMinutes ?? 0,
    }));
  }

  // Fallback: return both guides from hardcoded
  const { getCoffeeCateringGuide } = await import("@/content/guides/coffee-catering");
  const { getBaristaBarSpecsGuide } = await import("@/content/guides/barista-bar-specs");
  return [
    { slug: "koffiecatering", ...pick(getCoffeeCateringGuide(locale)) },
    { slug: "barista-bar-specs", ...pick(getBaristaBarSpecsGuide(locale)) },
  ];
}

function pick(g: GuideContent): Omit<GuideListItem, "slug"> {
  return { title: g.title, lead: g.lead, readingTimeMinutes: g.readingTimeMinutes };
}

export async function getGuide(locale: Locale, slug: string): Promise<GuideContent | null> {
  const raw = await sanityClient
    .fetch<RawGuide | null>(GUIDE_QUERY, { locale, slug }, { next: { tags: [`guide:${slug}`] } })
    .catch(() => null);

  if (raw) {
    const sections: GuideSection[] = (raw.sections ?? []).map((s) => ({
      id: s.id,
      heading: s.heading?.[locale] ?? s.heading?.nl ?? "",
      body: blocksToStrings(s.body?.[locale] ?? s.body?.nl),
    }));
    return {
      title: raw.title?.[locale] ?? raw.title?.nl ?? "",
      lead: raw.lead?.[locale] ?? raw.lead?.nl ?? "",
      intro: blocksToStrings(raw.intro?.[locale] ?? raw.intro?.nl),
      sections,
      cta: {
        title: raw.cta?.title?.[locale] ?? raw.cta?.title?.nl ?? "",
        description: raw.cta?.description?.[locale] ?? raw.cta?.description?.nl ?? "",
        label: raw.cta?.label?.[locale] ?? raw.cta?.label?.nl ?? "",
      },
      updated: raw.updatedAt ?? "",
      readingTimeMinutes: raw.readingTimeMinutes ?? 0,
    };
  }

  // Fallback
  if (slug === "koffiecatering") {
    const { getCoffeeCateringGuide } = await import("@/content/guides/coffee-catering");
    return getCoffeeCateringGuide(locale);
  }
  if (slug === "barista-bar-specs") {
    const { getBaristaBarSpecsGuide } = await import("@/content/guides/barista-bar-specs");
    return getBaristaBarSpecsGuide(locale);
  }
  return null;
}
```

---

### Task 14: homePage fetcher

**Files:** Create `src/lib/content/homePage.ts`

- [ ] Create the fetcher. The return type mirrors the relevant sections of `HomeContent` from `src/content/home.ts`:

```typescript
import { sanityClient } from "@/lib/sanity/client";
import { HOME_PAGE_QUERY } from "@/lib/sanity/queries/homePage";
import type { HomeContent } from "@/content/home";
import type { Locale } from "@/lib/i18n/routing";

type HomePageSanityData = Pick<
  HomeContent,
  "intro" | "inlineCta" | "tagline" | "pillars" | "differentiator" | "faq" | "contact"
>;

function ls(obj: { nl: string; en: string } | null | undefined, locale: Locale): string {
  if (!obj) return "";
  return obj[locale] ?? obj.nl ?? "";
}

export async function getHomePageContent(locale: Locale): Promise<HomePageSanityData | null> {
  const raw = await sanityClient
    .fetch<Record<string, unknown> | null>(HOME_PAGE_QUERY, {}, { next: { tags: ["homePage"] } })
    .catch(() => null);

  if (raw) {
    // Map Sanity localeString/localeText fields to the locale string
    const map = (obj: { nl: string; en: string } | null | undefined) => ls(obj, locale);
    return {
      intro: {
        eyebrow: map((raw.intro as any)?.eyebrow),
        title: map((raw.intro as any)?.title),
        description: map((raw.intro as any)?.description),
        ctaLabel: map((raw.intro as any)?.ctaLabel),
        ctaHref: "/over-ons", // structural, stays hardcoded
        image: "/images/about/barista-portrait.png", // static asset
      },
      inlineCta: {
        text: map((raw.inlineCta as any)?.text),
        ctaLabel: map((raw.inlineCta as any)?.ctaLabel),
        ctaHref: "/offerte", // structural
      },
      tagline: {
        title: map((raw.tagline as any)?.title),
        image: "/images/hero/tagline-bg.jpg", // static asset
      },
      pillars: {
        eyebrow: map((raw.pillars as any)?.eyebrow),
        title: map((raw.pillars as any)?.title),
        subtitle: map((raw.pillars as any)?.subtitle),
        items: ((raw.pillars as any)?.items ?? []).map((item: any) => ({
          icon: item.icon ?? "",
          title: map(item.title),
          description: map(item.description),
        })),
      },
      differentiator: {
        title: map((raw.differentiator as any)?.title),
        description: map((raw.differentiator as any)?.description),
        features: ((raw.differentiator as any)?.features ?? []).map((f: any) => ({
          title: map(f.title),
          description: map(f.description),
        })),
        image: "/images/differentiator/bg.jpg", // static
        quote: map((raw.differentiator as any)?.quote),
        quoteDescription: map((raw.differentiator as any)?.quoteDescription),
        author: (raw.differentiator as any)?.author ?? "",
        authorRole: map((raw.differentiator as any)?.authorRole),
        portrait: "/images/differentiator/portrait.jpg", // static
      },
      faq: {
        title: map((raw.faqSection as any)?.title),
        description: map((raw.faqSection as any)?.description),
        ctaLabel: map((raw.faqSection as any)?.ctaLabel),
        items: [], // injected separately from getFaqItems()
      },
      contact: {
        title: map((raw.contactSection as any)?.title),
        description: map((raw.contactSection as any)?.description),
        // structural fields stay hardcoded — these match settings singleton
        labels: {} as any, // consumed components read these from hardcoded content
        office: "", email: "", phone: "", socials: [], form: {} as any,
      },
    };
  }

  return null;
}
```

> **Note:** The home page update in Phase 5 will blend `getHomePageContent` for text sections with the existing hardcoded `getHomeContent` for structural fields (contact form labels, socials). This is the safest approach — we migrate what changes; structural/route-tied data stays hardcoded.

---

### Task 15: aboutPage and brandingPage fetchers

**Files:** Create `src/lib/content/aboutPage.ts`, `src/lib/content/brandingPage.ts`

- [ ] `src/lib/content/aboutPage.ts`:

```typescript
import { sanityClient } from "@/lib/sanity/client";
import { ABOUT_PAGE_QUERY } from "@/lib/sanity/queries/aboutPage";
import type { AboutContent } from "@/content/about";
import type { Locale } from "@/lib/i18n/routing";

type RawBlock = { _type: string; children?: { text: string }[] };
function blocksToStrings(blocks: RawBlock[] | null | undefined): string[] {
  if (!blocks) return [];
  return blocks
    .filter((b) => b._type === "block")
    .map((b) => b.children?.map((c) => c.text).join("") ?? "")
    .filter(Boolean);
}
function ls(obj: { nl: string; en: string } | null | undefined, locale: Locale): string {
  return obj?.[locale] ?? obj?.nl ?? "";
}

export async function getAboutPageContent(locale: Locale): Promise<AboutContent | null> {
  const raw = await sanityClient
    .fetch<Record<string, unknown> | null>(ABOUT_PAGE_QUERY, {}, { next: { tags: ["aboutPage"] } })
    .catch(() => null);

  if (raw) {
    const hero = raw.hero as any;
    const story = raw.story as any;
    const values = raw.values as any;
    const cta = raw.cta as any;
    return {
      hero: {
        eyebrow: ls(hero?.eyebrow, locale),
        title: ls(hero?.title, locale),
        lead: ls(hero?.lead, locale),
        image: "/images/about/team.png", // static asset
      },
      story: {
        title: ls(story?.title, locale),
        paragraphs: blocksToStrings(story?.paragraphs?.[locale] ?? story?.paragraphs?.nl),
        image: "/images/about/barista-portrait.png", // static asset
      },
      values: {
        eyebrow: ls(values?.eyebrow, locale),
        title: ls(values?.title, locale),
        description: ls(values?.description, locale),
        items: (values?.items ?? []).map((item: any) => ({
          icon: item.icon ?? "",
          title: ls(item.title, locale),
          description: ls(item.description, locale),
        })),
      },
      cta: {
        title: ls(cta?.title, locale),
        description: ls(cta?.description, locale),
        primaryLabel: ls(cta?.primaryLabel, locale),
        primaryHref: "/offerte",
        secondaryLabel: ls(cta?.secondaryLabel, locale),
        secondaryHref: "/cases",
      },
    };
  }

  // Fallback
  const { getAboutContent } = await import("@/content/about");
  return getAboutContent(locale);
}
```

- [ ] `src/lib/content/brandingPage.ts`:

```typescript
import { sanityClient } from "@/lib/sanity/client";
import { BRANDING_PAGE_QUERY } from "@/lib/sanity/queries/brandingPage";
import type { BrandingContent } from "@/content/branding";
import type { Locale } from "@/lib/i18n/routing";

function ls(obj: { nl: string; en: string } | null | undefined, locale: Locale): string {
  return obj?.[locale] ?? obj?.nl ?? "";
}

export async function getBrandingPageContent(locale: Locale): Promise<BrandingContent | null> {
  const raw = await sanityClient
    .fetch<Record<string, unknown> | null>(BRANDING_PAGE_QUERY, {}, { next: { tags: ["brandingPage"] } })
    .catch(() => null);

  if (raw) {
    const hero = raw.hero as any;
    const intro = raw.intro as any;
    const process = raw.process as any;
    const cta = raw.cta as any;
    return {
      hero: {
        eyebrow: ls(hero?.eyebrow, locale),
        title: ls(hero?.title, locale),
        lead: ls(hero?.lead, locale),
        image: "/images/branding/hero.jpg", // static asset
      },
      intro: {
        eyebrow: ls(intro?.eyebrow, locale),
        title: ls(intro?.title, locale),
        description: ls(intro?.description, locale),
      },
      options: { title: "", description: "", items: [] }, // options come from brandingOption docs — kept hardcoded for now
      process: {
        eyebrow: ls(process?.eyebrow, locale),
        title: ls(process?.title, locale),
        description: ls(process?.description, locale),
        steps: (process?.steps ?? []).map((s: any) => ({
          title: ls(s.title, locale),
          description: ls(s.description, locale),
        })),
      },
      cta: {
        title: ls(cta?.title, locale),
        description: ls(cta?.description, locale),
        primaryLabel: ls(cta?.primaryLabel, locale),
        primaryHref: "/offerte",
        secondaryLabel: ls(cta?.secondaryLabel, locale),
        secondaryHref: "/contact",
      },
    };
  }

  // Fallback
  const { getBrandingContent } = await import("@/content/branding");
  return getBrandingContent(locale);
}
```

---

### Task 16: Cases fetcher

**Files:** Create `src/lib/content/cases.ts`

- [ ] Create the fetcher (the existing `CASES_LIST_QUERY` is in `src/lib/sanity/queries/case.ts`):

```typescript
import { sanityClient } from "@/lib/sanity/client";
import { CASES_LIST_QUERY } from "@/lib/sanity/queries/case";
import type { CaseItem } from "@/content/cases";
import type { Locale } from "@/lib/i18n/routing";

type RawCase = {
  _id: string;
  category: "events" | "in-company";
  title: { nl: string; en: string };
  slug: { nl: { current: string }; en: { current: string } };
  client: string;
  location: string;
  guestCount: number;
  hero: { url: string; alt: { nl: string; en: string } };
};

export async function getCasesList(locale: Locale): Promise<CaseItem[]> {
  const raw = await sanityClient
    .fetch<RawCase[]>(CASES_LIST_QUERY, { category: null }, { next: { tags: ["case"] } })
    .catch(() => null);

  if (raw && raw.length > 0) {
    return raw.map((c) => ({
      slug: c.slug?.[locale]?.current ?? c.slug?.nl?.current ?? "",
      category: c.category,
      title: c.title?.[locale] ?? c.title?.nl ?? "",
      client: c.client ?? "",
      location: c.location ?? "",
      guests: String(c.guestCount ?? ""),
      excerpt: "", // not in list query — detail pages use full case query
      image: c.hero?.url ?? "",
    }));
  }

  // Fallback
  const { getCasesContent } = await import("@/content/cases");
  return getCasesContent(locale).items;
}
```

---

### Task 17: Concepts fetcher

**Files:** Create `src/lib/content/concepts.ts`

- [ ] Create the fetcher (the existing `CONCEPTS_LIST_QUERY` is in `src/lib/sanity/queries/concept.ts`):

```typescript
import { sanityClient } from "@/lib/sanity/client";
import { CONCEPTS_LIST_QUERY } from "@/lib/sanity/queries/concept";
import type { ConceptCard } from "@/content/home";
import type { Locale } from "@/lib/i18n/routing";

type RawConcept = {
  _id: string;
  category: "events" | "in-company";
  title: { nl: string; en: string };
  slug: { nl: { current: string }; en: { current: string } };
  shortDescription: { nl: string; en: string };
  hero: { url: string; alt: { nl: string; en: string } };
};

export async function getConcepts(
  locale: Locale,
  category: "events" | "in-company"
): Promise<ConceptCard[]> {
  const raw = await sanityClient
    .fetch<RawConcept[]>(
      CONCEPTS_LIST_QUERY,
      { category },
      { next: { tags: ["concept"] } }
    )
    .catch(() => null);

  if (raw && raw.length > 0) {
    return raw.map((c) => ({
      slug: c.slug?.[locale]?.current ?? c.slug?.nl?.current ?? "",
      title: c.title?.[locale] ?? c.title?.nl ?? "",
      description: c.shortDescription?.[locale] ?? c.shortDescription?.nl ?? "",
      image: c.hero?.url ?? "",
    }));
  }

  // Fallback
  const { getHomeContent } = await import("@/content/home");
  const home = getHomeContent(locale);
  return category === "events" ? home.events.concepts : home.inCompany.concepts;
}
```

---

### Task 18: TrustRow testimonial fetcher

**Files:** Create `src/lib/content/trustRow.ts`

- [ ] Create the fetcher:

```typescript
import { sanityClient } from "@/lib/sanity/client";
import { TRUST_ROW_TESTIMONIAL_QUERY } from "@/lib/sanity/queries/testimonial";
import type { Locale } from "@/lib/i18n/routing";

export type Testimonial = { quote: string; author: string; role: string };

type RawTestimonial = {
  quote: { nl: string; en: string };
  author: string;
  role: { nl: string; en: string };
  company?: string;
};

export async function getTrustRowTestimonial(locale: Locale): Promise<Testimonial | null> {
  const raw = await sanityClient
    .fetch<RawTestimonial | null>(
      TRUST_ROW_TESTIMONIAL_QUERY,
      {},
      { next: { tags: ["testimonial"] } }
    )
    .catch(() => null);

  if (raw) {
    return {
      quote: raw.quote?.[locale] ?? raw.quote?.nl ?? "",
      author: raw.author ?? "",
      role: raw.role?.[locale] ?? raw.role?.nl ?? "",
    };
  }

  return null; // TrustRow keeps its existing messages fallback
}
```

---

### Task 19: Commit the fetcher layer

- [ ] `pnpm typecheck` — fix any errors.
- [ ] `git add src/lib/content/ src/lib/sanity/queries/ && git commit -m "feat(content): add Sanity fetcher layer with hardcoded fallback"`

---

## Phase 4 — Update Revalidation Webhook

### Task 20: Add new types to revalidate handler

**Files:** Modify `src/app/api/revalidate/route.ts`

- [ ] Open the file. Find the array of handled `_type` values. Add: `"faqItem"`, `"guide"`, `"homePage"`, `"aboutPage"`, `"brandingPage"`.

- [ ] Also update the Sanity webhook filter in the Sanity dashboard (Settings → API → Webhooks) to include the new types:
  ```
  _type in ["concept", "case", "post", "author", "category", "testimonial", "brandingOption", "pricingTier", "settings", "page", "faqItem", "guide", "homePage", "aboutPage", "brandingPage"]
  ```

- [ ] Commit: `git add src/app/api/revalidate/route.ts && git commit -m "feat(revalidate): handle new Sanity document types"`

---

## Phase 5 — Migration Script

### Task 21: Create migration script scaffold

**Files:** Create `scripts/migrate-sanity.ts`

- [ ] Verify `tsx` is available: `pnpm tsx --version` — should print a version.

- [ ] Create the script:

```typescript
import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "fs";
import path from "path";

if (!process.env.SANITY_WRITE_TOKEN) {
  throw new Error("SANITY_WRITE_TOKEN is required. Add it to .env.local.");
}

const client = createClient({
  projectId: "i3uf28e7",
  dataset: "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// Converts plain text strings to Sanity portable text blocks
function textToBlocks(strings: string[]) {
  return strings.map((text, i) => ({
    _type: "block",
    _key: `block_${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `span_${i}`, text, marks: [] }],
  }));
}

// Uploads a local /public image to Sanity CDN and returns asset reference
async function uploadImage(publicPath: string): Promise<{ _type: "reference"; _ref: string } | null> {
  const fullPath = path.join(process.cwd(), "public", publicPath);
  if (!existsSync(fullPath)) {
    console.warn(`Image not found: ${fullPath}`);
    return null;
  }
  const filename = path.basename(publicPath);
  const asset = await client.assets.upload("image", createReadStream(fullPath), { filename });
  return { _type: "reference", _ref: asset._id };
}

// Creates or replaces a Sanity document (idempotent by _id)
async function upsert(doc: Record<string, unknown>) {
  await client.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0]);
  console.log(`  ✓ ${doc._type} ${doc._id}`);
}

async function main() {
  console.log("Starting Sanity content migration…\n");
  await migrateFaqItems();
  await migrateTestimonials();
  await migrateCases();
  await migrateConcepts();
  await migrateGuides();
  await migrateHomePage();
  await migrateAboutPage();
  await migrateBrandingPage();
  console.log("\nMigration complete.");
}

main().catch((err) => { console.error(err); process.exit(1); });
```

---

### Task 22: Migrate FAQ items

- [ ] Add to `scripts/migrate-sanity.ts` after the `upsert` helper:

```typescript
async function migrateFaqItems() {
  console.log("Migrating FAQ items…");
  // Import hardcoded source
  const { getHomeContent } = await import("../src/content/home.js");
  const nlItems = getHomeContent("nl").faq.items;
  const enItems = getHomeContent("en").faq.items;

  for (let i = 0; i < nlItems.length; i++) {
    await upsert({
      _id: `faq-item-${i + 1}`,
      _type: "faqItem",
      question: { _type: "localeString", nl: nlItems[i].question, en: enItems[i]?.question ?? nlItems[i].question },
      answer: { _type: "localeText", nl: nlItems[i].answer, en: enItems[i]?.answer ?? nlItems[i].answer },
      order: i + 1,
    });
  }
}
```

---

### Task 23: Migrate testimonial for TrustRow

- [ ] Add to `scripts/migrate-sanity.ts`:

```typescript
async function migrateTestimonials() {
  console.log("Migrating testimonials…");
  // The TrustRow testimonial is in messages/nl.json trust.testimonial
  // Read directly since it's in messages
  const nlMessages = await import("../messages/nl.json", { assert: { type: "json" } });
  const enMessages = await import("../messages/en.json", { assert: { type: "json" } });

  await upsert({
    _id: "testimonial-trust-row",
    _type: "testimonial",
    quote: {
      _type: "localeText",
      nl: (nlMessages as any).trust.testimonial.quote,
      en: (enMessages as any).trust.testimonial.quote,
    },
    author: (nlMessages as any).trust.testimonial.author,
    role: {
      _type: "localeString",
      nl: (nlMessages as any).trust.testimonial.role,
      en: (enMessages as any).trust.testimonial.role,
    },
    company: "Adidas Benelux",
  });
}
```

---

### Task 24: Migrate cases

- [ ] Add to `scripts/migrate-sanity.ts`:

```typescript
async function migrateCases() {
  console.log("Migrating case studies…");
  const { getCasesContent } = await import("../src/content/cases.js");
  const nlCases = getCasesContent("nl").items;
  const enCases = getCasesContent("en").items;

  for (const nlCase of nlCases) {
    const enCase = enCases.find((c) => c.slug === nlCase.slug);
    const heroRef = await uploadImage(nlCase.image);

    await upsert({
      _id: `case-${nlCase.slug}`,
      _type: "case",
      category: nlCase.category,
      title: { _type: "localeString", nl: nlCase.title, en: enCase?.title ?? nlCase.title },
      slug: {
        _type: "object",
        nl: { _type: "slug", current: nlCase.slug },
        en: { _type: "slug", current: nlCase.slug },
      },
      client: nlCase.client,
      location: nlCase.location,
      guestCount: parseInt(nlCase.guests.replace(/\D/g, ""), 10) || 0,
      ...(heroRef ? { hero: { _type: "imageWithAlt", asset: heroRef, alt: { _type: "localeString", nl: nlCase.title, en: enCase?.title ?? nlCase.title } } } : {}),
      story: {
        _type: "object",
        nl: textToBlocks([nlCase.excerpt]),
        en: textToBlocks([enCase?.excerpt ?? nlCase.excerpt]),
      },
    });
  }
}
```

---

### Task 25: Migrate concepts (service cards)

- [ ] Add to `scripts/migrate-sanity.ts`:

```typescript
async function migrateConcepts() {
  console.log("Migrating concepts…");
  const { getHomeContent } = await import("../src/content/home.js");
  const nlHome = getHomeContent("nl");
  const enHome = getHomeContent("en");

  const allNl = [...nlHome.events.concepts, ...nlHome.inCompany.concepts];
  const allEn = [...enHome.events.concepts, ...enHome.inCompany.concepts];
  const isEvents = new Set(nlHome.events.concepts.map((c) => c.slug));

  for (const nlConcept of allNl) {
    const enConcept = allEn.find((c) => c.slug === nlConcept.slug);
    const heroRef = await uploadImage(nlConcept.image);

    await upsert({
      _id: `concept-${nlConcept.slug}`,
      _type: "concept",
      category: isEvents.has(nlConcept.slug) ? "events" : "in-company",
      title: { _type: "localeString", nl: nlConcept.title, en: enConcept?.title ?? nlConcept.title },
      slug: {
        _type: "object",
        nl: { _type: "slug", current: nlConcept.slug },
        en: { _type: "slug", current: nlConcept.slug },
      },
      shortDescription: { _type: "localeText", nl: nlConcept.description, en: enConcept?.description ?? nlConcept.description },
      ...(heroRef ? { hero: { _type: "imageWithAlt", asset: heroRef, alt: { _type: "localeString", nl: nlConcept.title, en: enConcept?.title ?? nlConcept.title } } } : {}),
    });
  }
}
```

---

### Task 26: Migrate guides

- [ ] Add to `scripts/migrate-sanity.ts`:

```typescript
async function migrateGuides() {
  console.log("Migrating guides…");
  const { getCoffeeCateringGuide } = await import("../src/content/guides/coffee-catering.js");
  const { getBaristaBarSpecsGuide } = await import("../src/content/guides/barista-bar-specs.js");

  const guides = [
    { slug: "koffiecatering", nl: getCoffeeCateringGuide("nl"), en: getCoffeeCateringGuide("en") },
    { slug: "barista-bar-specs", nl: getBaristaBarSpecsGuide("nl"), en: getBaristaBarSpecsGuide("en") },
  ];

  for (const { slug, nl, en } of guides) {
    await upsert({
      _id: `guide-${slug}`,
      _type: "guide",
      title: { _type: "localeString", nl: nl.title, en: en.title },
      slug: {
        _type: "object",
        nl: { _type: "slug", current: slug },
        en: { _type: "slug", current: slug },
      },
      lead: { _type: "localeText", nl: nl.lead, en: en.lead },
      intro: {
        _type: "object",
        nl: textToBlocks(nl.intro),
        en: textToBlocks(en.intro),
      },
      sections: nl.sections.map((s, i) => ({
        _type: "object",
        _key: `section_${i}`,
        id: s.id,
        heading: { _type: "localeString", nl: s.heading, en: en.sections[i]?.heading ?? s.heading },
        body: {
          _type: "object",
          nl: textToBlocks(s.body),
          en: textToBlocks(en.sections[i]?.body ?? s.body),
        },
      })),
      cta: {
        _type: "object",
        title: { _type: "localeString", nl: nl.cta.title, en: en.cta.title },
        description: { _type: "localeText", nl: nl.cta.description, en: en.cta.description },
        label: { _type: "localeString", nl: nl.cta.label, en: en.cta.label },
      },
      updatedAt: nl.updated,
      readingTimeMinutes: nl.readingTimeMinutes,
    });
  }
}
```

---

### Task 27: Migrate homePage, aboutPage, brandingPage singletons

- [ ] Add to `scripts/migrate-sanity.ts`:

```typescript
async function migrateHomePage() {
  console.log("Migrating home page singleton…");
  const { getHomeContent } = await import("../src/content/home.js");
  const nl = getHomeContent("nl");
  const en = getHomeContent("en");

  await upsert({
    _id: "singleton-homePage",
    _type: "homePage",
    intro: {
      eyebrow: { _type: "localeString", nl: nl.intro.eyebrow, en: en.intro.eyebrow },
      title: { _type: "localeString", nl: nl.intro.title, en: en.intro.title },
      description: { _type: "localeText", nl: nl.intro.description, en: en.intro.description },
      ctaLabel: { _type: "localeString", nl: nl.intro.ctaLabel, en: en.intro.ctaLabel },
    },
    inlineCta: {
      text: { _type: "localeString", nl: nl.inlineCta.text, en: en.inlineCta.text },
      ctaLabel: { _type: "localeString", nl: nl.inlineCta.ctaLabel, en: en.inlineCta.ctaLabel },
    },
    tagline: {
      title: { _type: "localeString", nl: nl.tagline.title, en: en.tagline.title },
    },
    pillars: {
      eyebrow: { _type: "localeString", nl: nl.pillars.eyebrow ?? "", en: en.pillars.eyebrow ?? "" },
      title: { _type: "localeString", nl: nl.pillars.title, en: en.pillars.title },
      items: nl.pillars.items.map((item, i) => ({
        _type: "object",
        _key: `pillar_${i}`,
        icon: item.icon,
        title: { _type: "localeString", nl: item.title, en: en.pillars.items[i]?.title ?? item.title },
        description: { _type: "localeText", nl: item.description, en: en.pillars.items[i]?.description ?? item.description },
      })),
    },
    differentiator: {
      title: { _type: "localeString", nl: nl.differentiator.title, en: en.differentiator.title },
      description: { _type: "localeText", nl: nl.differentiator.description, en: en.differentiator.description },
      features: nl.differentiator.features.map((f, i) => ({
        _type: "object",
        _key: `feature_${i}`,
        title: { _type: "localeString", nl: f.title, en: en.differentiator.features[i]?.title ?? f.title },
        description: { _type: "localeText", nl: f.description, en: en.differentiator.features[i]?.description ?? f.description },
      })),
      quote: { _type: "localeText", nl: nl.differentiator.quote, en: en.differentiator.quote },
      quoteDescription: { _type: "localeString", nl: nl.differentiator.quoteDescription ?? "", en: en.differentiator.quoteDescription ?? "" },
      author: nl.differentiator.author,
      authorRole: { _type: "localeString", nl: nl.differentiator.authorRole, en: en.differentiator.authorRole },
    },
    faqSection: {
      title: { _type: "localeString", nl: nl.faq.title, en: en.faq.title },
      description: { _type: "localeText", nl: nl.faq.description, en: en.faq.description },
      ctaLabel: { _type: "localeString", nl: nl.faq.ctaLabel, en: en.faq.ctaLabel },
    },
    contactSection: {
      title: { _type: "localeString", nl: nl.contact.title, en: en.contact.title },
      description: { _type: "localeText", nl: nl.contact.description, en: en.contact.description },
    },
  });
}

async function migrateAboutPage() {
  console.log("Migrating about page singleton…");
  const { getAboutContent } = await import("../src/content/about.js");
  const nl = getAboutContent("nl");
  const en = getAboutContent("en");

  await upsert({
    _id: "singleton-aboutPage",
    _type: "aboutPage",
    hero: {
      eyebrow: { _type: "localeString", nl: nl.hero.eyebrow, en: en.hero.eyebrow },
      title: { _type: "localeString", nl: nl.hero.title, en: en.hero.title },
      lead: { _type: "localeText", nl: nl.hero.lead, en: en.hero.lead },
    },
    story: {
      title: { _type: "localeString", nl: nl.story.title, en: en.story.title },
      paragraphs: {
        nl: textToBlocks(nl.story.paragraphs),
        en: textToBlocks(en.story.paragraphs),
      },
    },
    values: {
      eyebrow: { _type: "localeString", nl: nl.values.eyebrow, en: en.values.eyebrow },
      title: { _type: "localeString", nl: nl.values.title, en: en.values.title },
      description: { _type: "localeText", nl: nl.values.description, en: en.values.description },
      items: nl.values.items.map((item, i) => ({
        _type: "object",
        _key: `value_${i}`,
        icon: item.icon,
        title: { _type: "localeString", nl: item.title, en: en.values.items[i]?.title ?? item.title },
        description: { _type: "localeText", nl: item.description, en: en.values.items[i]?.description ?? item.description },
      })),
    },
    cta: {
      title: { _type: "localeString", nl: nl.cta.title, en: en.cta.title },
      description: { _type: "localeText", nl: nl.cta.description, en: en.cta.description },
      primaryLabel: { _type: "localeString", nl: nl.cta.primaryLabel, en: en.cta.primaryLabel },
      secondaryLabel: { _type: "localeString", nl: nl.cta.secondaryLabel, en: en.cta.secondaryLabel },
    },
  });
}

async function migrateBrandingPage() {
  console.log("Migrating branding page singleton…");
  const { getBrandingContent } = await import("../src/content/branding.js");
  const nl = getBrandingContent("nl");
  const en = getBrandingContent("en");

  await upsert({
    _id: "singleton-brandingPage",
    _type: "brandingPage",
    hero: {
      eyebrow: { _type: "localeString", nl: nl.hero.eyebrow, en: en.hero.eyebrow },
      title: { _type: "localeString", nl: nl.hero.title, en: en.hero.title },
      lead: { _type: "localeText", nl: nl.hero.lead, en: en.hero.lead },
    },
    intro: {
      eyebrow: { _type: "localeString", nl: nl.intro.eyebrow, en: en.intro.eyebrow },
      title: { _type: "localeString", nl: nl.intro.title, en: en.intro.title },
      description: { _type: "localeText", nl: nl.intro.description, en: en.intro.description },
    },
    process: {
      eyebrow: { _type: "localeString", nl: nl.process.eyebrow, en: en.process.eyebrow },
      title: { _type: "localeString", nl: nl.process.title, en: en.process.title },
      description: { _type: "localeText", nl: nl.process.description, en: en.process.description },
      steps: nl.process.steps.map((s, i) => ({
        _type: "object",
        _key: `step_${i}`,
        title: { _type: "localeString", nl: s.title, en: en.process.steps[i]?.title ?? s.title },
        description: { _type: "localeText", nl: s.description, en: en.process.steps[i]?.description ?? s.description },
      })),
    },
    cta: {
      title: { _type: "localeString", nl: nl.cta.title, en: en.cta.title },
      description: { _type: "localeText", nl: nl.cta.description, en: en.cta.description },
      primaryLabel: { _type: "localeString", nl: nl.cta.primaryLabel, en: en.cta.primaryLabel },
      secondaryLabel: { _type: "localeString", nl: nl.cta.secondaryLabel, en: en.cta.secondaryLabel },
    },
  });
}
```

---

### Task 28: Run migration script

- [ ] Ensure `SANITY_WRITE_TOKEN` is in `.env.local`.

- [ ] Run:
  ```bash
  pnpm dotenv -e .env.local -- tsx scripts/migrate-sanity.ts
  ```
  If `dotenv` CLI isn't available: `env $(cat .env.local | grep -v '^#' | xargs) tsx scripts/migrate-sanity.ts`

- [ ] Expected output: all types printed with ✓. No errors.

- [ ] Open `http://localhost:3000/studio` → verify:
  - FAQ items: 15 documents visible
  - Testimonials: 1 document
  - Cases: 6 documents
  - Concepts: 7 documents
  - Guides: 2 documents
  - Home/About/Branding page singletons: 1 each

- [ ] Commit: `git add scripts/ && git commit -m "chore: add Sanity migration script"`

---

## Phase 6 — Update Consuming Pages

### Task 29: Update home page (`src/app/(site)/[locale]/page.tsx`)

- [ ] Replace the `getHomeContent` import with the new fetchers. The home page blends multiple data sources:

```typescript
// Replace:
import { getHomeContent } from "@/content/home";

// With:
import { getHomeContent } from "@/content/home"; // still needed for logos, footer columns, contact form
import { getHomePageContent } from "@/lib/content/homePage";
import { getFaqItems } from "@/lib/content/faqItems";
import { getConcepts } from "@/lib/content/concepts";
```

- [ ] In the page component body, change from synchronous to async data fetching:

```typescript
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const hardcoded = getHomeContent(locale); // logos, footer, contact form labels
  const tCommon = await getTranslations("common");
  const readMoreLabel = tCommon("readMore");

  const [homeContent, faqItems, eventConcepts, inCompanyConcepts] = await Promise.all([
    getHomePageContent(locale),
    getFaqItems(locale),
    getConcepts(locale, "events"),
    getConcepts(locale, "in-company"),
  ]);

  // Merge: prefer Sanity, fall back to hardcoded per-section
  const intro = homeContent?.intro ?? hardcoded.intro;
  const inlineCta = homeContent?.inlineCta ?? hardcoded.inlineCta;
  const tagline = homeContent?.tagline ?? hardcoded.tagline;
  const pillars = homeContent?.pillars ?? hardcoded.pillars;
  const differentiator = homeContent?.differentiator ?? hardcoded.differentiator;
  const faqData = {
    ...(homeContent?.faq ?? hardcoded.faq),
    items: faqItems,
  };
  const events = {
    ...hardcoded.events,
    concepts: eventConcepts.length > 0 ? eventConcepts : hardcoded.events.concepts,
  };
  const inCompany = {
    ...hardcoded.inCompany,
    concepts: inCompanyConcepts.length > 0 ? inCompanyConcepts : hardcoded.inCompany.concepts,
  };
```

- [ ] Update the JSX to use the merged variables instead of `content.*`.

---

### Task 30: Update about page (`src/app/(site)/[locale]/over-ons/page.tsx`)

- [ ] Replace import and add await:

```typescript
// Replace:
import { getAboutContent } from "@/content/about";
// ...
const content = getAboutContent(locale);

// With:
import { getAboutPageContent } from "@/lib/content/aboutPage";
import { getAboutContent } from "@/content/about";
// ...
const content = (await getAboutPageContent(locale)) ?? getAboutContent(locale);
```

- [ ] The rest of the JSX does not change — the same field names are used.

---

### Task 31: Update branding page (`src/app/(site)/[locale]/branding/page.tsx`)

- [ ] Same pattern as about page:

```typescript
import { getBrandingPageContent } from "@/lib/content/brandingPage";
import { getBrandingContent } from "@/content/branding";
// ...
const content = (await getBrandingPageContent(locale)) ?? getBrandingContent(locale);
```

---

### Task 32: Update cases page (`src/app/(site)/[locale]/cases/page.tsx`)

- [ ] The cases page currently reads `getCasesContent(locale)` for `hero`, `filters`, `items`, and `cta`. Only `items` comes from Sanity; the rest (hero image, filter labels, CTA) stay hardcoded.

```typescript
import { getCasesList } from "@/lib/content/cases";
import { getCasesContent } from "@/content/cases";
// ...
const hardcoded = getCasesContent(locale);
const items = await getCasesList(locale);
// Use hardcoded for hero/filters/cta, Sanity items for the grid
```

- [ ] Update `<CasesGrid items={items} ...>` to use the fetched items.

---

### Task 33: Update concept detail pages

**Files:** `src/app/(site)/[locale]/diensten/events/[slug]/page.tsx` and `...in-company/[slug]/page.tsx`

- [ ] Read each file. They currently find a concept by slug in the hardcoded array. Replace with the existing Sanity `CONCEPT_QUERY` (already in `src/lib/sanity/queries/concept.ts`):

```typescript
// Replace the hardcoded lookup:
// const concept = getHomeContent(locale).events.concepts.find(c => c.slug === slug);

// With:
const concept = await sanityClient.fetch(
  CONCEPT_QUERY,
  { locale, slug },
  { next: { tags: [`concept:${slug}`] } }
);
if (!concept) notFound();
```

Follow the existing `CONCEPT_QUERY` return shape from `src/lib/sanity/queries/concept.ts`.

---

### Task 34: Update guide pages

**Files:** `src/app/(site)/[locale]/gids/page.tsx`, `gids/koffiecatering/page.tsx`, `gids/barista-bar-specs/page.tsx`

- [ ] Guides index page (`gids/page.tsx`): replace the two `getCoffeeCateringGuide`/`getBaristaBarSpecsGuide` calls with `getGuideList`:

```typescript
import { getGuideList } from "@/lib/content/guide";
// ...
const guides = await getGuideList(locale);
// guides is GuideListItem[] — map to the card JSX
```

- [ ] Individual guide pages: replace `getCoffeeCateringGuide(locale)` / `getBaristaBarSpecsGuide(locale)` with `getGuide(locale, "koffiecatering")` / `getGuide(locale, "barista-bar-specs")`. Add `notFound()` guard if null.

---

### Task 35: Update TrustRow component

**Files:** `src/components/blocks/TrustRow.tsx`

- [ ] TrustRow currently reads from `getTranslations("trust")`. Add an optional `testimonial` prop that, if provided, overrides the messages value:

```typescript
// TrustRow.tsx: make it a server component that fetches its own data
import { getTrustRowTestimonial } from "@/lib/content/trustRow";

// Inside the component:
const sanityTestimonial = await getTrustRowTestimonial(locale);
// Use sanityTestimonial if available, otherwise keep the t("testimonial.*") fallback
```

Since TrustRow is already a server component, it can call the fetcher directly. Pass `locale` as a prop from the home page (it already comes from the parent).

---

### Task 36: Typecheck and i18n check

- [ ] `pnpm typecheck` — fix all errors.
- [ ] `pnpm i18n:check` — expect OK.
- [ ] `pnpm dev` → open `http://localhost:3000/nl` and `http://localhost:3000/en`. Verify all sections render correctly using Sanity data (not hardcoded fallback).
- [ ] Commit: `git add src/ && git commit -m "feat: wire Sanity fetchers into all consuming pages"`

---

## Phase 7 — Cleanup

### Task 37: Remove hardcoded content files

After verifying all pages render from Sanity data in both locales:

- [ ] Delete `src/content/about.ts`
- [ ] Delete `src/content/branding.ts`
- [ ] Delete `src/content/cases.ts`
- [ ] Delete `src/content/guides/coffee-catering.ts`
- [ ] Delete `src/content/guides/barista-bar-specs.ts`
- [ ] In `src/content/home.ts`: remove all exported content except `footer` (columns + colophon) and the shared logos array. Delete the NL/EN content constants for all sections except `footer`. Update `HomeContent` type to only include `footer` and `logos`.
- [ ] Remove the fallback imports from all fetcher files in `src/lib/content/`.

- [ ] `pnpm typecheck` — fix any broken imports.
- [ ] `pnpm i18n:check` — expect OK.
- [ ] Commit: `git add -A && git commit -m "chore: remove hardcoded content files post-migration"`

---

### Task 38: Update TODO.md

- [ ] Mark all Section 2 items as done in `TODO.md`.
- [ ] Update `_Last updated` date to today.

---

## Verification

End-to-end check after all tasks:

1. `pnpm typecheck` → clean
2. `pnpm i18n:check` → OK
3. `pnpm test` → passing
4. Open `http://localhost:3000/nl` — all home page sections render
5. Open `http://localhost:3000/en` — same
6. Open `/nl/over-ons`, `/en/about` — about page renders
7. Open `/nl/branding`, `/en/branding` — branding page renders
8. Open `/nl/cases`, `/en/cases` — cases grid renders with Sanity data
9. Open `/nl/gids`, `/en/guide` — guide index lists both guides
10. Open `/nl/gids/koffiecatering` and `/nl/gids/barista-bar-specs` — guide pages render
11. Edit a FAQ item in Sanity Studio → verify ISR revalidates (check browser after ~10s)
