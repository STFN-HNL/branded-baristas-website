import { defineType, defineField } from "sanity";

export const post = defineType({
  name: "post",
  type: "document",
  title: "Blog post",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "bilingualSlug", validation: (r) => r.required() }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "excerpt",
      type: "localeText",
      validation: (r) => r.required(),
    }),
    defineField({ name: "coverImage", type: "imageWithAlt" }),
    defineField({ name: "body", type: "localeBlocks", validation: (r) => r.required() }),
    defineField({ name: "seo", type: "seo", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "title.nl", subtitle: "publishedAt", media: "coverImage" },
  },
  orderings: [
    {
      title: "Published, newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
