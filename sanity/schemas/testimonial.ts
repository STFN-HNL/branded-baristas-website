import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  type: "document",
  title: "Testimonial",
  fields: [
    defineField({ name: "quote", type: "localeText", validation: (r) => r.required() }),
    defineField({ name: "author", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "localeString" }),
    defineField({ name: "company", type: "string" }),
    defineField({ name: "avatar", type: "imageWithAlt" }),
  ],
  preview: {
    select: { title: "author", subtitle: "company", media: "avatar" },
  },
});
