import { defineType, defineField } from "sanity";

export const seo = defineType({
  name: "seo",
  type: "object",
  title: "SEO",
  fields: [
    defineField({
      name: "title",
      type: "localeString",
      description: "30–60 chars recommended",
      validation: (r) =>
        r.custom((val) => {
          if (!val) return "Required";
          const v = val as { nl?: string; en?: string };
          const okNl = v.nl && v.nl.length >= 30 && v.nl.length <= 60;
          const okEn = v.en && v.en.length >= 30 && v.en.length <= 60;
          return okNl && okEn ? true : "NL and EN titles must be 30–60 chars";
        }),
    }),
    defineField({
      name: "description",
      type: "localeString",
      description: "120–155 chars recommended",
      validation: (r) =>
        r.custom((val) => {
          if (!val) return "Required";
          const v = val as { nl?: string; en?: string };
          const okNl = v.nl && v.nl.length >= 120 && v.nl.length <= 155;
          const okEn = v.en && v.en.length >= 120 && v.en.length <= 155;
          return okNl && okEn ? true : "NL and EN descriptions must be 120–155 chars";
        }),
    }),
    defineField({ name: "ogImage", type: "image", title: "OG Image (fallback)" }),
  ],
});
