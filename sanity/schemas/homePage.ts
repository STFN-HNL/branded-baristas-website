import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  type: "document",
  title: "Home page",
  fields: [
    defineField({
      name: "intro",
      type: "object",
      title: "Intro section",
      fields: [
        defineField({ name: "eyebrow", type: "localeString", title: "Eyebrow" }),
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "description", type: "localeText", title: "Description" }),
        defineField({ name: "ctaLabel", type: "localeString", title: "CTA label" }),
      ],
    }),
    defineField({
      name: "inlineCta",
      type: "object",
      title: "Inline CTA",
      fields: [
        defineField({ name: "text", type: "localeString", title: "Text" }),
        defineField({ name: "ctaLabel", type: "localeString", title: "CTA label" }),
      ],
    }),
    defineField({
      name: "tagline",
      type: "object",
      title: "Tagline",
      fields: [defineField({ name: "title", type: "localeString", title: "Title" })],
    }),
    defineField({
      name: "pillars",
      type: "object",
      title: "Pillars section",
      fields: [
        defineField({ name: "eyebrow", type: "localeString", title: "Eyebrow" }),
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({
          name: "items",
          type: "array",
          title: "Pillars",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "icon", type: "string", title: "Icon name" }),
                defineField({ name: "title", type: "localeString", title: "Title" }),
                defineField({ name: "description", type: "localeText", title: "Description" }),
              ],
              preview: { select: { title: "title.nl" }, prepare: ({ title }) => ({ title }) },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "differentiator",
      type: "object",
      title: "Differentiator section",
      fields: [
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "description", type: "localeText", title: "Description" }),
        defineField({
          name: "features",
          type: "array",
          title: "Features",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", type: "localeString", title: "Title" }),
                defineField({ name: "description", type: "localeText", title: "Description" }),
              ],
            },
          ],
        }),
        defineField({ name: "quote", type: "localeText", title: "Quote" }),
        defineField({ name: "quoteDescription", type: "localeString", title: "Quote description" }),
        defineField({ name: "author", type: "string", title: "Author name" }),
        defineField({ name: "authorRole", type: "localeString", title: "Author role" }),
      ],
    }),
    defineField({
      name: "faqSection",
      type: "object",
      title: "FAQ section labels",
      fields: [
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "description", type: "localeText", title: "Description" }),
        defineField({ name: "ctaLabel", type: "localeString", title: "CTA label" }),
      ],
    }),
    defineField({
      name: "contactSection",
      type: "object",
      title: "Contact section labels",
      fields: [
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "description", type: "localeText", title: "Description" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
