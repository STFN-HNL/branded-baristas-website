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
    destination: "/nl/diensten/events/barista",
    permanent: true,
  },
  {
    source: "/coffee-concepts/beverage-catering",
    destination: "/nl/diensten/events/barista",
    permanent: true,
  },
  { source: "/offerte-aanvragen", destination: "/nl/offerte", permanent: true },
  { source: "/contact", destination: "/nl/contact", permanent: true },

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
