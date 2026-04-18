import { defineType, defineField } from "sanity";

export const localeString = defineType({
  name: "localeString",
  type: "object",
  title: "Localized string",
  fields: [
    defineField({
      name: "nl",
      type: "string",
      title: "Nederlands",
      validation: (r) => r.required(),
    }),
    defineField({ name: "en", type: "string", title: "English", validation: (r) => r.required() }),
  ],
});
