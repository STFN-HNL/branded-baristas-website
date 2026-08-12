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

// The six generic demo posts were removed on 2026-07-10; they were filler
// content reusing concept stock images. Real posts live in Sanity and this
// fallback stays empty on purpose.

const nl: BlogContent = {
  hero: {
    eyebrow: "Blog",
    title: "Korte stukken over koffie, hospitality en merkmomenten",
    lead: "Wat we leren onderweg. Elke week een kort artikel over specialty, branding, events en in-company setups.",
    image: "/images/concepts/in-company/espresso-bar.png",
  },
  categories: ["Alles", "Specialty", "Events", "In-Company", "Branding"],
  featuredLabel: "Uitgelicht",
  readingTimeSuffix: "min lezen",
  readMoreLabel: "Lees verder",
  posts: [],
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
    image: "/images/concepts/in-company/espresso-bar.png",
  },
  categories: ["All", "Specialty", "Events", "In-Company", "Branding"],
  featuredLabel: "Featured",
  readingTimeSuffix: "min read",
  readMoreLabel: "Read more",
  posts: [],
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
