import { defineQuery } from "next-sanity";

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0] {
    hero,
    story,
    values,
    cta
  }
`);
