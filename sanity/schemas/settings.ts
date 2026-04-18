import { defineType, defineField } from "sanity";

export const settings = defineType({
  name: "settings",
  type: "document",
  title: "Site settings",
  fields: [
    defineField({ name: "siteName", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", type: "image" }),
    defineField({ name: "defaultOgImage", type: "image" }),
    defineField({
      name: "contactInfo",
      type: "object",
      fields: [
        defineField({ name: "email", type: "string" }),
        defineField({ name: "phone", type: "string" }),
        defineField({ name: "address", type: "text" }),
      ],
    }),
    defineField({
      name: "social",
      type: "object",
      fields: [
        defineField({ name: "instagram", type: "url" }),
        defineField({ name: "linkedin", type: "url" }),
      ],
    }),
  ],
});
