import { defineType, defineField } from "sanity";

export const page = defineType({
  name: "page",
  type: "document",
  title: "Page",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "object",
      fields: [
        defineField({ name: "nl", type: "slug", options: { source: "title.nl" } }),
        defineField({ name: "en", type: "slug", options: { source: "title.en" } }),
      ],
    }),
    defineField({ name: "seo", type: "seo", validation: (r) => r.required() }),
  ],
});
