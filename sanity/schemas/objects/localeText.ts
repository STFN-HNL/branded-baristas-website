import { defineType, defineField } from "sanity";

export const localeText = defineType({
  name: "localeText",
  type: "object",
  title: "Localized text",
  fields: [
    defineField({
      name: "nl",
      type: "text",
      title: "Nederlands",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "en",
      type: "text",
      title: "English",
      rows: 3,
      validation: (r) => r.required(),
    }),
  ],
});
