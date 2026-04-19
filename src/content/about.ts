import type { Locale } from "@/lib/i18n/routing";

export type AboutContent = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    image: string;
  };
  story: {
    title: string;
    paragraphs: string[];
    image: string;
  };
  values: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; description: string }[];
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

const nl: AboutContent = {
  hero: {
    eyebrow: "Over ons",
    title: "Specialty koffie, hospitality en aandacht voor detail",
    lead: "Branded Baristas begon vanuit een eenvoudige overtuiging: dat koffie meer kan zijn dan een drankje. Het is een moment — een manier om mensen te verbinden, een ritueel dat zorg en gastvrijheid laat zien.",
    image: "/images/about/barista-portrait.png",
  },
  story: {
    title: "Een team dat hospitality serieus neemt",
    paragraphs: [
      "We werken al jaren achter de espressomachine, op events, in kantoren en tijdens brand activations door heel Europa. In die tijd hebben we geleerd dat het verschil zit in het detail: de temperatuur van de melk, de toon waarmee iemand wordt begroet, de manier waarop een setup aanvoelt.",
      "Elke barista in ons team is getraind in zowel techniek als hospitality. We weten hoe we een perfecte flat white maken én hoe we een gesprek laten ontstaan. We zien onszelf als gastheren, niet als leveranciers.",
      "We werken met merken die waarde hechten aan kwaliteit, mensen en momenten die ertoe doen. Dat zijn bedrijven die begrijpen dat een kop koffie vaak het eerste contactmoment is met hun gasten, klanten of medewerkers.",
    ],
    image: "/images/about/barista-portrait.png",
  },
  values: {
    eyebrow: "Onze pijlers",
    title: "Waarom bedrijven met ons werken",
    description:
      "Specialty barista services, ontwikkeld voor hoogwaardige zakelijke omgevingen. Dit zijn de principes die ons werk sturen.",
    items: [
      {
        title: "Specialty als standaard",
        description:
          "We werken uitsluitend met specialty koffie van gecertificeerde branders. Elke bean is getraceerd, elke shot is geproefd en geijkt voor de setup waar hij serveert.",
      },
      {
        title: "Hospitality, niet service",
        description:
          "Onze barista's worden getraind in zowel techniek als menselijke interactie. Ze herkennen wanneer een gast even wil praten en wanneer iemand liever de ruimte krijgt.",
      },
      {
        title: "Visueel ontworpen",
        description:
          "Van de houten bar tot de kleur van de cups, elke setup wordt afgestemd op de ruimte en het merk. Onze concepten zien eruit alsof ze voor jou zijn gemaakt.",
      },
      {
        title: "Partners, geen leveranciers",
        description:
          "We denken mee over flow, timing en gastbeleving. We plannen vooraf, we ruimen op, we stemmen af met je team. Het resultaat voelt naadloos, ook voor jouw collega's.",
      },
    ],
  },
  cta: {
    title: "Laten we een moment bouwen dat blijft hangen",
    description:
      "Of het nu om een evenement gaat, een kantoorsetup of een brand activation — we denken graag mee. Vraag een indicatieve offerte aan of stuur ons een bericht.",
    primaryLabel: "Offerte aanvragen",
    primaryHref: "/offerte",
    secondaryLabel: "Neem contact op",
    secondaryHref: "/contact",
  },
};

const en: AboutContent = {
  hero: {
    eyebrow: "About us",
    title: "Specialty coffee, hospitality and attention to detail",
    lead: "Branded Baristas started from a simple belief: that coffee can be more than a drink. It's a moment — a way to connect people, a ritual that shows care and hospitality.",
    image: "/images/about/barista-portrait.png",
  },
  story: {
    title: "A team that takes hospitality seriously",
    paragraphs: [
      "We've been working behind espresso machines for years — at events, in offices, and during brand activations across Europe. In that time we've learned that the difference is in the details: the temperature of the milk, the tone of a greeting, the feel of a setup.",
      "Every barista on our team is trained in both technique and hospitality. We know how to make a perfect flat white — and how to start a conversation. We see ourselves as hosts, not suppliers.",
      "We work with brands that value quality, people and moments that matter. Companies that understand a cup of coffee is often the first real contact point with their guests, clients or employees.",
    ],
    image: "/images/about/barista-portrait.png",
  },
  values: {
    eyebrow: "Our pillars",
    title: "Why companies work with us",
    description:
      "Specialty barista services built for high-quality business environments. These are the principles that guide our work.",
    items: [
      {
        title: "Specialty as standard",
        description:
          "We only work with specialty coffee from certified roasters. Every bean is traceable, every shot is tasted and calibrated for the setup it serves.",
      },
      {
        title: "Hospitality, not service",
        description:
          "Our baristas are trained in both technique and human interaction. They know when a guest wants to chat and when someone prefers space.",
      },
      {
        title: "Visually designed",
        description:
          "From the wooden bar to the colour of the cups, every setup is tuned to the room and the brand. Our concepts look like they were built for you.",
      },
      {
        title: "Partners, not suppliers",
        description:
          "We think along about flow, timing and guest experience. We plan ahead, we clean up, we align with your team. The result feels seamless — even for your colleagues.",
      },
    ],
  },
  cta: {
    title: "Let's build a moment that sticks",
    description:
      "Whether it's an event, an office setup or a brand activation — we'd love to think along. Request an indicative quote or send us a message.",
    primaryLabel: "Request a quote",
    primaryHref: "/quote",
    secondaryLabel: "Get in touch",
    secondaryHref: "/contact",
  },
};

export function getAboutContent(locale: Locale): AboutContent {
  return locale === "en" ? en : nl;
}
