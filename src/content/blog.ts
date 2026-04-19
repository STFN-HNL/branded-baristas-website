import type { Locale } from "@/lib/i18n/routing";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readingTime: string;
  image: string;
  featured?: boolean;
};

export type BlogContent = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    image: string;
  };
  categories: string[];
  featuredLabel: string;
  readingTimeSuffix: string;
  readMoreLabel: string;
  posts: BlogPost[];
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    submit: string;
  };
};

const postsNl: BlogPost[] = [
  {
    slug: "specialty-vs-commodity",
    title: "Waarom specialty koffie écht verschil maakt",
    excerpt:
      "De helft van de bedrijven zegt dat ze 'goede koffie' serveren. Wat betekent dat eigenlijk — en waarom is specialty een andere wereld?",
    category: "Specialty",
    author: "Team Branded Baristas",
    date: "2026-04-14",
    readingTime: "6",
    image: "/images/concepts/in-company/espresso-bar.png",
    featured: true,
  },
  {
    slug: "coffee-at-brand-activations",
    title: "Vier regels voor koffie op een brand activation",
    excerpt:
      "Koffie bij activations werkt alleen als het past bij het merk, de flow en het moment. Onze checklist om het goed te krijgen.",
    category: "Events",
    author: "Team Branded Baristas",
    date: "2026-04-07",
    readingTime: "4",
    image: "/images/concepts/events/piaggio-tuk-tuk.png",
  },
  {
    slug: "designing-the-espresso-routine",
    title: "Een espresso routine die je kantoor draagt",
    excerpt:
      "Hoe we een dagelijkse koffiesetup ontwerpen die traffic aankan, cultuur versterkt en geen facility-headache wordt.",
    category: "In-Company",
    author: "Team Branded Baristas",
    date: "2026-03-28",
    readingTime: "7",
    image: "/images/concepts/in-company/executive.png",
  },
  {
    slug: "branded-cups-guide",
    title: "Branded cups: wanneer wel, wanneer niet",
    excerpt:
      "Branded cups voelen premium — tot ze op de grond liggen. Een eerlijke gids over wanneer ze werken en wanneer niet.",
    category: "Branding",
    author: "Team Branded Baristas",
    date: "2026-03-21",
    readingTime: "5",
    image: "/images/concepts/events/mobile-coffee-bar.png",
  },
  {
    slug: "milk-ratios-explained",
    title: "Melk-ratio's, getemd voor baristas",
    excerpt:
      "Een korte uitleg over waarom flat white, cappuccino en latte niet gewoon 'grootte' zijn — en hoe je team het uitlegt.",
    category: "Specialty",
    author: "Team Branded Baristas",
    date: "2026-03-14",
    readingTime: "3",
    image: "/images/concepts/in-company/pop-up.png",
  },
  {
    slug: "event-coffee-logistics",
    title: "Logistiek voor event-koffie zonder chaos",
    excerpt:
      "Timing, power, water, waste. Wat we inpakken — en waarom een goed plan het verschil maakt tussen 200 en 2.000 koffies.",
    category: "Events",
    author: "Team Branded Baristas",
    date: "2026-03-07",
    readingTime: "6",
    image: "/images/concepts/events/vintage-truck.png",
  },
];

const postsEn: BlogPost[] = [
  {
    slug: "specialty-vs-commodity",
    title: "Why specialty coffee actually makes a difference",
    excerpt:
      "Half the companies say they serve 'good coffee'. What does that mean — and why is specialty a different world?",
    category: "Specialty",
    author: "Team Branded Baristas",
    date: "2026-04-14",
    readingTime: "6",
    image: "/images/concepts/in-company/espresso-bar.png",
    featured: true,
  },
  {
    slug: "coffee-at-brand-activations",
    title: "Four rules for coffee at a brand activation",
    excerpt:
      "Coffee at activations only works when it fits the brand, the flow and the moment. Our checklist to get it right.",
    category: "Events",
    author: "Team Branded Baristas",
    date: "2026-04-07",
    readingTime: "4",
    image: "/images/concepts/events/piaggio-tuk-tuk.png",
  },
  {
    slug: "designing-the-espresso-routine",
    title: "An espresso routine that carries your office",
    excerpt:
      "How we design a daily coffee setup that handles traffic, lifts culture and doesn't become a facility headache.",
    category: "In-Company",
    author: "Team Branded Baristas",
    date: "2026-03-28",
    readingTime: "7",
    image: "/images/concepts/in-company/executive.png",
  },
  {
    slug: "branded-cups-guide",
    title: "Branded cups: when yes, when no",
    excerpt:
      "Branded cups feel premium — until they're on the floor. An honest guide to when they work and when they don't.",
    category: "Branding",
    author: "Team Branded Baristas",
    date: "2026-03-21",
    readingTime: "5",
    image: "/images/concepts/events/mobile-coffee-bar.png",
  },
  {
    slug: "milk-ratios-explained",
    title: "Milk ratios, explained for baristas",
    excerpt:
      "A short take on why flat white, cappuccino and latte aren't just 'size' — and how your team can explain it.",
    category: "Specialty",
    author: "Team Branded Baristas",
    date: "2026-03-14",
    readingTime: "3",
    image: "/images/concepts/in-company/pop-up.png",
  },
  {
    slug: "event-coffee-logistics",
    title: "Event coffee logistics without the chaos",
    excerpt:
      "Timing, power, water, waste. What we pack — and why a good plan makes the difference between 200 and 2,000 coffees.",
    category: "Events",
    author: "Team Branded Baristas",
    date: "2026-03-07",
    readingTime: "6",
    image: "/images/concepts/events/vintage-truck.png",
  },
];

const nl: BlogContent = {
  hero: {
    eyebrow: "Blog",
    title: "Korte stukken over koffie, hospitality en merkmomenten",
    lead: "Wat we leren onderweg. Elke week een kort artikel over specialty, branding, events en in-company setups.",
    image: "/images/hero/hero-main.png",
  },
  categories: ["Alles", "Specialty", "Events", "In-Company", "Branding"],
  featuredLabel: "Uitgelicht",
  readingTimeSuffix: "min lezen",
  readMoreLabel: "Lees verder",
  posts: postsNl,
  newsletter: {
    title: "Wekelijks een stuk in je inbox",
    description:
      "Één korte update per week. Geen spam, geen cross-promotie — alleen wat we zelf interessant vinden.",
    placeholder: "jouw@email.com",
    submit: "Aanmelden",
  },
};

const en: BlogContent = {
  hero: {
    eyebrow: "Blog",
    title: "Short pieces on coffee, hospitality and brand moments",
    lead: "What we're learning along the way. One short article a week on specialty, branding, events and in-company setups.",
    image: "/images/hero/hero-main.png",
  },
  categories: ["All", "Specialty", "Events", "In-Company", "Branding"],
  featuredLabel: "Featured",
  readingTimeSuffix: "min read",
  readMoreLabel: "Read more",
  posts: postsEn,
  newsletter: {
    title: "One piece a week in your inbox",
    description:
      "One short update per week. No spam, no cross-promotion — just what we find interesting ourselves.",
    placeholder: "you@email.com",
    submit: "Subscribe",
  },
};

export function getBlogContent(locale: Locale): BlogContent {
  return locale === "en" ? en : nl;
}
