# Week 2 — Content Infrastructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** All Sanity content schemas, per-type GROQ queries with typed results, Studio desk structure grouping the types, and a signed `/api/revalidate` webhook so editor publishes instantly refresh the site.

**Architecture:** Schemas live in `sanity/schemas/` — one file per type, registered in `sanity/schemas/index.ts`. Queries live in `src/lib/sanity/queries/` — one file per document type, each exporting a GROQ string tagged with `defineQuery` (for future typegen) and a thin async fetcher that tags cache entries for `revalidateTag`. Webhook route validates `sanity-webhook-signature` using `@sanity/webhook` and calls `revalidateTag` per document type.

**Tech Stack:** Sanity v5, next-sanity 12, `@sanity/webhook` for HMAC verification, Vitest for tests.

---

## File map

**Schemas (new):**

- `sanity/schemas/objects/bilingualSlug.ts` — `{ nl: slug, en: slug }` object used on all localized docs
- `sanity/schemas/objects/localeText.ts` — `{ nl: text, en: text }` (paragraphs, not headings)
- `sanity/schemas/objects/localeBlocks.ts` — `{ nl: block[], en: block[] }` (portable text body)
- `sanity/schemas/objects/imageWithAlt.ts` — image + required `alt` localeString
- `sanity/schemas/author.ts` — document
- `sanity/schemas/category.ts` — document (blog taxonomy)
- `sanity/schemas/testimonial.ts` — document
- `sanity/schemas/brandingOption.ts` — document
- `sanity/schemas/pricingTier.ts` — document
- `sanity/schemas/concept.ts` — document
- `sanity/schemas/case.ts` — document
- `sanity/schemas/post.ts` — document

**Schemas (modify):**

- `sanity/schemas/index.ts` — register all new types

**Studio (modify):**

- `sanity.config.ts` — add desk `structure` grouping docs

**Queries (new):**

- `src/lib/sanity/queries/concept.ts`
- `src/lib/sanity/queries/case.ts`
- `src/lib/sanity/queries/post.ts`

**API route (new):**

- `src/app/api/revalidate/route.ts`

**Scripts (modify):**

- `package.json` — add `sanity:types` script; add `@sanity/webhook` dep
- `.env.example` and `.env.local` — (already contain `SANITY_WEBHOOK_SECRET`, no change)

**Tests (new):**

- `tests/unit/sanity/schemas.test.ts` — asserts each new type is registered
- `tests/unit/sanity/queries.test.ts` — asserts each query is a non-empty string containing required projections
- `tests/unit/api/revalidate.test.ts` — signature validation + tag revalidation behaviour

---

## Conventions used throughout

**Locale fields:** every visitor-facing string uses `localeString` or `localeText`. Never a bare `string`. Exceptions: internal-only admin fields (e.g., `client` name on a case, which is always printed verbatim).

**Slug convention:** every published document uses the `bilingualSlug` object so routes stay per-language.

**Ordering:** all list documents (posts, cases) include `orderRank` or `publishedAt`; sort in the query, not in the UI.

**Preview config:** every document sets a `preview` so editors see meaningful rows in the Studio list. Use NL as the display title.

**Validation:** every locale field is `required()` on both `nl` and `en`. Slug uniqueness via Sanity's built-in.

---

### Task 1: Shared object schemas

**Files:**

- Create: `sanity/schemas/objects/bilingualSlug.ts`
- Create: `sanity/schemas/objects/localeText.ts`
- Create: `sanity/schemas/objects/localeBlocks.ts`
- Create: `sanity/schemas/objects/imageWithAlt.ts`
- Modify: `sanity/schemas/index.ts` (register new objects)
- Test: `tests/unit/sanity/schemas.test.ts` (new)

- [x] **Step 1: Write failing schema-registration test**

Create `tests/unit/sanity/schemas.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { schemaTypes } from "../../../sanity/schemas";

const names = schemaTypes.map((t) => t.name);

describe("sanity schema registry", () => {
  it.each(["bilingualSlug", "localeText", "localeBlocks", "imageWithAlt"])(
    "registers object %s",
    (name) => {
      expect(names).toContain(name);
    },
  );
});
```

- [x] **Step 2: Run test, expect FAIL**

Run: `pnpm test -- schemas`
Expected: FAIL with "expected [...] to contain 'bilingualSlug'".

- [x] **Step 3: Implement bilingualSlug**

Create `sanity/schemas/objects/bilingualSlug.ts`:

```ts
import { defineType, defineField } from "sanity";

export const bilingualSlug = defineType({
  name: "bilingualSlug",
  type: "object",
  title: "Bilingual slug",
  fields: [
    defineField({
      name: "nl",
      type: "slug",
      title: "NL slug",
      options: { source: "title.nl", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "en",
      type: "slug",
      title: "EN slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (r) => r.required(),
    }),
  ],
});
```

- [x] **Step 4: Implement localeText**

Create `sanity/schemas/objects/localeText.ts`:

```ts
import { defineType, defineField } from "sanity";

export const localeText = defineType({
  name: "localeText",
  type: "object",
  title: "Localized text",
  fields: [
    defineField({
      name: "nl",
      type: "text",
      title: "Nederlands",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "en",
      type: "text",
      title: "English",
      rows: 3,
      validation: (r) => r.required(),
    }),
  ],
});
```

- [x] **Step 5: Implement localeBlocks**

Create `sanity/schemas/objects/localeBlocks.ts`:

```ts
import { defineType, defineField } from "sanity";

const bodyField = (name: "nl" | "en", title: string) =>
  defineField({
    name,
    type: "array",
    title,
    of: [
      {
        type: "block",
        styles: [
          { title: "Normal", value: "normal" },
          { title: "H2", value: "h2" },
          { title: "H3", value: "h3" },
          { title: "Quote", value: "blockquote" },
        ],
        lists: [
          { title: "Bullet", value: "bullet" },
          { title: "Numbered", value: "number" },
        ],
        marks: {
          decorators: [
            { title: "Strong", value: "strong" },
            { title: "Emphasis", value: "em" },
          ],
          annotations: [
            {
              name: "link",
              type: "object",
              title: "Link",
              fields: [
                { name: "href", type: "url", title: "URL" },
                { name: "newTab", type: "boolean", title: "Open in new tab" },
              ],
            },
          ],
        },
      },
      { type: "imageWithAlt" },
    ],
    validation: (r) => r.required().min(1),
  });

export const localeBlocks = defineType({
  name: "localeBlocks",
  type: "object",
  title: "Localized rich text",
  fields: [bodyField("nl", "Nederlands"), bodyField("en", "English")],
});
```

- [x] **Step 6: Implement imageWithAlt**

Create `sanity/schemas/objects/imageWithAlt.ts`:

```ts
import { defineType, defineField } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  type: "image",
  title: "Image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      type: "localeString",
      title: "Alt text",
      validation: (r) => r.required(),
    }),
    defineField({ name: "caption", type: "localeString", title: "Caption" }),
  ],
});
```

- [x] **Step 7: Register objects in index**

Replace `sanity/schemas/index.ts`:

```ts
import type { SchemaTypeDefinition } from "sanity";
import { localeString } from "./objects/localeString";
import { localeText } from "./objects/localeText";
import { localeBlocks } from "./objects/localeBlocks";
import { bilingualSlug } from "./objects/bilingualSlug";
import { imageWithAlt } from "./objects/imageWithAlt";
import { seo } from "./objects/seo";
import { settings } from "./settings";
import { page } from "./page";

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  localeString,
  localeText,
  localeBlocks,
  bilingualSlug,
  imageWithAlt,
  seo,
  // documents
  settings,
  page,
];
```

- [x] **Step 8: Run test, expect PASS**

Run: `pnpm test -- schemas`
Expected: PASS (4 cases).

- [x] **Step 9: Typecheck + commit**

```bash
pnpm typecheck
git add sanity/schemas/objects/ sanity/schemas/index.ts tests/unit/sanity/schemas.test.ts
git commit -m "feat(sanity): shared bilingual object types"
```

---

### Task 2: Author + category documents

**Files:**

- Create: `sanity/schemas/author.ts`
- Create: `sanity/schemas/category.ts`
- Modify: `sanity/schemas/index.ts`
- Modify: `tests/unit/sanity/schemas.test.ts` (extend)

- [x] **Step 1: Extend schema registry test**

Replace the `it.each` block in `tests/unit/sanity/schemas.test.ts` with the full expected set (keep existing — append `author`, `category`):

```ts
it.each(["bilingualSlug", "localeText", "localeBlocks", "imageWithAlt", "author", "category"])(
  "registers type %s",
  (name) => {
    expect(names).toContain(name);
  },
);
```

- [x] **Step 2: Run test, expect FAIL**

Run: `pnpm test -- schemas`
Expected: FAIL on `author`.

- [x] **Step 3: Implement author**

Create `sanity/schemas/author.ts`:

```ts
import { defineType, defineField } from "sanity";

export const author = defineType({
  name: "author",
  type: "document",
  title: "Author",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "localeString" }),
    defineField({ name: "bio", type: "localeText" }),
    defineField({ name: "avatar", type: "imageWithAlt" }),
  ],
  preview: {
    select: { title: "name", subtitle: "role.nl", media: "avatar" },
  },
});
```

- [x] **Step 4: Implement category**

Create `sanity/schemas/category.ts`:

```ts
import { defineType, defineField } from "sanity";

export const category = defineType({
  name: "category",
  type: "document",
  title: "Blog category",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "bilingualSlug",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "title.nl" } },
});
```

- [x] **Step 5: Register in index**

Add imports + entries to `sanity/schemas/index.ts`:

```ts
import { author } from "./author";
import { category } from "./category";
```

And append to the exported array after `page`:

```ts
  settings,
  page,
  author,
  category,
```

- [x] **Step 6: Run test, expect PASS**

Run: `pnpm test -- schemas`
Expected: PASS (6 cases).

- [x] **Step 7: Commit**

```bash
pnpm typecheck
git add sanity/schemas/author.ts sanity/schemas/category.ts sanity/schemas/index.ts tests/unit/sanity/schemas.test.ts
git commit -m "feat(sanity): author and blog category documents"
```

---

### Task 3: Testimonial, brandingOption, pricingTier

**Files:**

- Create: `sanity/schemas/testimonial.ts`
- Create: `sanity/schemas/brandingOption.ts`
- Create: `sanity/schemas/pricingTier.ts`
- Modify: `sanity/schemas/index.ts`
- Modify: `tests/unit/sanity/schemas.test.ts`

- [x] **Step 1: Extend schema registry test**

Append `"testimonial"`, `"brandingOption"`, `"pricingTier"` to the `it.each` list in `tests/unit/sanity/schemas.test.ts`.

- [x] **Step 2: Run test, expect FAIL**

Run: `pnpm test -- schemas`
Expected: FAIL on `testimonial`.

- [x] **Step 3: Implement testimonial**

Create `sanity/schemas/testimonial.ts`:

```ts
import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  type: "document",
  title: "Testimonial",
  fields: [
    defineField({ name: "quote", type: "localeText", validation: (r) => r.required() }),
    defineField({ name: "author", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "localeString" }),
    defineField({ name: "company", type: "string" }),
    defineField({ name: "avatar", type: "imageWithAlt" }),
  ],
  preview: {
    select: { title: "author", subtitle: "company", media: "avatar" },
  },
});
```

- [x] **Step 4: Implement brandingOption**

Create `sanity/schemas/brandingOption.ts`:

```ts
import { defineType, defineField } from "sanity";

export const brandingOption = defineType({
  name: "brandingOption",
  type: "document",
  title: "Branding option",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "description", type: "localeText" }),
    defineField({ name: "image", type: "imageWithAlt" }),
    defineField({
      name: "priceModifierCents",
      type: "number",
      title: "Price modifier (EUR cents)",
      description: "Amount added to base price when selected in quote.",
      validation: (r) => r.required().min(0),
    }),
  ],
  preview: { select: { title: "title.nl", subtitle: "priceModifierCents" } },
});
```

- [x] **Step 5: Implement pricingTier**

Create `sanity/schemas/pricingTier.ts`:

```ts
import { defineType, defineField } from "sanity";

export const pricingTier = defineType({
  name: "pricingTier",
  type: "document",
  title: "Pricing tier",
  fields: [
    defineField({
      name: "concept",
      type: "reference",
      to: [{ type: "concept" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "basePriceCents",
      type: "number",
      title: "Base price (EUR cents)",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "pricePerGuestCents",
      type: "number",
      title: "Price per guest (EUR cents)",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "minGuests",
      type: "number",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "maxGuests",
      type: "number",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "durationHours",
      type: "number",
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { concept: "concept.title.nl", base: "basePriceCents" },
    prepare: ({ concept, base }) => ({
      title: concept ?? "(no concept)",
      subtitle: base != null ? `€${(base / 100).toFixed(2)} base` : "",
    }),
  },
});
```

Note: `reference: [{ type: "concept" }]` will Studio-warn until Task 4 registers `concept`. That is expected — the warning clears when concept lands.

- [x] **Step 6: Register in index**

Add imports and entries:

```ts
import { testimonial } from "./testimonial";
import { brandingOption } from "./brandingOption";
import { pricingTier } from "./pricingTier";
```

Append to the array after `category`:

```ts
  testimonial,
  brandingOption,
  pricingTier,
```

- [x] **Step 7: Run test, expect PASS**

Run: `pnpm test -- schemas`
Expected: PASS (9 cases).

- [x] **Step 8: Commit**

```bash
pnpm typecheck
git add sanity/schemas/testimonial.ts sanity/schemas/brandingOption.ts sanity/schemas/pricingTier.ts sanity/schemas/index.ts tests/unit/sanity/schemas.test.ts
git commit -m "feat(sanity): testimonial, branding option, pricing tier"
```

---

### Task 4: Concept document

**Files:**

- Create: `sanity/schemas/concept.ts`
- Modify: `sanity/schemas/index.ts`
- Modify: `tests/unit/sanity/schemas.test.ts`

- [x] **Step 1: Extend schema registry test**

Append `"concept"` to the `it.each` list.

- [x] **Step 2: Run test, expect FAIL**

Run: `pnpm test -- schemas`
Expected: FAIL on `concept`.

- [x] **Step 3: Implement concept**

Create `sanity/schemas/concept.ts`:

```ts
import { defineType, defineField } from "sanity";

export const concept = defineType({
  name: "concept",
  type: "document",
  title: "Concept (service)",
  fields: [
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Events", value: "events" },
          { title: "In-Company", value: "in-company" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "bilingualSlug", validation: (r) => r.required() }),
    defineField({
      name: "shortDescription",
      type: "localeText",
      validation: (r) => r.required(),
    }),
    defineField({ name: "hero", type: "imageWithAlt", validation: (r) => r.required() }),
    defineField({
      name: "gallery",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({ name: "body", type: "localeBlocks" }),
    defineField({
      name: "specs",
      type: "array",
      title: "Specs",
      of: [
        {
          type: "object",
          name: "spec",
          fields: [
            { name: "label", type: "localeString" },
            { name: "value", type: "localeString" },
          ],
          preview: { select: { title: "label.nl", subtitle: "value.nl" } },
        },
      ],
    }),
    defineField({ name: "seo", type: "seo", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "title.nl", subtitle: "category", media: "hero" },
  },
});
```

- [x] **Step 4: Register in index**

Add `import { concept } from "./concept";` and append `concept,` to the array after `pricingTier`.

- [x] **Step 5: Run test, expect PASS**

Run: `pnpm test -- schemas`
Expected: PASS (10 cases).

- [x] **Step 6: Commit**

```bash
pnpm typecheck
git add sanity/schemas/concept.ts sanity/schemas/index.ts tests/unit/sanity/schemas.test.ts
git commit -m "feat(sanity): concept document with events/in-company split"
```

---

### Task 5: Case document

**Files:**

- Create: `sanity/schemas/case.ts`
- Modify: `sanity/schemas/index.ts`
- Modify: `tests/unit/sanity/schemas.test.ts`

- [x] **Step 1: Extend schema registry test**

Append `"case"`.

- [x] **Step 2: Run test, expect FAIL**

Run: `pnpm test -- schemas`
Expected: FAIL on `case`.

- [x] **Step 3: Implement case**

Create `sanity/schemas/case.ts`:

```ts
import { defineType, defineField } from "sanity";

export const caseStudy = defineType({
  name: "case",
  type: "document",
  title: "Case",
  fields: [
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Events", value: "events" },
          { title: "In-Company", value: "in-company" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "bilingualSlug", validation: (r) => r.required() }),
    defineField({ name: "client", type: "string", validation: (r) => r.required() }),
    defineField({ name: "eventDate", type: "date" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "guestCount", type: "number" }),
    defineField({
      name: "conceptsUsed",
      type: "array",
      of: [{ type: "reference", to: [{ type: "concept" }] }],
    }),
    defineField({ name: "hero", type: "imageWithAlt", validation: (r) => r.required() }),
    defineField({
      name: "gallery",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({
      name: "testimonial",
      type: "reference",
      to: [{ type: "testimonial" }],
    }),
    defineField({ name: "story", type: "localeBlocks" }),
    defineField({ name: "seo", type: "seo", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "title.nl", subtitle: "client", media: "hero" },
  },
  orderings: [
    {
      title: "Event date, newest",
      name: "eventDateDesc",
      by: [{ field: "eventDate", direction: "desc" }],
    },
  ],
});
```

Note: we export as `caseStudy` (not `case`) because `case` is a JS reserved keyword. The `name` field still registers the type as `"case"`.

- [x] **Step 4: Register in index**

Add `import { caseStudy } from "./case";` and append `caseStudy,` after `concept`.

- [x] **Step 5: Run test, expect PASS**

Run: `pnpm test -- schemas`
Expected: PASS (11 cases).

- [x] **Step 6: Commit**

```bash
pnpm typecheck
git add sanity/schemas/case.ts sanity/schemas/index.ts tests/unit/sanity/schemas.test.ts
git commit -m "feat(sanity): case document with events/in-company split"
```

---

### Task 6: Post document

**Files:**

- Create: `sanity/schemas/post.ts`
- Modify: `sanity/schemas/index.ts`
- Modify: `tests/unit/sanity/schemas.test.ts`

- [x] **Step 1: Extend schema registry test**

Append `"post"`.

- [x] **Step 2: Run test, expect FAIL**

Run: `pnpm test -- schemas`
Expected: FAIL on `post`.

- [x] **Step 3: Implement post**

Create `sanity/schemas/post.ts`:

```ts
import { defineType, defineField } from "sanity";

export const post = defineType({
  name: "post",
  type: "document",
  title: "Blog post",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "bilingualSlug", validation: (r) => r.required() }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "excerpt",
      type: "localeText",
      validation: (r) => r.required(),
    }),
    defineField({ name: "coverImage", type: "imageWithAlt" }),
    defineField({ name: "body", type: "localeBlocks", validation: (r) => r.required() }),
    defineField({ name: "seo", type: "seo", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "title.nl", subtitle: "publishedAt", media: "coverImage" },
  },
  orderings: [
    {
      title: "Published, newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
```

- [x] **Step 4: Register in index**

Add `import { post } from "./post";` and append `post,` after `caseStudy`.

- [x] **Step 5: Run test, expect PASS**

Run: `pnpm test -- schemas`
Expected: PASS (12 cases).

- [x] **Step 6: Commit**

```bash
pnpm typecheck
git add sanity/schemas/post.ts sanity/schemas/index.ts tests/unit/sanity/schemas.test.ts
git commit -m "feat(sanity): blog post document"
```

---

### Task 7: Studio desk structure

**Files:**

- Modify: `sanity.config.ts`

- [x] **Step 1: Replace Studio config with grouped structure**

Replace `sanity.config.ts` contents:

```ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "branded-baristas",
  title: "Branded Baristas",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site settings")
              .child(S.document().schemaType("settings").documentId("settings")),
            S.divider(),
            S.listItem().title("Concepts").child(S.documentTypeList("concept").title("Concepts")),
            S.listItem().title("Cases").child(S.documentTypeList("case").title("Cases")),
            S.listItem().title("Blog posts").child(S.documentTypeList("post").title("Blog posts")),
            S.divider(),
            S.listItem().title("Authors").child(S.documentTypeList("author").title("Authors")),
            S.listItem()
              .title("Categories")
              .child(S.documentTypeList("category").title("Categories")),
            S.listItem()
              .title("Testimonials")
              .child(S.documentTypeList("testimonial").title("Testimonials")),
            S.listItem()
              .title("Branding options")
              .child(S.documentTypeList("brandingOption").title("Branding options")),
            S.listItem()
              .title("Pricing tiers")
              .child(S.documentTypeList("pricingTier").title("Pricing tiers")),
            S.divider(),
            S.listItem().title("Pages").child(S.documentTypeList("page").title("Pages")),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
```

- [x] **Step 2: Verify typecheck**

Run: `pnpm typecheck`
Expected: no errors.

- [x] **Step 3: Smoke-test Studio locally**

Run: `pnpm dev`, open `http://localhost:3000/studio`.
Expected: left nav shows grouped sections (Site settings, Concepts, Cases, Blog posts, etc.) with dividers between groups. Creating a new concept should load a form with the NL/EN title, category radio, slug, hero, SEO.

Stop dev server (`Ctrl+C`).

- [x] **Step 4: Commit**

```bash
git add sanity.config.ts
git commit -m "feat(sanity): grouped studio desk structure"
```

---

### Task 8: Sanity typegen setup

**Files:**

- Modify: `package.json` (add script + deps)
- Create: `src/lib/sanity/types.generated.ts` (initial — file exists so imports compile)
- Modify: `.gitignore` — no change (we commit generated file)

- [x] **Step 1: Add typegen dep**

Run:

```bash
pnpm add -D @sanity/cli
```

Expected: `@sanity/cli` added under devDependencies.

- [x] **Step 2: Add scripts to package.json**

Add two scripts in the `scripts` block of `package.json`:

```json
"sanity:extract": "sanity schema extract --path .sanity/schema.json",
"sanity:types": "pnpm sanity:extract && sanity typegen generate"
```

- [x] **Step 3: Add `sanity-typegen.json` config**

Create `sanity-typegen.json` at repo root:

```json
{
  "path": "src/**/*.{ts,tsx}",
  "schema": ".sanity/schema.json",
  "generates": "src/lib/sanity/types.generated.ts"
}
```

- [x] **Step 4: Ignore extract artefact in git**

Add `.sanity/` to `.gitignore` (create section if absent):

```
# sanity extract artefact
.sanity/
```

- [x] **Step 5: Create placeholder types file**

Create `src/lib/sanity/types.generated.ts`:

```ts
// Generated by `pnpm sanity:types`. Safe to delete and regenerate.
// Do not hand-edit.
export {};
```

- [x] **Step 6: Smoke-test extract**

Run: `pnpm sanity:extract`
Expected: writes `.sanity/schema.json` (large JSON) and exits 0.

Do NOT run `pnpm sanity:types` yet — it requires queries to exist. It runs successfully in Task 11 once queries land.

- [x] **Step 7: Commit**

```bash
git add package.json pnpm-lock.yaml sanity-typegen.json src/lib/sanity/types.generated.ts .gitignore
git commit -m "build(sanity): typegen scripts"
```

---

### Task 9: Concept queries

**Files:**

- Create: `src/lib/sanity/queries/concept.ts`
- Create: `tests/unit/sanity/queries.test.ts`

- [x] **Step 1: Write failing query shape test**

Create `tests/unit/sanity/queries.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { CONCEPTS_QUERY, CONCEPT_BY_SLUG_QUERY } from "@/lib/sanity/queries/concept";

describe("concept queries", () => {
  it("CONCEPTS_QUERY filters on _type and orders by title", () => {
    expect(CONCEPTS_QUERY).toContain('_type == "concept"');
    expect(CONCEPTS_QUERY).toMatch(/order\(/);
  });

  it("CONCEPTS_QUERY supports optional category filter parameter", () => {
    expect(CONCEPTS_QUERY).toContain("$category");
  });

  it("CONCEPT_BY_SLUG_QUERY looks up by locale-specific slug", () => {
    expect(CONCEPT_BY_SLUG_QUERY).toContain("$slug");
    expect(CONCEPT_BY_SLUG_QUERY).toContain("$locale");
  });
});
```

- [x] **Step 2: Run test, expect FAIL**

Run: `pnpm test -- queries`
Expected: FAIL with "Cannot find module '@/lib/sanity/queries/concept'".

- [x] **Step 3: Implement concept queries**

Create `src/lib/sanity/queries/concept.ts`:

```ts
import { defineQuery } from "next-sanity";
import { sanityClient } from "../client";

export const CONCEPTS_QUERY = defineQuery(`
  *[_type == "concept" && (!defined($category) || category == $category)] | order(title.nl asc) {
    _id,
    category,
    "title": title,
    "slug": slug,
    "shortDescription": shortDescription,
    "hero": { "url": hero.asset->url, "alt": hero.alt }
  }
`);

export const CONCEPT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "concept" && slug[$locale].current == $slug][0] {
    _id,
    category,
    title,
    slug,
    shortDescription,
    hero { ..., "url": asset->url },
    gallery[] { ..., "url": asset->url },
    body,
    specs,
    seo
  }
`);

type Locale = "nl" | "en";
type Category = "events" | "in-company";

export async function getConcepts(params: { category?: Category } = {}) {
  return sanityClient.fetch(
    CONCEPTS_QUERY,
    { category: params.category ?? null },
    { next: { tags: ["concept"] } },
  );
}

export async function getConceptBySlug(slug: string, locale: Locale) {
  return sanityClient.fetch(
    CONCEPT_BY_SLUG_QUERY,
    { slug, locale },
    { next: { tags: ["concept", `concept:${slug}`] } },
  );
}
```

- [x] **Step 4: Run test, expect PASS**

Run: `pnpm test -- queries`
Expected: PASS (3 cases).

- [x] **Step 5: Commit**

```bash
pnpm typecheck
git add src/lib/sanity/queries/concept.ts tests/unit/sanity/queries.test.ts
git commit -m "feat(queries): concept list + detail"
```

---

### Task 10: Case queries

**Files:**

- Create: `src/lib/sanity/queries/case.ts`
- Modify: `tests/unit/sanity/queries.test.ts`

- [x] **Step 1: Extend query test**

Append to `tests/unit/sanity/queries.test.ts`:

```ts
import { CASES_QUERY, CASE_BY_SLUG_QUERY } from "@/lib/sanity/queries/case";

describe("case queries", () => {
  it("CASES_QUERY filters by _type and optional category", () => {
    expect(CASES_QUERY).toContain('_type == "case"');
    expect(CASES_QUERY).toContain("$category");
  });

  it("CASES_QUERY orders by eventDate desc", () => {
    expect(CASES_QUERY).toMatch(/order\(eventDate desc\)/);
  });

  it("CASE_BY_SLUG_QUERY looks up by locale-specific slug", () => {
    expect(CASE_BY_SLUG_QUERY).toContain("$slug");
    expect(CASE_BY_SLUG_QUERY).toContain("$locale");
  });
});
```

- [x] **Step 2: Run test, expect FAIL**

Run: `pnpm test -- queries`
Expected: FAIL with "Cannot find module '@/lib/sanity/queries/case'".

- [x] **Step 3: Implement case queries**

Create `src/lib/sanity/queries/case.ts`:

```ts
import { defineQuery } from "next-sanity";
import { sanityClient } from "../client";

export const CASES_QUERY = defineQuery(`
  *[_type == "case" && (!defined($category) || category == $category)]
    | order(eventDate desc) {
      _id,
      category,
      title,
      slug,
      client,
      eventDate,
      location,
      guestCount,
      "hero": { "url": hero.asset->url, "alt": hero.alt }
  }
`);

export const CASE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "case" && slug[$locale].current == $slug][0] {
    _id,
    category,
    title,
    slug,
    client,
    eventDate,
    location,
    guestCount,
    hero { ..., "url": asset->url },
    gallery[] { ..., "url": asset->url },
    "conceptsUsed": conceptsUsed[]-> {
      _id, title, slug, category
    },
    "testimonial": testimonial-> {
      quote, author, role, company
    },
    story,
    seo
  }
`);

type Locale = "nl" | "en";
type Category = "events" | "in-company";

export async function getCases(params: { category?: Category } = {}) {
  return sanityClient.fetch(
    CASES_QUERY,
    { category: params.category ?? null },
    { next: { tags: ["case"] } },
  );
}

export async function getCaseBySlug(slug: string, locale: Locale) {
  return sanityClient.fetch(
    CASE_BY_SLUG_QUERY,
    { slug, locale },
    { next: { tags: ["case", `case:${slug}`] } },
  );
}
```

- [x] **Step 4: Run test, expect PASS**

Run: `pnpm test -- queries`
Expected: PASS (6 cases).

- [x] **Step 5: Commit**

```bash
pnpm typecheck
git add src/lib/sanity/queries/case.ts tests/unit/sanity/queries.test.ts
git commit -m "feat(queries): case list + detail with category filter"
```

---

### Task 11: Post queries + typegen run

**Files:**

- Create: `src/lib/sanity/queries/post.ts`
- Modify: `tests/unit/sanity/queries.test.ts`
- Modify: `src/lib/sanity/types.generated.ts` (overwritten by typegen)

- [x] **Step 1: Extend query test**

Append to `tests/unit/sanity/queries.test.ts`:

```ts
import { POSTS_QUERY, POST_BY_SLUG_QUERY } from "@/lib/sanity/queries/post";

describe("post queries", () => {
  it("POSTS_QUERY filters _type == post and is published", () => {
    expect(POSTS_QUERY).toContain('_type == "post"');
    expect(POSTS_QUERY).toContain("publishedAt <= now()");
  });

  it("POSTS_QUERY orders by publishedAt desc", () => {
    expect(POSTS_QUERY).toMatch(/order\(publishedAt desc\)/);
  });

  it("POST_BY_SLUG_QUERY looks up by locale-specific slug", () => {
    expect(POST_BY_SLUG_QUERY).toContain("$slug");
    expect(POST_BY_SLUG_QUERY).toContain("$locale");
  });
});
```

- [x] **Step 2: Run test, expect FAIL**

Run: `pnpm test -- queries`
Expected: FAIL with "Cannot find module '@/lib/sanity/queries/post'".

- [x] **Step 3: Implement post queries**

Create `src/lib/sanity/queries/post.ts`:

```ts
import { defineQuery } from "next-sanity";
import { sanityClient } from "../client";

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && publishedAt <= now()]
    | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      "author": author-> { name, "avatar": avatar.asset->url },
      "category": category-> { title, slug },
      "coverImage": { "url": coverImage.asset->url, "alt": coverImage.alt }
  }
`);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug[$locale].current == $slug && publishedAt <= now()][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    coverImage { ..., "url": asset->url },
    "author": author-> { name, role, bio, "avatar": avatar.asset->url },
    "category": category-> { title, slug },
    seo
  }
`);

type Locale = "nl" | "en";

export async function getPosts() {
  return sanityClient.fetch(POSTS_QUERY, {}, { next: { tags: ["post"] } });
}

export async function getPostBySlug(slug: string, locale: Locale) {
  return sanityClient.fetch(
    POST_BY_SLUG_QUERY,
    { slug, locale },
    { next: { tags: ["post", `post:${slug}`] } },
  );
}
```

- [x] **Step 4: Run test, expect PASS**

Run: `pnpm test -- queries`
Expected: PASS (9 cases).

- [x] **Step 5: Run typegen end-to-end**

Run: `pnpm sanity:types`
Expected: updates `src/lib/sanity/types.generated.ts` with types for all schema types and query results. Exit code 0.

If this fails, read the error. Most commonly: a query contains a field the schema does not know. Fix the query or the schema.

- [x] **Step 6: Commit**

```bash
pnpm typecheck
git add src/lib/sanity/queries/post.ts tests/unit/sanity/queries.test.ts src/lib/sanity/types.generated.ts
git commit -m "feat(queries): blog post list + detail + regen types"
```

---

### Task 12: Revalidate webhook

**Files:**

- Create: `src/app/api/revalidate/route.ts`
- Create: `tests/unit/api/revalidate.test.ts`
- Modify: `package.json` (add `@sanity/webhook` dep)

- [x] **Step 1: Add webhook verification dep**

Run:

```bash
pnpm add @sanity/webhook
```

Expected: `@sanity/webhook` added under dependencies.

- [x] **Step 2: Write failing handler test**

Create `tests/unit/api/revalidate.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createHmac } from "node:crypto";

const SECRET = "test-secret";

vi.mock("@/lib/env", () => ({
  env: { SANITY_WEBHOOK_SECRET: SECRET },
}));

vi.mock("next/cache", () => ({
  revalidateTag: vi.fn(),
}));

function sign(raw: string, timestamp: number, secret: string) {
  return createHmac("sha256", secret).update(`${timestamp}.${raw}`).digest("base64url");
}

function makeRequest(
  body: unknown,
  opts: { signature?: string; timestamp?: number } = {},
): Request {
  const raw = JSON.stringify(body);
  const ts = opts.timestamp ?? Date.now();
  const signature = opts.signature ?? sign(raw, ts, SECRET);
  return new Request("http://localhost/api/revalidate", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "sanity-webhook-signature": `t=${ts},v1=${signature}`,
    },
    body: raw,
  });
}

describe("POST /api/revalidate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects request with invalid signature", async () => {
    const { POST } = await import("@/app/api/revalidate/route");
    const req = makeRequest({ _type: "post" }, { signature: "deadbeef", timestamp: 1 });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("revalidates tag for the document type when signature is valid", async () => {
    const { revalidateTag } = await import("next/cache");
    const { POST } = await import("@/app/api/revalidate/route");
    const req = makeRequest({ _type: "post", slug: { nl: { current: "hello" } } });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledWith("post");
  });

  it("also revalidates per-slug tag when slug is present", async () => {
    const { revalidateTag } = await import("next/cache");
    const { POST } = await import("@/app/api/revalidate/route");
    const req = makeRequest({ _type: "case", slug: { nl: { current: "akzonobel-event" } } });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledWith("case");
    expect(revalidateTag).toHaveBeenCalledWith("case:akzonobel-event");
  });
});
```

- [x] **Step 3: Run test, expect FAIL**

Run: `pnpm test -- revalidate`
Expected: FAIL with "Cannot find module '@/app/api/revalidate/route'".

- [x] **Step 4: Implement webhook route**

Create `src/app/api/revalidate/route.ts`:

```ts
import { revalidateTag } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { env } from "@/lib/env";

type Payload = {
  _type?: string;
  slug?: {
    nl?: { current?: string };
    en?: { current?: string };
    current?: string;
  };
};

export async function POST(req: Request) {
  const signature = req.headers.get(SIGNATURE_HEADER_NAME);
  const raw = await req.text();

  if (!signature || !(await isValidSignature(raw, signature, env.SANITY_WEBHOOK_SECRET))) {
    return new Response("Invalid signature", { status: 401 });
  }

  let payload: Payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const type = payload._type;
  if (!type) return new Response("Missing _type", { status: 400 });

  const slugs = [
    payload.slug?.nl?.current,
    payload.slug?.en?.current,
    payload.slug?.current,
  ].filter((s): s is string => typeof s === "string" && s.length > 0);

  revalidateTag(type);
  for (const slug of slugs) {
    revalidateTag(`${type}:${slug}`);
  }

  return Response.json({ revalidated: true, type, slugs });
}
```

- [x] **Step 5: Run test, expect PASS**

Run: `pnpm test -- revalidate`
Expected: PASS (3 cases).

- [x] **Step 6: Document webhook setup in README**

Append to `docs/architecture.md` (or create if absent) a short block:

```markdown
## Sanity → Next revalidation webhook

**Endpoint:** `POST /api/revalidate`
**Header:** `sanity-webhook-signature: t=<ts>,v1=<hmac-sha256>`
**Secret:** `SANITY_WEBHOOK_SECRET` (env)

Configure in Sanity Manage → API → Webhooks:

- URL: `<NEXT_PUBLIC_SITE_URL>/api/revalidate`
- Dataset: `production`
- Trigger: Create, Update, Delete
- Filter: `_type in ["concept", "case", "post", "author", "category", "testimonial", "brandingOption", "pricingTier", "settings", "page"]`
- Projection: `{ _type, slug }`
- HTTP method: `POST`
- Secret: paste `SANITY_WEBHOOK_SECRET` value
```

- [x] **Step 7: Commit**

```bash
pnpm typecheck
pnpm lint
git add src/app/api/revalidate/route.ts tests/unit/api/revalidate.test.ts package.json pnpm-lock.yaml docs/architecture.md
git commit -m "feat(api): signed sanity revalidate webhook"
```

---

### Task 13: Verification sweep + tag

**Files:** none.

- [x] **Step 1: Full test suite**

Run: `pnpm test`
Expected: all unit tests pass (schemas: 12, queries: 9, revalidate: 3, plus existing env/redirect/i18n).

- [x] **Step 2: Typecheck + lint**

Run: `pnpm typecheck && pnpm lint`
Expected: both clean.

- [x] **Step 3: Build**

Run: `pnpm build`
Expected: success with `/studio` and `/api/revalidate` in the route manifest.

- [x] **Step 4: E2E smoke**

Run: `pnpm test:e2e`
Expected: pass.

- [ ] **Step 5: Studio walkthrough**

Run: `pnpm dev`. Visit `http://localhost:3000/studio`. Create one of each: concept, case, post. Verify:

- Both NL and EN fields required before save
- Slug auto-generates from title
- Preview row shows NL title + meaningful subtitle
- SEO validation blocks save if title is outside 30–60 chars

Delete test docs before stopping the server.

- [x] **Step 6: Push**

```bash
git push
```

Watch CI go green on GitHub Actions.

- [x] **Step 7: Tag**

```bash
git tag v0.2.0-content
git push --tags
```

---

## Open questions for Stefan

None blocking. The spec's §5 "Data model" is fully covered by Tasks 1–6. Pricing numbers live in cents (integer) to avoid float rounding; that's an implementation choice, not a spec deviation.
