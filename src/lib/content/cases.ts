import { sanityClient } from "@/lib/sanity/client";
import { CASES_QUERY } from "@/lib/sanity/queries/case";
import type { CaseItem } from "@/content/cases";
import type { Locale } from "@/lib/i18n/routing";

type RawCase = {
  _id: string;
  category: "events" | "in-company";
  title: { nl: string; en: string };
  slug: { nl: { current: string }; en: { current: string } };
  client: string;
  location: string;
  guestCount: number;
  hero: { url: string; alt: { nl: string; en: string } };
};

export async function getCasesList(locale: Locale): Promise<CaseItem[]> {
  const raw = await sanityClient
    .fetch<RawCase[]>(CASES_QUERY, { category: null }, { next: { tags: ["case"] } })
    .catch(() => null);

  if (raw && raw.length > 0) {
    return raw.map((c) => ({
      slug: c.slug?.[locale]?.current ?? c.slug?.nl?.current ?? "",
      category: c.category,
      title: c.title?.[locale] ?? c.title?.nl ?? "",
      client: c.client ?? "",
      location: c.location ?? "",
      guests: String(c.guestCount ?? ""),
      excerpt: "",
      image: c.hero?.url ?? "",
    }));
  }

  const { getCasesContent } = await import("@/content/cases");
  return getCasesContent(locale).items;
}
