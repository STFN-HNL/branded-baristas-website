import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "author": author-> { name, "avatar": avatar.asset->url },
    "category": category-> { title, slug },
    "coverImage": { "url": coverImage.asset->url, "alt": coverImage.alt }
  }
`);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug[$locale].current == $slug && publishedAt <= now()][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body {
      "nl": nl[]{ ..., _type == "imageWithAlt" => { ..., "url": asset->url } },
      "en": en[]{ ..., _type == "imageWithAlt" => { ..., "url": asset->url } }
    },
    coverImage { ..., "url": asset->url },
    "author": author-> { name, role, bio, "avatar": avatar.asset->url },
    "category": category-> { title, slug },
    seo
  }
`);

type Locale = "nl" | "en";

export async function getPosts() {
  const { sanityClient } = await import("../client");
  return sanityClient.fetch(POSTS_QUERY, {}, { next: { tags: ["post"] } });
}

export async function getPostBySlug(slug: string, locale: Locale) {
  const { sanityClient } = await import("../client");
  return sanityClient.fetch(
    POST_BY_SLUG_QUERY,
    { slug, locale },
    { next: { tags: ["post", `post:${slug}`] } },
  );
}
