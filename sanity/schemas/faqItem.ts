import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  type: "document",
  title: "FAQ item",
  fields: [
    defineField({
      name: "question",
      type: "localeString",
      title: "Question",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer",
      type: "localeText",
      title: "Answer",
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", type: "number", title: "Sort order" }),
  ],
  preview: {
    select: { title: "question.nl" },
    prepare: ({ title }) => ({ title }),
  },
});
