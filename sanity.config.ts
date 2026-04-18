import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "branded-baristas",
  title: "Branded Baristas",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site settings")
              .child(S.document().schemaType("settings").documentId("settings")),
            S.divider(),
            S.listItem().title("Concepts").child(S.documentTypeList("concept").title("Concepts")),
            S.listItem().title("Cases").child(S.documentTypeList("case").title("Cases")),
            S.listItem().title("Blog posts").child(S.documentTypeList("post").title("Blog posts")),
            S.divider(),
            S.listItem().title("Authors").child(S.documentTypeList("author").title("Authors")),
            S.listItem()
              .title("Categories")
              .child(S.documentTypeList("category").title("Categories")),
            S.listItem()
              .title("Testimonials")
              .child(S.documentTypeList("testimonial").title("Testimonials")),
            S.listItem()
              .title("Branding options")
              .child(S.documentTypeList("brandingOption").title("Branding options")),
            S.listItem()
              .title("Pricing tiers")
              .child(S.documentTypeList("pricingTier").title("Pricing tiers")),
            S.divider(),
            S.listItem().title("Pages").child(S.documentTypeList("page").title("Pages")),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
