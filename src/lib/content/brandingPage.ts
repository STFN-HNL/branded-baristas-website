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
        image: "/images/branding/hero.jpg",
      },
      intro: {
        eyebrow: ls(intro?.eyebrow, locale),
        title: ls(intro?.title, locale),
        description: ls(intro?.description, locale),
      },
      options: { title: "", description: "", items: [] },
      process: {
        eyebrow: ls(process?.eyebrow, locale),
        title: ls(process?.title, locale),
        description: ls(process?.description, locale),
        steps: (process?.steps ?? []).map((s: any, i: number) => ({
          number: String(i + 1),
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

  const { getBrandingContent } = await import("@/content/branding");
  return getBrandingContent(locale);
}
