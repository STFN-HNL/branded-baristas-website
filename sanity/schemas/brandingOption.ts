import { defineType, defineField } from "sanity";

export const brandingOption = defineType({
  name: "brandingOption",
  type: "document",
  title: "Branding option",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "description", type: "localeText" }),
    defineField({ name: "image", type: "imageWithAlt" }),
    defineField({
      name: "priceModifierCents",
      type: "number",
      title: "Price modifier (EUR cents)",
      description: "Amount added to base price when selected in quote.",
      validation: (r) => r.required().min(0),
    }),
  ],
  preview: { select: { title: "title.nl", subtitle: "priceModifierCents" } },
});
