import { defineType, defineField } from "sanity";

const bodyField = (name: "nl" | "en", title: string) =>
  defineField({
    name,
    type: "array",
    title,
    of: [
      {
        type: "block",
        styles: [
          { title: "Normal", value: "normal" },
          { title: "H2", value: "h2" },
          { title: "H3", value: "h3" },
          { title: "Quote", value: "blockquote" },
        ],
        lists: [
          { title: "Bullet", value: "bullet" },
          { title: "Numbered", value: "number" },
        ],
        marks: {
          decorators: [
            { title: "Strong", value: "strong" },
            { title: "Emphasis", value: "em" },
          ],
          annotations: [
            {
              name: "link",
              type: "object",
              title: "Link",
              fields: [
                { name: "href", type: "url", title: "URL" },
                { name: "newTab", type: "boolean", title: "Open in new tab" },
              ],
            },
          ],
        },
      },
      { type: "imageWithAlt" },
      { type: "callout" },
      { type: "ctaBlock" },
    ],
    validation: (r) => r.required().min(1),
  });

export const localeBlocks = defineType({
  name: "localeBlocks",
  type: "object",
  title: "Localized rich text",
  fields: [bodyField("nl", "Nederlands"), bodyField("en", "English")],
});
