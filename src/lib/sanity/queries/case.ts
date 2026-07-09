import { defineQuery } from "next-sanity";

export const CASES_QUERY = defineQuery(`
  *[_type == "case" && (!defined($category) || category == $category)] | order(eventDate desc) {
    _id,
    category,
    title,
    slug,
    client,
    eventDate,
    location,
    guestCount,
    "hero": { "url": hero.asset->url, "alt": hero.alt }
  }
`);

export const CASE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "case" && slug[$locale].current == $slug][0] {
    _id,
    category,
    title,
    slug,
    client,
    eventDate,
    location,
    guestCount,
    hero { ..., "url": asset->url },
    gallery[] { ..., "url": asset->url },
    "conceptsUsed": conceptsUsed[]-> { _id, title, slug, category },
    "testimonial": testimonial-> { quote, author, role, company },
    story {
      "nl": nl[]{ ..., _type == "imageWithAlt" => { ..., "url": asset->url } },
      "en": en[]{ ..., _type == "imageWithAlt" => { ..., "url": asset->url } }
    },
    seo
  }
`);

type Locale = "nl" | "en";
type Category = "events" | "in-company";

export async function getCases(params: { category?: Category } = {}) {
  const { sanityClient } = await import("../client");
  return sanityClient.fetch(
    CASES_QUERY,
    { category: params.category ?? null },
    { next: { tags: ["case"] } },
  );
}

export async function getCaseBySlug(slug: string, locale: Locale) {
  const { sanityClient } = await import("../client");
  return sanityClient.fetch(
    CASE_BY_SLUG_QUERY,
    { slug, locale },
    { next: { tags: ["case", `case:${slug}`] } },
  );
}
