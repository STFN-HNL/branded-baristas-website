export type RedirectMapping = {
  source: string;
  destination: string;
  permanent: true;
};

export const redirects: RedirectMapping[] = [
  {
    source: "/coffee-concepts/piaggio-tuk-tuk",
    destination: "/nl/diensten/events/piaggio-tuk-tuk",
    permanent: true,
  },
  {
    source: "/coffee-concepts/mobile-coffee-bar",
    destination: "/nl/diensten/events/mobile-coffee-bar",
    permanent: true,
  },
  {
    source: "/coffee-concepts/vintage-coffee-truck",
    destination: "/nl/diensten/events/coffee-truck",
    permanent: true,
  },
  {
    source: "/coffee-concepts/barista-hire",
    destination: "/nl/diensten/events/barista-service",
    permanent: true,
  },
  {
    source: "/coffee-concepts/beverage-catering",
    destination: "/nl/diensten/events/barista-service",
    permanent: true,
  },
  { source: "/offerte-aanvragen", destination: "/nl/offerte", permanent: true },
  { source: "/contact", destination: "/nl/contact", permanent: true },

  // Legacy WordPress URLs that were still indexed by Google at cutover
  // (2026-07-09) and 404'd on the new site. Mapped to the closest equivalent.
  {
    source: "/mobiele-koffiebar-huren",
    destination: "/nl/diensten/events/mobile-coffee-bar",
    permanent: true,
  },
  {
    source: "/koffie-op-locatie",
    destination: "/nl/diensten/events/mobile-coffee-bar",
    permanent: true,
  },
  {
    source: "/piaggio-koffie-tuk-tuk-huren",
    destination: "/nl/diensten/events/piaggio-tuk-tuk",
    permanent: true,
  },
  {
    source: "/barista-huren-eindhoven",
    destination: "/nl/diensten/events/barista-service",
    permanent: true,
  },
  {
    source: "/barista-huren-den-haag",
    destination: "/nl/diensten/events/barista-service",
    permanent: true,
  },
  {
    source: "/barista-huren-een-onvergetelijke-koffie-ervaring",
    destination: "/nl/diensten/events/barista-service",
    permanent: true,
  },
  { source: "/koffie-concepten", destination: "/nl/diensten", permanent: true },
  { source: "/over-ons", destination: "/nl/over-ons", permanent: true },
  // /nieuws → home rather than /nl/blog: the blog is noindexed while it has
  // no real posts, and a 301 into a noindex page throws the signal away.
  { source: "/nieuws", destination: "/nl", permanent: true },
  { source: "/test", destination: "/nl", permanent: true },
  { source: "/voorbeeld-5", destination: "/nl", permanent: true },

  // Legacy EN links that used the NL slug before ADR 0003 translated slugs
  // landed. next-intl rewrites these internally, but keeping an explicit 301
  // avoids any ambiguity for external backlinks and search engines.
  { source: "/en/over-ons", destination: "/en/about", permanent: true },
  { source: "/en/diensten", destination: "/en/services", permanent: true },
  { source: "/en/offerte", destination: "/en/quote", permanent: true },
];

export function findRedirect(pathname: string): RedirectMapping | null {
  return redirects.find((r) => r.source === pathname) ?? null;
}
