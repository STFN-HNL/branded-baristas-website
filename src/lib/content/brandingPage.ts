import { sanityClient } from "@/lib/sanity/client";
import { BRANDING_PAGE_QUERY } from "@/lib/sanity/queries/brandingPage";
import type { BrandingContent } from "@/content/branding";
import type { Locale } from "@/lib/i18n/routing";

type RawNode = Record<string, unknown>;
function asNode(value: unknown): RawNode {
  return value && typeof value === "object" ? (value as RawNode) : {};
}
function asArray(value: unknown): RawNode[] {
  return Array.isArray(value) ? value.map(asNode) : [];
}
function ls(obj: unknown, locale: Locale): string {
  const node = asNode(obj);
  const v = node[locale] ?? node.nl;
  return typeof v === "string" ? v : "";
}

export async function getBrandingPageContent(locale: Locale): Promise<BrandingContent | null> {
  const raw = await sanityClient
    .fetch<Record<
      string,
      unknown
    > | null>(BRANDING_PAGE_QUERY, {}, { next: { tags: ["brandingPage"] } })
    .catch(() => null);

  if (raw) {
    const hero = asNode(raw.hero);
    const intro = asNode(raw.intro);
    const process = asNode(raw.process);
    const cta = asNode(raw.cta);
    return {
      hero: {
        eyebrow: ls(hero.eyebrow, locale),
        title: ls(hero.title, locale),
        lead: ls(hero.lead, locale),
        image: "/images/branding/hero.jpg",
      },
      intro: {
        eyebrow: ls(intro.eyebrow, locale),
        title: ls(intro.title, locale),
        description: ls(intro.description, locale),
      },
      options: { title: "", description: "", items: [] },
      process: {
        eyebrow: ls(process.eyebrow, locale),
        title: ls(process.title, locale),
        description: ls(process.description, locale),
        steps: asArray(process.steps).map((s, i) => ({
          number: String(i + 1),
          title: ls(s.title, locale),
          description: ls(s.description, locale),
        })),
      },
      cta: {
        title: ls(cta.title, locale),
        description: ls(cta.description, locale),
        primaryLabel: ls(cta.primaryLabel, locale),
        primaryHref: "/offerte",
        secondaryLabel: ls(cta.secondaryLabel, locale),
        secondaryHref: "/contact",
      },
    };
  }

  const { getBrandingContent } = await import("@/content/branding");
  return getBrandingContent(locale);
}
