import { sanityClient } from "@/lib/sanity/client";
import { HOME_PAGE_QUERY } from "@/lib/sanity/queries/homePage";
import type { HomeContent } from "@/content/home";
import type { Locale } from "@/lib/i18n/routing";

type HomePageSanityData = Pick<
  HomeContent,
  "intro" | "inlineCta" | "tagline" | "pillars" | "differentiator" | "faq" | "contact"
>;

function ls(obj: { nl: string; en: string } | null | undefined, locale: Locale): string {
  if (!obj) return "";
  return obj[locale] ?? obj.nl ?? "";
}

export async function getHomePageContent(locale: Locale): Promise<HomePageSanityData | null> {
  const raw = await sanityClient
    .fetch<Record<string, unknown> | null>(HOME_PAGE_QUERY, {}, { next: { tags: ["homePage"] } })
    .catch(() => null);

  if (raw) {
    const map = (obj: { nl: string; en: string } | null | undefined) => ls(obj, locale);
    return {
      intro: {
        eyebrow: map((raw.intro as any)?.eyebrow),
        title: map((raw.intro as any)?.title),
        description: map((raw.intro as any)?.description),
        ctaLabel: map((raw.intro as any)?.ctaLabel),
        ctaHref: "/over-ons",
        image: "/images/about/barista-portrait.png",
      },
      inlineCta: {
        text: map((raw.inlineCta as any)?.text),
        ctaLabel: map((raw.inlineCta as any)?.ctaLabel),
        ctaHref: "/offerte",
      },
      tagline: {
        title: map((raw.tagline as any)?.title),
        image: "/images/hero/tagline-bg.jpg",
      },
      pillars: {
        subtitle: map((raw.pillars as any)?.eyebrow), // Sanity field is "eyebrow", HomeContent uses "subtitle"
        title: map((raw.pillars as any)?.title),
        items: ((raw.pillars as any)?.items ?? []).map((item: any) => ({
          icon: item.icon ?? "",
          title: map(item.title),
          description: map(item.description),
        })),
      },
      differentiator: {
        title: map((raw.differentiator as any)?.title),
        description: map((raw.differentiator as any)?.description),
        features: ((raw.differentiator as any)?.features ?? []).map((f: any) => ({
          title: map(f.title),
          description: map(f.description),
        })),
        image: "/images/differentiator/bg.jpg",
        quote: map((raw.differentiator as any)?.quote),
        quoteDescription: map((raw.differentiator as any)?.quoteDescription),
        author: (raw.differentiator as any)?.author ?? "",
        authorRole: map((raw.differentiator as any)?.authorRole),
        portrait: "/images/differentiator/portrait.jpg",
      },
      faq: {
        title: map((raw.faqSection as any)?.title),
        description: map((raw.faqSection as any)?.description),
        ctaLabel: map((raw.faqSection as any)?.ctaLabel),
        items: [],
      },
      contact: {
        title: map((raw.contactSection as any)?.title),
        description: map((raw.contactSection as any)?.description),
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
