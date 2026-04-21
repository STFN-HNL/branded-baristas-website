# src/content/\*.ts — content seed (deprecated)

These files hold the bilingual copy that drives home, about, branding, cases
index, blog index, contact and privacy pages.

## Status

- **Role today:** runtime source of truth for page copy.
- **Target state:** copy lives in Sanity (see `/sanity/schemas/page.ts` and
  friends). The website reads from Sanity with these files acting only as a
  seed / fallback during local development.
- **Why this directory still exists:** the actual content migration is owned
  by the content team. It requires sitting in Sanity Studio, creating a
  `page` document per route and pasting in the bilingual copy. That is a
  content-ops task, not a code task, so deleting the directory before the
  documents exist would take the site down.

## Migration plan

1. Make sure the following Sanity schemas exist (they do today):
   - `page` — generic marketing page with bilingual title, lead, sections and
     SEO block.
   - `settings` — global copy (org info, social handles).
   - `testimonial`, `caseStudy`, `post`, `concept` — already live.
2. For each file in this directory, create a matching Sanity document in
   Studio, using the NL copy as the authoritative source and EN as the
   translated counterpart.
3. Introduce a `src/lib/content/<name>.ts` fetcher per page that prefers
   Sanity and falls back to the local file. Example shape:

   ```ts
   export async function getHomeCopy(locale: Locale): Promise<HomeContent> {
     const fromSanity = await fetchHomeFromSanity(locale).catch(() => null);
     return fromSanity ?? getHomeContent(locale);
   }
   ```

4. Switch every page that imports from `@/content/*` to import from
   `@/lib/content/*` instead.
5. Once every document is live in production Sanity and the fetchers are in
   use, delete this directory and remove the fallback calls.

## Guard rails while this directory still exists

- NL and EN must stay in sync. `pnpm i18n:check` catches missing message
  keys in `messages/*.json` but not in `src/content/*.ts`. Keep the two
  locales 1:1 by convention.
- Do NOT introduce new copy here if the corresponding Sanity schema already
  supports it — put it in Sanity directly to avoid a second migration later.
- Any new page type should land in Sanity from day one.
