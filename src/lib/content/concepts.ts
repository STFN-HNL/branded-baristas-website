import { sanityClient } from "@/lib/sanity/client";
import { CONCEPTS_QUERY } from "@/lib/sanity/queries/concept";
import type { ConceptCard } from "@/content/home";
import type { Locale } from "@/lib/i18n/routing";

type RawConcept = {
  _id: string;
  category: "events" | "in-company";
  title: { nl: string; en: string };
  slug: { nl: { current: string }; en: { current: string } };
  shortDescription: { nl: string; en: string };
  hero: { url: string; alt: { nl: string; en: string } };
};

export async function getConcepts(
  locale: Locale,
  category: "events" | "in-company",
): Promise<ConceptCard[]> {
  const raw = await sanityClient
    .fetch<RawConcept[]>(CONCEPTS_QUERY, { category }, { next: { tags: ["concept"] } })
    .catch(() => null);

  if (raw && raw.length > 0) {
    return raw.map((c) => ({
      slug: c.slug?.[locale]?.current ?? c.slug?.nl?.current ?? "",
      title: c.title?.[locale] ?? c.title?.nl ?? "",
      description: c.shortDescription?.[locale] ?? c.shortDescription?.nl ?? "",
      image: c.hero?.url ?? "",
    }));
  }

  const { getHomeContent } = await import("@/content/home");
  const home = getHomeContent(locale);
  return category === "events" ? home.events.concepts : home.inCompany.concepts;
}
