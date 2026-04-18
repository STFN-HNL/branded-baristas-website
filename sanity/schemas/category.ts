import { defineType, defineField } from "sanity";

export const category = defineType({
  name: "category",
  type: "document",
  title: "Blog category",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "bilingualSlug",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "title.nl" } },
});
