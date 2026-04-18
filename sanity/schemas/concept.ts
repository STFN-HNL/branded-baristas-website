import { defineType, defineField } from "sanity";

export const concept = defineType({
  name: "concept",
  type: "document",
  title: "Concept (service)",
  fields: [
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Events", value: "events" },
          { title: "In-Company", value: "in-company" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "bilingualSlug", validation: (r) => r.required() }),
    defineField({
      name: "shortDescription",
      type: "localeText",
      validation: (r) => r.required(),
    }),
    defineField({ name: "hero", type: "imageWithAlt", validation: (r) => r.required() }),
    defineField({
      name: "gallery",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({ name: "body", type: "localeBlocks" }),
    defineField({
      name: "specs",
      type: "array",
      title: "Specs",
      of: [
        {
          type: "object",
          name: "spec",
          fields: [
            { name: "label", type: "localeString" },
            { name: "value", type: "localeString" },
          ],
          preview: { select: { title: "label.nl", subtitle: "value.nl" } },
        },
      ],
    }),
    defineField({ name: "seo", type: "seo", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "title.nl", subtitle: "category", media: "hero" },
  },
});
