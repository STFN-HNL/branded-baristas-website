import { sanityClient } from "@/lib/sanity/client";
import { HOME_PAGE_QUERY } from "@/lib/sanity/queries/homePage";
import type { HomeContent } from "@/content/home";
import type { Locale } from "@/lib/i18n/routing";

type HomePageSanityData = Pick<
  HomeContent,
  "intro" | "inlineCta" | "tagline" | "pillars" | "differentiator" | "faq" | "contact"
>;

type PillarIcon = HomeContent["pillars"]["items"][number]["icon"];

/** A localized string field as stored in Sanity. */
type LocaleString = { nl: string; en: string };

/**
 * The raw homePage document is loosely typed: we read it as a tree of unknowns
 * and narrow each field at the point of use. This keeps us decoupled from the
 * generated Sanity types (which lag schema edits) without resorting to `any`.
 */
type RawNode = Record<string, unknown>;

function asNode(value: unknown): RawNode {
  return value && typeof value === "object" ? (value as RawNode) : {};
}

function asLocaleString(value: unknown): LocaleString | undefined {
  const node = asNode(value);
  if (typeof node.nl === "string" || typeof node.en === "string") {
    return { nl: (node.nl as string) ?? "", en: (node.en as string) ?? "" };
  }
  return undefined;
}

function asArray(value: unknown): RawNode[] {
  return Array.isArray(value) ? value.map(asNode) : [];
}

function ls(obj: LocaleString | null | undefined, locale: Locale): string {
  if (!obj) return "";
  return obj[locale] ?? obj.nl ?? "";
}

export async function getHomePageContent(locale: Locale): Promise<HomePageSanityData | null> {
  const raw = await sanityClient
    .fetch<RawNode | null>(HOME_PAGE_QUERY, {}, { next: { tags: ["homePage"] } })
    .catch(() => null);

  if (raw) {
    const map = (value: unknown) => ls(asLocaleString(value), locale);
    const intro = asNode(raw.intro);
    const inlineCta = asNode(raw.inlineCta);
    const tagline = asNode(raw.tagline);
    const pillars = asNode(raw.pillars);
    const differentiator = asNode(raw.differentiator);
    const faqSection = asNode(raw.faqSection);
    const contactSection = asNode(raw.contactSection);
    return {
      intro: {
        eyebrow: map(intro.eyebrow),
        title: map(intro.title),
        description: map(intro.description),
        ctaLabel: map(intro.ctaLabel),
        ctaHref: "/over-ons",
        image: "/images/about/barista-portrait.png",
      },
      inlineCta: {
        text: map(inlineCta.text),
        ctaLabel: map(inlineCta.ctaLabel),
        ctaHref: "/offerte",
      },
      tagline: {
        title: map(tagline.title),
        image: "/images/hero/hero-main.jpeg",
      },
      pillars: {
        subtitle: map(pillars.eyebrow), // Sanity field is "eyebrow", HomeContent uses "subtitle"
        title: map(pillars.title),
        items: asArray(pillars.items).map((item) => ({
          // icon is a CMS-authored enum value; trust the stored string.
          icon: (typeof item.icon === "string" ? item.icon : "") as PillarIcon,
          title: map(item.title),
          description: map(item.description),
        })),
      },
      differentiator: {
        title: map(differentiator.title),
        description: map(differentiator.description),
        features: asArray(differentiator.features).map((f) => ({
          title: map(f.title),
          description: map(f.description),
        })),
        image: "/images/hero/hero-main.jpeg",
        quote: map(differentiator.quote),
        quoteDescription: map(differentiator.quoteDescription),
        author: typeof differentiator.author === "string" ? differentiator.author : "",
        authorRole: map(differentiator.authorRole),
        portrait: "/images/about/barista-portrait.png",
      },
      faq: {
        title: map(faqSection.title),
        description: map(faqSection.description),
        ctaLabel: map(faqSection.ctaLabel),
        items: [],
      },
      contact: {
        title: map(contactSection.title),
        description: map(contactSection.description),
        labels: { office: "", email: "", phone: "", follow: "" },
        office: "",
        email: "",
        phone: "",
        socials: [],
        form: {
          labels: { name: "", email: "", phone: "", message: "" },
          placeholders: { name: "", email: "", phone: "", message: "" },
          submitLabel: "",
          thankYou: "",
        },
      },
    };
  }

  return null;
}
