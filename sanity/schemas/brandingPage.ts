import { defineField, defineType } from "sanity";

export const brandingPage = defineType({
  name: "brandingPage",
  type: "document",
  title: "Branding page",
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
      name: "intro",
      type: "object",
      title: "Intro",
      fields: [
        defineField({ name: "eyebrow", type: "localeString", title: "Eyebrow" }),
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "description", type: "localeText", title: "Description" }),
      ],
    }),
    defineField({
      name: "process",
      type: "object",
      title: "Process section",
      fields: [
        defineField({ name: "eyebrow", type: "localeString", title: "Eyebrow" }),
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "description", type: "localeText", title: "Description" }),
        defineField({
          name: "steps",
          type: "array",
          title: "Steps",
          of: [
            {
              type: "object",
              fields: [
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
  preview: { prepare: () => ({ title: "Branding page" }) },
});
