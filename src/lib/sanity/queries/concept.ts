import { defineQuery } from "next-sanity";

export const CONCEPTS_QUERY = defineQuery(`
  *[_type == "concept" && (!defined($category) || category == $category)] | order(title.nl asc) {
    _id,
    category,
    title,
    slug,
    shortDescription,
    "hero": { "url": hero.asset->url, "alt": hero.alt }
  }
`);

export const CONCEPT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "concept" && slug[$locale].current == $slug][0] {
    _id,
    category,
    title,
    slug,
    shortDescription,
    hero { ..., "url": asset->url },
    gallery[] { ..., "url": asset->url },
    body {
      "nl": nl[]{ ..., _type == "imageWithAlt" => { ..., "url": asset->url } },
      "en": en[]{ ..., _type == "imageWithAlt" => { ..., "url": asset->url } }
    },
    specs,
    seo
  }
`);

type Locale = "nl" | "en";
type Category = "events" | "in-company";

export async function getConcepts(params: { category?: Category } = {}) {
  const { sanityClient } = await import("../client");
  return sanityClient.fetch(
    CONCEPTS_QUERY,
    { category: params.category ?? null },
    { next: { tags: ["concept"] } },
  );
}

export async function getConceptBySlug(slug: string, locale: Locale) {
  const { sanityClient } = await import("../client");
  return sanityClient.fetch(
    CONCEPT_BY_SLUG_QUERY,
    { slug, locale },
    { next: { tags: ["concept", `concept:${slug}`] } },
  );
}
