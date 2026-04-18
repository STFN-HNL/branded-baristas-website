import { defineType, defineField } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  type: "image",
  title: "Image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      type: "localeString",
      title: "Alt text",
      validation: (r) => r.required(),
    }),
    defineField({ name: "caption", type: "localeString", title: "Caption" }),
  ],
});
