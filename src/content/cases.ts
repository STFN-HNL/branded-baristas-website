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

const cases = (locale: Locale): CaseItem[] => {
  const isEn = locale === "en";
  return [
    {
      slug: "adidas-launch-berlin",
      category: "events",
      title: isEn
        ? "Brand launch moment for a running release"
        : "Brand launch moment voor een running release",
      client: "Adidas",
      location: "Berlin",
      guests: "450",
      excerpt: isEn
        ? "A two-day press activation with branded cups, latte art and a custom tuk-tuk setup at the launch arena."
        : "Tweedaagse pers-activation met branded cups, latte art en een custom tuk-tuk setup op de launch arena.",
      image: "/images/concepts/events/piaggio-tuk-tuk.png",
    },
    {
      slug: "ing-hq-rotterdam",
      category: "in-company",
      title: isEn
        ? "Daily espresso bar for 1.200 employees"
        : "Dagelijkse espresso bar voor 1.200 medewerkers",
      client: "ING",
      location: "Rotterdam",
      guests: "1.200",
      excerpt: isEn
        ? "A permanent barista-staffed bar in the main lobby, calibrated to handle morning rush with specialty quality."
        : "Een vaste barista-bar in de main lobby, afgesteld op de ochtendpiek met specialty kwaliteit.",
      image: "/images/concepts/in-company/espresso-bar.png",
    },
    {
      slug: "dutch-design-week",
      category: "events",
      title: isEn
        ? "Pop-up café on the Design Week floor"
        : "Pop-up café op de Design Week vloer",
      client: "Dutch Design Week",
      location: "Eindhoven",
      guests: "3.800",
      excerpt: isEn
        ? "Five-day mobile coffee bar designed to echo the expo identity, serving visitors and exhibitors alike."
        : "Vijfdaagse mobiele koffiebar in lijn met de expo-identiteit — voor bezoekers én exposanten.",
      image: "/images/concepts/events/mobile-coffee-bar.png",
    },
    {
      slug: "bcg-executive-breakfast",
      category: "in-company",
      title: isEn
        ? "Executive breakfast service, zero disruption"
        : "Executive breakfast service, zonder verstoring",
      client: "BCG",
      location: "Amsterdam",
      guests: "80",
      excerpt: isEn
        ? "A monthly executive moment with quiet hospitality, tailored beans and seamless setup before 07:30."
        : "Maandelijks executive moment met stille hospitality, eigen bonen en naadloze setup voor 07:30.",
      image: "/images/concepts/in-company/executive.png",
    },
    {
      slug: "heineken-summer-series",
      category: "events",
      title: isEn
        ? "Summer festival with vintage truck"
        : "Zomerfestival met vintage truck",
      client: "Heineken",
      location: "Amsterdam",
      guests: "2.400",
      excerpt: isEn
        ? "A full summer series of activations built around a restored vintage truck and branded takeaway cups."
        : "Een volledige zomerserie activaties rondom een gerestaureerde vintage truck en branded takeaway cups.",
      image: "/images/concepts/events/vintage-truck.png",
    },
    {
      slug: "philips-innovation-hub",
      category: "in-company",
      title: isEn
        ? "Weekly pop-up in the innovation hub"
        : "Wekelijkse pop-up in de innovation hub",
      client: "Philips",
      location: "Eindhoven",
      guests: "150",
      excerpt: isEn
        ? "Rotating pop-up moment designed to spark conversation between teams without disrupting the floor."
        : "Roterend pop-up moment ontworpen om gesprekken tussen teams te starten zonder de vloer te verstoren.",
      image: "/images/concepts/in-company/pop-up.png",
    },
  ];
};

const nl: CasesContent = {
  hero: {
    eyebrow: "Cases",
    title: "Waar we hebben gestaan, gewerkt en gebouwd",
    lead: "Een selectie van events en kantoren die we van begin tot eind hebben verzorgd. Filter per type om relevante voorbeelden te zien.",
    image: "/images/concepts/events/mobile-coffee-bar.png",
  },
  filters: { all: "Alles", events: "Events", inCompany: "In-Company" },
  items: cases("nl"),
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
  items: cases("en"),
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
