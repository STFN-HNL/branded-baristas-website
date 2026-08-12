import { getCases } from "@/lib/sanity/queries/case";
import { getPosts } from "@/lib/sanity/queries/post";

/**
 * The cases and blog sections only carry real, Sanity-authored content (the
 * hardcoded demo fallbacks were removed on 2026-07-10). While either section
 * is empty we keep it out of the nav, the sitemap and the index — these
 * helpers are the single source for that decision. They reuse the cached,
 * tag-revalidated list queries, so the extra callers stay cheap.
 */
export async function hasPublishedCases(): Promise<boolean> {
  const cases = (await getCases().catch(() => null)) ?? [];
  return cases.length > 0;
}

export async function hasPublishedPosts(): Promise<boolean> {
  const posts = (await getPosts().catch(() => null)) ?? [];
  return posts.length > 0;
}
