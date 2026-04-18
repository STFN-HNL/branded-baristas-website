import { defineType, defineField } from "sanity";

export const bilingualSlug = defineType({
  name: "bilingualSlug",
  type: "object",
  title: "Bilingual slug",
  fields: [
    defineField({
      name: "nl",
      type: "slug",
      title: "NL slug",
      options: { source: "title.nl", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "en",
      type: "slug",
      title: "EN slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (r) => r.required(),
    }),
  ],
});
