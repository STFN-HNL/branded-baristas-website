import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  type: "document",
  title: "About page",
  fields: [
    defineField({
      name: "hero",
      type: "object",
      title: "Hero",
      fields: [
        defineField({ name: "eyebrow", type: "localeString", title: "Eyebrow" }),
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "lead", type: "localeText", title: "Lead" }),
      ],
    }),
    defineField({
      name: "story",
      type: "object",
      title: "Story section",
      fields: [
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({
          name: "paragraphs",
          type: "object",
          fields: [
            defineField({ name: "nl", type: "array", of: [{ type: "block" }], title: "NL" }),
            defineField({ name: "en", type: "array", of: [{ type: "block" }], title: "EN" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "values",
      type: "object",
      title: "Values section",
      fields: [
        defineField({ name: "eyebrow", type: "localeString", title: "Eyebrow" }),
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "description", type: "localeText", title: "Description" }),
        defineField({
          name: "items",
          type: "array",
          title: "Values",
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
      name: "cta",
      type: "object",
      title: "CTA",
      fields: [
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "description", type: "localeText", title: "Description" }),
        defineField({ name: "primaryLabel", type: "localeString", title: "Primary button label" }),
        defineField({
          name: "secondaryLabel",
          type: "localeString",
          title: "Secondary button label",
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
