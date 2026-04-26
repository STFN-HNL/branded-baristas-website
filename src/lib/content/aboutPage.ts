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
        image: "/images/about/team.png",
      },
      story: {
        title: ls(story?.title, locale),
        paragraphs: blocksToStrings(story?.paragraphs?.[locale] ?? story?.paragraphs?.nl),
        image: "/images/about/barista-portrait.png",
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

  const { getAboutContent } = await import("@/content/about");
  return getAboutContent(locale);
}
