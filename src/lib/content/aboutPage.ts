import { sanityClient } from "@/lib/sanity/client";
import { ABOUT_PAGE_QUERY } from "@/lib/sanity/queries/aboutPage";
import type { AboutContent } from "@/content/about";
import type { Locale } from "@/lib/i18n/routing";

type RawNode = Record<string, unknown>;
function asNode(value: unknown): RawNode {
  return value && typeof value === "object" ? (value as RawNode) : {};
}
function asArray(value: unknown): RawNode[] {
  return Array.isArray(value) ? value.map(asNode) : [];
}

type RawBlock = { _type: string; children?: { text: string }[] };
function blocksToStrings(blocks: RawBlock[] | null | undefined): string[] {
  if (!blocks) return [];
  return blocks
    .filter((b) => b._type === "block")
    .map((b) => b.children?.map((c) => c.text).join("") ?? "")
    .filter(Boolean);
}
function ls(obj: unknown, locale: Locale): string {
  const node = asNode(obj);
  const v = node[locale] ?? node.nl;
  return typeof v === "string" ? v : "";
}

export async function getAboutPageContent(locale: Locale): Promise<AboutContent | null> {
  const raw = await sanityClient
    .fetch<Record<string, unknown> | null>(ABOUT_PAGE_QUERY, {}, { next: { tags: ["aboutPage"] } })
    .catch(() => null);

  if (raw) {
    const hero = asNode(raw.hero);
    const story = asNode(raw.story);
    const values = asNode(raw.values);
    const cta = asNode(raw.cta);
    const storyParagraphs = asNode(story.paragraphs);
    return {
      hero: {
        eyebrow: ls(hero.eyebrow, locale),
        title: ls(hero.title, locale),
        lead: ls(hero.lead, locale),
        image: "/images/about/team-serving.jpg",
      },
      story: {
        title: ls(story.title, locale),
        paragraphs: blocksToStrings(
          (storyParagraphs[locale] ?? storyParagraphs.nl) as RawBlock[] | undefined,
        ),
        image: "/images/about/office-coffee-cart.jpg",
      },
      values: {
        eyebrow: ls(values.eyebrow, locale),
        title: ls(values.title, locale),
        description: ls(values.description, locale),
        items: asArray(values.items).map((item) => ({
          icon: typeof item.icon === "string" ? item.icon : "",
          title: ls(item.title, locale),
          description: ls(item.description, locale),
        })),
      },
      cta: {
        title: ls(cta.title, locale),
        description: ls(cta.description, locale),
        primaryLabel: ls(cta.primaryLabel, locale),
        primaryHref: "/offerte",
        secondaryLabel: ls(cta.secondaryLabel, locale),
        secondaryHref: "/cases",
      },
    };
  }

  const { getAboutContent } = await import("@/content/about");
  return getAboutContent(locale);
}
