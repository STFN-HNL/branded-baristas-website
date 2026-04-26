import { defineQuery } from "next-sanity";

export const TRUST_ROW_TESTIMONIAL_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(_createdAt asc) [0] {
    _id,
    quote,
    author,
    role,
    company
  }
`);
