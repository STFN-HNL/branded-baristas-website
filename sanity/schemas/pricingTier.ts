import { defineType, defineField } from "sanity";

export const pricingTier = defineType({
  name: "pricingTier",
  type: "document",
  title: "Pricing tier",
  fields: [
    defineField({
      name: "concept",
      type: "reference",
      to: [{ type: "concept" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "basePriceCents",
      type: "number",
      title: "Base price (EUR cents)",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "pricePerGuestCents",
      type: "number",
      title: "Price per guest (EUR cents)",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "minGuests",
      type: "number",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "maxGuests",
      type: "number",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "durationHours",
      type: "number",
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { concept: "concept.title.nl", base: "basePriceCents" },
    prepare: ({ concept, base }) => ({
      title: concept ?? "(no concept)",
      subtitle: base != null ? `€${(base / 100).toFixed(2)} base` : "",
    }),
  },
});
