import { defineType, defineField } from "sanity";

/**
 * Call-to-action block — a heading, optional text, and a button inside rich text.
 * Internal links should be locale-relative paths (e.g. "/offerte"); external
 * links a full URL.
 */
export const ctaBlock = defineType({
  name: "ctaBlock",
  type: "object",
  title: "Call to action",
  fields: [
    defineField({
      name: "heading",
      type: "localeString",
      title: "Heading",
      validation: (r) => r.required(),
    }),
    defineField({ name: "text", type: "localeText", title: "Text" }),
    defineField({
      name: "label",
      type: "localeString",
      title: "Button label",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      type: "string",
      title: "Button link",
      description: "Internal path (e.g. /offerte) or full URL for external links.",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "heading.nl", subtitle: "href" },
    prepare({ title, subtitle }) {
      return { title: title || "Call to action", subtitle: `CTA · ${subtitle ?? ""}` };
    },
  },
});
