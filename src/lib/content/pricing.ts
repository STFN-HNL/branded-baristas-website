import { getPricingTierByConcept } from "@/lib/sanity/queries/pricingTier";

/**
 * "From" price for a concept, in whole euros, or null when no pricing tier is
 * published in Sanity. Detail pages only render a price line when this
 * returns a value, so no invented amounts can ship: prices appear as soon as
 * Stefan enters real day rates as `pricingTier` documents in the Studio.
 */
export async function getFromPriceEuros(conceptSlug: string): Promise<number | null> {
  const tier = await getPricingTierByConcept(conceptSlug).catch(() => null);
  const cents = tier?.basePriceCents;
  if (typeof cents !== "number" || cents <= 0) return null;
  return Math.round(cents / 100);
}
