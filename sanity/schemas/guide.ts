import { defineField, defineType } from "sanity";

export const guide = defineType({
  name: "guide",
  type: "document",
  title: "Guide",
  fields: [
    defineField({
      name: "title",
      type: "localeString",
      title: "Title",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "bilingualSlug",
      title: "Slug",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "lead",
      type: "localeText",
      title: "Lead",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "intro",
      type: "object",
      title: "Intro paragraphs",
      fields: [
        defineField({ name: "nl", type: "array", of: [{ type: "block" }], title: "NL" }),
        defineField({ name: "en", type: "array", of: [{ type: "block" }], title: "EN" }),
      ],
    }),
    defineField({
      name: "sections",
      type: "array",
      title: "Sections",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "id", type: "string", title: "Anchor ID (stable, no spaces)" }),
            defineField({ name: "heading", type: "localeString", title: "Heading" }),
            defineField({
              name: "body",
              type: "object",
              fields: [
                defineField({ name: "nl", type: "array", of: [{ type: "block" }], title: "NL" }),
                defineField({ name: "en", type: "array", of: [{ type: "block" }], title: "EN" }),
              ],
            }),
          ],
          preview: { select: { title: "heading.nl" }, prepare: ({ title }) => ({ title }) },
        },
      ],
    }),
    defineField({
      name: "cta",
      type: "object",
      title: "CTA",
      fields: [
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "description", type: "localeText", title: "Description" }),
        defineField({ name: "label", type: "localeString", title: "Button label" }),
      ],
    }),
    defineField({ name: "updatedAt", type: "date", title: "Last updated" }),
    defineField({ name: "readingTimeMinutes", type: "number", title: "Reading time (minutes)" }),
    defineField({ name: "seo", type: "seo", title: "SEO" }),
  ],
  preview: {
    select: { title: "title.nl", slug: "slug.nl.current" },
    prepare: ({ title, slug }) => ({ title, subtitle: `/${slug}` }),
  },
});
