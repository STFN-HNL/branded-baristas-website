import { defineQuery } from "next-sanity";

export const FAQ_ITEMS_QUERY = defineQuery(`
  *[_type == "faqItem"] | order(order asc) {
    _id,
    question,
    answer
  }
`);
