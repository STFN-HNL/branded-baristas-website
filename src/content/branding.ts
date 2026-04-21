import type { Locale } from "@/lib/i18n/routing";

export type BrandingContent = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    image: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    description: string;
  };
  options: {
    title: string;
    description: string;
    items: { title: string; description: string; image: string }[];
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    steps: { number: string; title: string; description: string }[];
  };
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
};

const nl: BrandingContent = {
  hero: {
    eyebrow: "Branding",
    title: "Volledig branded koffiemomenten — ontworpen voor jouw merk",
    lead: "Van cup tot set, van latte art tot uniform. We ontwerpen elke touchpoint rondom jouw identiteit, zodat het koffiemoment voelt alsof het altijd bij je merk hoorde.",
    image: "/images/concepts/events/vintage-truck.png",
  },
  intro: {
    eyebrow: "Branding",
    title: "Een koffiemoment dat aanvoelt als jouw merk",
    description:
      "De meeste koffiecaterings plakken een logo op een cup en noemen het branded. Wij niet. We beginnen bij het merkmoment: hoe voelt het aan, welke kleuren horen erbij, wat zeggen onze baristas, hoe ziet de bar eruit? Alles wordt ontworpen voordat de eerste shot wordt getrokken.",
  },
  options: {
    title: "Wat we kunnen branden",
    description:
      "Elke setup kan helemaal of gedeeltelijk gebrand worden. Kies wat past bij je budget en ambitie.",
    items: [
      {
        title: "Cups en sleeves",
        description:
          "Custom print op cups, sleeves of zelfs geëmbosseerde handgrepen. Van subtiele logo's tot full bleed.",
        image: "/images/concepts/events/mobile-coffee-bar.png",
      },
      {
        title: "Latte art",
        description:
          "Logo's, patronen of custom art op elke cappuccino of flat white. Onze baristas oefenen vooraf op jouw asset.",
        image: "/images/concepts/in-company/espresso-bar.png",
      },
      {
        title: "Bar styling",
        description:
          "Stoffen, hout, kleuren en props die passen bij je brand. Van minimal monochrome tot volle brand activation.",
        image: "/images/concepts/events/vintage-truck.png",
      },
      {
        title: "Barista uniforms",
        description:
          "Custom schorten, shirts of complete uitrusting in jouw merkkleuren. Klassieker dan een bedrukte giveaway.",
        image: "/images/concepts/in-company/executive.png",
      },
      {
        title: "Signage en menu's",
        description:
          "Geprinte menu's, staande borden, chalkboard lettering of digitale displays — in de juiste toon en typografie.",
        image: "/images/concepts/in-company/pop-up.png",
      },
      {
        title: "Custom drinks",
        description:
          "Een signature drink met jouw naam — van seasonal blends tot volledig nieuwe recepten. Getest, benoemd en gelanceerd.",
        image: "/images/concepts/events/piaggio-tuk-tuk.png",
      },
    ],
  },
  process: {
    eyebrow: "Proces",
    title: "Hoe we het aanpakken",
    description:
      "We werken in vier fases — van eerste gesprek tot live moment. Transparant, snel en zonder verrassingen.",
    steps: [
      {
        number: "01",
        title: "Intake",
        description:
          "We starten met een kort gesprek over merk, moment en ambitie. Wat is het doel, wie is de gast, wat moet blijven hangen?",
      },
      {
        number: "02",
        title: "Design",
        description:
          "We leveren een moodboard + concept. Cups, latte art, bar styling, uniforms — alles in één voorstel.",
      },
      {
        number: "03",
        title: "Productie",
        description:
          "Na akkoord produceren we alle branded materialen. Tijd: meestal 2-3 weken, sneller kan tegen een spoedtoeslag.",
      },
      {
        number: "04",
        title: "Uitvoering",
        description:
          "Op de dag zelf draaien we setup, service en afbouw. Jij hoeft niets te doen — behalve genieten.",
      },
    ],
  },
  cta: {
    title: "Klaar voor een koffiemoment dat aanvoelt als jouw merk?",
    description:
      "Vraag een indicatieve offerte aan of stuur ons een bericht met wat je in gedachten hebt.",
    primaryLabel: "Offerte aanvragen",
    primaryHref: "/offerte",
    secondaryLabel: "Neem contact op",
    secondaryHref: "/contact",
  },
};

const en: BrandingContent = {
  hero: {
    eyebrow: "Branding",
    title: "Fully branded coffee moments — designed for your brand",
    lead: "From cup to setup, from latte art to uniform. We design every touchpoint around your identity, so the coffee moment feels like it always belonged to your brand.",
    image: "/images/concepts/events/vintage-truck.png",
  },
  intro: {
    eyebrow: "Branding",
    title: "A coffee moment that feels like your brand",
    description:
      "Most coffee caterers slap a logo on a cup and call it branded. We don't. We start with the brand moment: how should it feel, what colours belong, what do our baristas say, how should the bar look? Everything is designed before the first shot is pulled.",
  },
  options: {
    title: "What we can brand",
    description:
      "Every setup can be fully or partially branded. Pick what fits your budget and ambition.",
    items: [
      {
        title: "Cups and sleeves",
        description:
          "Custom print on cups, sleeves or even embossed handles. From subtle logos to full bleed.",
        image: "/images/concepts/events/mobile-coffee-bar.png",
      },
      {
        title: "Latte art",
        description:
          "Logos, patterns or custom art on every cappuccino or flat white. Our baristas practise on your asset beforehand.",
        image: "/images/concepts/in-company/espresso-bar.png",
      },
      {
        title: "Bar styling",
        description:
          "Fabrics, wood, colours and props that match your brand. From minimal monochrome to full brand activation.",
        image: "/images/concepts/events/vintage-truck.png",
      },
      {
        title: "Barista uniforms",
        description:
          "Custom aprons, shirts or complete outfits in your brand colours. Classier than a printed giveaway.",
        image: "/images/concepts/in-company/executive.png",
      },
      {
        title: "Signage and menus",
        description:
          "Printed menus, standing boards, chalkboard lettering or digital displays — in the right tone and typography.",
        image: "/images/concepts/in-company/pop-up.png",
      },
      {
        title: "Custom drinks",
        description:
          "A signature drink with your name — from seasonal blends to fully new recipes. Tested, named and launched.",
        image: "/images/concepts/events/piaggio-tuk-tuk.png",
      },
    ],
  },
  process: {
    eyebrow: "Process",
    title: "How we approach it",
    description:
      "We work in four phases — from first call to live moment. Transparent, fast, no surprises.",
    steps: [
      {
        number: "01",
        title: "Intake",
        description:
          "A short call about brand, moment and ambition. What's the goal, who's the guest, what should stick?",
      },
      {
        number: "02",
        title: "Design",
        description:
          "We deliver a moodboard + concept. Cups, latte art, bar styling, uniforms — all in one proposal.",
      },
      {
        number: "03",
        title: "Production",
        description:
          "After sign-off we produce all branded materials. Typical lead time: 2-3 weeks, faster with a rush fee.",
      },
      {
        number: "04",
        title: "Execution",
        description:
          "On the day itself we handle setup, service and breakdown. You don't need to do anything — except enjoy.",
      },
    ],
  },
  cta: {
    title: "Ready for a coffee moment that feels like your brand?",
    description: "Request an indicative quote or send us a message with what you have in mind.",
    primaryLabel: "Request a quote",
    primaryHref: "/offerte",
    secondaryLabel: "Get in touch",
    secondaryHref: "/contact",
  },
};

export function getBrandingContent(locale: Locale): BrandingContent {
  return locale === "en" ? en : nl;
}
