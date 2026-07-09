import { defineType, defineField } from "sanity";

/**
 * Callout block — a highlighted note inside rich text.
 * Tone drives the colour treatment in the frontend renderer.
 */
export const callout = defineType({
  name: "callout",
  type: "object",
  title: "Callout",
  fields: [
    defineField({
      name: "tone",
      type: "string",
      title: "Tone",
      options: {
        list: [
          { title: "Info (pine)", value: "info" },
          { title: "Accent (copper)", value: "accent" },
          { title: "Highlight (amber)", value: "highlight" },
        ],
        layout: "radio",
      },
      initialValue: "info",
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", type: "localeString", title: "Title" }),
    defineField({
      name: "text",
      type: "localeText",
      title: "Text",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "title.nl", subtitle: "text.nl", tone: "tone" },
    prepare({ title, subtitle, tone }) {
      return {
        title: title || subtitle || "Callout",
        subtitle: `Callout · ${tone ?? "info"}`,
      };
    },
  },
});
