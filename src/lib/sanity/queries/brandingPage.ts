import { defineQuery } from "next-sanity";

export const BRANDING_PAGE_QUERY = defineQuery(`
  *[_type == "brandingPage"][0] {
    hero,
    intro,
    process,
    cta
  }
`);
