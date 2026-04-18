import { defineType, defineField } from "sanity";

export const author = defineType({
  name: "author",
  type: "document",
  title: "Author",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "localeString" }),
    defineField({ name: "bio", type: "localeText" }),
    defineField({ name: "avatar", type: "imageWithAlt" }),
  ],
  preview: {
    select: { title: "name", subtitle: "role.nl", media: "avatar" },
  },
});
