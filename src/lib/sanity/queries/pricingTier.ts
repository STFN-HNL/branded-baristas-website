import { defineQuery } from "next-sanity";

export const PRICING_TIER_BY_CONCEPT_QUERY = defineQuery(`
  *[_type == "pricingTier" && concept->slug.nl.current == $conceptSlug]
    | order(basePriceCents asc) [0] {
    basePriceCents,
    pricePerGuestCents,
    minGuests,
    maxGuests,
    durationHours
  }
`);

export type PricingTier = {
  basePriceCents?: number;
  pricePerGuestCents?: number;
  minGuests?: number;
  maxGuests?: number;
  durationHours?: number;
};

export async function getPricingTierByConcept(conceptSlug: string): Promise<PricingTier | null> {
  const { sanityClient } = await import("../client");
  return sanityClient.fetch(
    PRICING_TIER_BY_CONCEPT_QUERY,
    { conceptSlug },
    { next: { tags: ["pricingTier"] } },
  );
}
