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
  cta?: {
    title: { nl: string; en: string };
    description: { nl: string; en: string };
    label: { nl: string; en: string };
  };
  updatedAt?: string;
  readingTimeMinutes?: number;
};

export type GuideListItem = {
  slug: string;
  title: string;
  lead: string;
  readingTimeMinutes: number;
};

function pickGuide(g: GuideContent): Omit<GuideListItem, "slug"> {
  return { title: g.title, lead: g.lead, readingTimeMinutes: g.readingTimeMinutes };
}

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

  const { getCoffeeCateringGuide } = await import("@/content/guides/coffee-catering");
  const { getBaristaBarSpecsGuide } = await import("@/content/guides/barista-bar-specs");
  return [
    { slug: "koffiecatering", ...pickGuide(getCoffeeCateringGuide(locale)) },
    { slug: "barista-bar-specs", ...pickGuide(getBaristaBarSpecsGuide(locale)) },
  ];
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
