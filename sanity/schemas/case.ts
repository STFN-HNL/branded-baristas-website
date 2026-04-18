import { defineType, defineField } from "sanity";

export const caseStudy = defineType({
  name: "case",
  type: "document",
  title: "Case",
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
    defineField({ name: "client", type: "string", validation: (r) => r.required() }),
    defineField({ name: "eventDate", type: "date" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "guestCount", type: "number" }),
    defineField({
      name: "conceptsUsed",
      type: "array",
      of: [{ type: "reference", to: [{ type: "concept" }] }],
    }),
    defineField({ name: "hero", type: "imageWithAlt", validation: (r) => r.required() }),
    defineField({
      name: "gallery",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({
      name: "testimonial",
      type: "reference",
      to: [{ type: "testimonial" }],
    }),
    defineField({ name: "story", type: "localeBlocks" }),
    defineField({ name: "seo", type: "seo", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "title.nl", subtitle: "client", media: "hero" },
  },
  orderings: [
    {
      title: "Event date, newest",
      name: "eventDateDesc",
      by: [{ field: "eventDate", direction: "desc" }],
    },
  ],
});
