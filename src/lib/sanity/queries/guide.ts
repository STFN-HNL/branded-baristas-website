import { defineQuery } from "next-sanity";

export const GUIDES_LIST_QUERY = defineQuery(`
  *[_type == "guide"] | order(title.nl asc) {
    _id,
    title,
    slug,
    lead,
    readingTimeMinutes
  }
`);

export const GUIDE_QUERY = defineQuery(`
  *[_type == "guide" && slug[$locale].current == $slug][0] {
    _id,
    title,
    slug,
    lead,
    intro,
    sections[] {
      id,
      heading,
      body
    },
    cta,
    updatedAt,
    readingTimeMinutes,
    seo
  }
`);
