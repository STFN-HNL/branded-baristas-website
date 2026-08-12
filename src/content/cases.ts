import type { Locale } from "@/lib/i18n/routing";

export type CaseItem = {
  slug: string;
  category: "events" | "in-company";
  title: string;
  client: string;
  location: string;
  guests: string;
  excerpt: string;
  image: string;
};

export type CasesContent = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    image: string;
  };
  filters: { all: string; events: string; inCompany: string };
  items: CaseItem[];
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
  };
};

// Fabricated demo cases (Adidas/ING/Heineken/…) were removed on 2026-07-10 —
// real trademarks on invented case studies are a legal and credibility risk.
// Real cases live in Sanity; this fallback stays empty on purpose.

const nl: CasesContent = {
  hero: {
    eyebrow: "Cases",
    title: "Waar we hebben gestaan, gewerkt en gebouwd",
    lead: "Een selectie van events en kantoren die we van begin tot eind hebben verzorgd. Filter per type om relevante voorbeelden te zien.",
    image: "/images/concepts/events/mobile-coffee-bar.png",
  },
  filters: { all: "Alles", events: "Events", inCompany: "In-Company" },
  items: [],
  cta: {
    title: "Wil je een case die op jouw merk lijkt?",
    description:
      "We delen graag extra details achter de schermen — setup, planning, branding en meetbare impact.",
    primaryLabel: "Neem contact op",
    primaryHref: "/contact",
  },
};

const en: CasesContent = {
  hero: {
    eyebrow: "Cases",
    title: "Where we've stood, worked and built",
    lead: "A selection of events and offices we've run from start to finish. Filter by type to find examples close to your own.",
    image: "/images/concepts/events/mobile-coffee-bar.png",
  },
  filters: { all: "All", events: "Events", inCompany: "In-Company" },
  items: [],
  cta: {
    title: "Want a case close to your brand?",
    description:
      "We'd love to share the details behind the scenes — setup, planning, branding and measurable impact.",
    primaryLabel: "Get in touch",
    primaryHref: "/contact",
  },
};

export function getCasesContent(locale: Locale): CasesContent {
  return locale === "en" ? en : nl;
}
