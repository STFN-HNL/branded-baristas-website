import type { MetadataRoute } from "next";
import { routing, type Locale } from "@/lib/i18n/routing";

// Evaluate at request time: the Docker build runs with placeholder env vars
// (see Dockerfile), so a build-time sitemap would bake placeholder.example.com
// into every URL. Runtime evaluation reads the real NEXT_PUBLIC_SITE_URL.
export const dynamic = "force-dynamic";
import { languageAlternates, localeUrl } from "@/lib/seo";
import { getHomeContent } from "@/content/home";
import { getCases } from "@/lib/sanity/queries/case";
import { getPosts } from "@/lib/sanity/queries/post";

/**
 * Static top-level routes. Values are the INTERNAL pathname that matches the
 * folder route — `localeUrl` translates them to the locale-specific public URL
 * via `pathnames` (ADR 0003).
 */
const STATIC_PATHS: readonly string[] = [
  "/",
  "/over-ons",
  "/diensten",
  "/contact",
  "/offerte",
  "/branding",
  "/privacy",
  "/gids/koffiecatering",
  "/gids/barista-bar-specs",
] as const;

function buildEntry(
  path: string,
  {
    changeFrequency = "weekly",
    priority = 0.7,
    lastModified,
  }: {
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority?: number;
    lastModified?: Date;
  } = {},
): MetadataRoute.Sitemap[number] {
  return {
    url: localeUrl(routing.defaultLocale, path),
    changeFrequency,
    priority,
    lastModified: lastModified ?? new Date(),
    alternates: { languages: languageAlternates(path) },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    entries.push(
      buildEntry(path, {
        priority: path === "/" ? 1 : 0.8,
        changeFrequency: path === "/" ? "daily" : "weekly",
      }),
    );
  }

  // Concept detail pages from the static content fallback.
  const home = getHomeContent(routing.defaultLocale as Locale);
  for (const c of home.events.concepts) {
    entries.push(buildEntry(`/diensten/events/${c.slug}`, { priority: 0.7 }));
  }
  for (const c of home.inCompany.concepts) {
    entries.push(buildEntry(`/diensten/in-company/${c.slug}`, { priority: 0.7 }));
  }

  // Dynamic cases + posts from Sanity (ignored if fetch fails / no data).
  // The /cases and /blog list pages noindex while empty, so they only enter
  // the sitemap once at least one real document is published.
  try {
    const cases = (await getCases().catch(() => null)) ?? [];
    if (cases.length > 0) {
      entries.push(buildEntry("/cases", { priority: 0.8 }));
    }
    for (const caseDoc of cases) {
      const slug = (caseDoc.slug as { nl?: { current?: string } } | undefined)?.nl?.current;
      if (!slug) continue;
      entries.push(buildEntry(`/cases/${slug}`, { priority: 0.6 }));
    }
  } catch (error) {
    console.warn("[sitemap] cases fetch failed", error);
  }

  try {
    const posts = (await getPosts().catch(() => null)) ?? [];
    if (posts.length > 0) {
      entries.push(buildEntry("/blog", { priority: 0.8 }));
    }
    for (const post of posts) {
      const slug = (post.slug as { nl?: { current?: string } } | undefined)?.nl?.current;
      if (!slug) continue;
      const publishedAt = (post as { publishedAt?: string }).publishedAt;
      entries.push(
        buildEntry(`/blog/${slug}`, {
          priority: 0.6,
          changeFrequency: "monthly",
          lastModified: publishedAt ? new Date(publishedAt) : undefined,
        }),
      );
    }
  } catch (error) {
    console.warn("[sitemap] posts fetch failed", error);
  }

  return entries;
}
