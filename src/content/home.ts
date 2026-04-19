import type { Locale } from "@/lib/i18n/routing";

export type ConceptCard = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type HomeContent = {
  events: {
    eyebrow: string;
    title: string;
    description: string;
    concepts: ConceptCard[];
  };
  inCompany: {
    eyebrow: string;
    title: string;
    description: string;
    concepts: ConceptCard[];
  };
  differentiator: {
    title: string;
    description: string;
    features: { title: string; description: string }[];
    image: string;
    quote: string;
    quoteDescription: string;
    author: string;
    authorRole: string;
    portrait: string;
  };
  faq: {
    title: string;
    description: string;
    ctaLabel: string;
    items: FaqItem[];
  };
  footer: {
    columns: { label: string; href: string }[];
    colophon: string;
  };
};

const nl: HomeContent = {
  events: {
    eyebrow: "De ervaring",
    title: "Specialty barista services voor zakelijke evenementen",
    description:
      "Wij bieden specialty barista services voor bedrijfsevenementen, conferenties en brand activations in heel Europa. Van de selectie van koffiesoorten tot de visuele opstelling en de gastvrije flow, elk detail is ontworpen om jouw merk te versterken en de gastenbeleving te verrijken.\n\nOf het nu in een boardroom is of tijdens een productlancering, ons team creëert verfijnde, zintuiglijke momenten die blijvende indruk maken.",
    concepts: [
      {
        slug: "mobile-coffee-bar",
        title: "Mobiele koffiebar",
        description:
          "Een stijlvolle, volledig uitgeruste koffiebar die perfect past bij zakelijke evenementen, beurzen en brand activations. Compact, elegant en snel te plaatsen, verandert het elke locatie in een gastvrije ontmoetingsplek waar echte verbindingen ontstaan dankzij uitzonderlijke koffie.",
        image: "/images/concepts/events/mobile-coffee-bar.png",
      },
      {
        slug: "piaggio-tuk-tuk",
        title: "Piaggio TUK TUK",
        description:
          "Premium koffie, met stijl geserveerd waar jouw evenement ook plaatsvindt. Onze volledig uitgeruste coffee tuk-tuk is compact, elegant en speciaal ontworpen voor locaties die waarde hechten aan beleving, verbinding en een verfijnde sfeer.",
        image: "/images/concepts/events/piaggio-tuk-tuk.png",
      },
      {
        slug: "coffee-truck",
        title: "Vintage koffietruck",
        description:
          "Een opvallende Commer koffietruck uit 1969 die vintage charme en ambachtelijke koffie naar jouw evenement brengt. Volledig uitgerust en visueel iconisch, creëert hij een warme, gastvrije sfeer die uitnodigt tot verbinding.",
        image: "/images/concepts/events/vintage-truck.png",
      },
      {
        slug: "barista-service",
        title: "Barista Service",
        description:
          "Professionele barista's die vakmanschap, elegantie en warmte toevoegen aan jouw evenement. Van espresso tot latte art, elke kop is een zorgvuldig gecreëerde ervaring die het moment versterkt en de aandacht van jouw merk voor detail weerspiegelt.",
        image: "/images/concepts/events/barista-service.png",
      },
    ],
  },
  inCompany: {
    eyebrow: "De ervaring",
    title: "Barista belevingen voor werkplekken en kantoren",
    description:
      "Wij brengen specialty barista stations naar kantoren, co-working ruimtes en hoofdkantoren, waarbij we koffiepauzes omvormen tot een verfijnde ervaring van verbinding en aandacht.\n\nVan dagelijkse service tot speciale teammomenten, onze in-company opstellingen zijn ontworpen om de werkcultuur te versterken, hospitalitydoelen te ondersteunen en een waardevolle pauze te bieden in het ritme van de dag.",
    concepts: [
      {
        slug: "espresso-bar",
        title: "Office Espresso Bar",
        description:
          "Een professionele koffieopstelling voor kantoren in Nederland. Ideaal voor teammomenten, klantbezoeken of dagelijkse hospitality, met kwaliteit en stijl.",
        image: "/images/concepts/in-company/espresso-bar.png",
      },
      {
        slug: "pop-up",
        title: "Pop-up koffiemomenten",
        description:
          "Een mobiele espressobar die elke ruimte verandert in een gastvrije ervaring. Perfect voor activaties, beurzen en indoor evenementen in heel Europa.",
        image: "/images/concepts/in-company/pop-up.png",
      },
      {
        slug: "executive",
        title: "Executive Meeting Coffee",
        description:
          "Specialty koffieservice, ontworpen voor boardrooms en zakelijke settings. Ideaal voor klantgesprekken, presentaties en executive momenten die uitmuntendheid vragen.",
        image: "/images/concepts/in-company/executive.png",
      },
    ],
  },
  differentiator: {
    title: "Wat Branded Baristas onderscheidt",
    description:
      "Branded Baristas biedt specialty barista services, ontwikkeld voor hoogwaardige zakelijke omgevingen: van bedrijfsevenementen en brand activations tot in-house hospitality en werkplekrituelen.\n\nWij combineren hospitality-expertise met operationele precisie om merken te helpen momenten van aanwezigheid, verbinding en zintuiglijke verfijning te creëren.",
    features: [
      {
        title: "Partners, geen leveranciers.",
        description:
          "Wij bedienen bedrijven in heel Europa, met lokale inzichten en wereldwijde kwaliteit.",
      },
    ],
    image: "/images/hero/hero-main.png",
    quote:
      "Mensen herinneren zich de gastvrijheid, niet alleen de koffie. Ze herinneren zich hoe ze zijn ontvangen.",
    quoteDescription:
      "Onze barista's ontvangen met aandacht. Getraind in zowel technische uitvoering als menselijke interactie, brengen zij ritme, warmte en bewustzijn in elke service.\n\nOf het nu op de werkvloer is of tijdens een brand activation, hun rol is om de sfeer subtiel te verheffen en elk koffiemoment te laten weerspiegelen wat jouw bedrijfscultuur en zorg kenmerkt.",
    author: "Ander, barista sinds 2017.",
    authorRole: "Specialist in pour-over technieken en ochtendgesprekken.",
    portrait: "/images/about/barista-portrait.png",
  },
  faq: {
    title: "Jouw vragen over onze barista setups",
    description:
      "Meer details nodig over onze koffieservices? Neem gerust contact op, we helpen je graag.",
    ctaLabel: "Meer weten",
    items: [
      {
        question: "Wat zijn de afmetingen van de mobiele koffiebar?",
        answer:
          "De mobiele koffiebar (Piaggio Ape) meet ongeveer 300 cm (lengte) × 150 cm (breedte) × 200 cm (hoogte). Het is een compact en elegant concept, ontworpen voor zakelijke evenementen binnen en buiten, en vormt een echte eyecatcher voor jouw gasten.",
      },
      {
        question: "Is thee ook inbegrepen?",
        answer:
          "Ja, we bieden een zorgvuldig samengestelde selectie losse thee aan als aanvulling op onze specialty koffie — op aanvraag uit te breiden.",
      },
      {
        question: "Met welke koffie werken jullie?",
        answer:
          "Wij werken met specialty-grade koffie van lokale en Europese roasters, geselecteerd op smaakprofiel, oorsprong en duurzaamheid.",
      },
      {
        question: "Betaal ik per kop koffie?",
        answer:
          "Nee. Wij werken met een vast dagtarief op basis van jouw concept, event-duur en verwacht aantal gasten — zonder verrassingen achteraf.",
      },
    ],
  },
  footer: {
    columns: [
      { label: "Over ons", href: "/over-ons" },
      { label: "Getuigenissen", href: "/over-ons#getuigenissen" },
      { label: "Ons werk", href: "/cases" },
      { label: "Veel gestelde vragen", href: "/#faq" },
      { label: "Diensten", href: "/diensten" },
      { label: "Contact", href: "/contact" },
    ],
    colophon: "© 2025 Branded Baristas. Alle rechten voorbehouden.",
  },
};

const en: HomeContent = {
  events: {
    eyebrow: "The experience",
    title: "Specialty barista services for corporate events",
    description:
      "We deliver specialty barista services for corporate events, conferences and brand activations across Europe. From coffee selection to visual setup and hospitality flow, every detail is designed to elevate your brand and enrich the guest experience.\n\nWhether in a boardroom or at a product launch, our team creates refined, sensory moments that leave a lasting impression.",
    concepts: [
      {
        slug: "mobile-coffee-bar",
        title: "Mobile coffee bar",
        description:
          "A stylish, fully equipped coffee bar that suits corporate events, trade shows and brand activations. Compact, elegant and quick to set up, it turns any location into a welcoming meeting place where real connections happen over exceptional coffee.",
        image: "/images/concepts/events/mobile-coffee-bar.png",
      },
      {
        slug: "piaggio-tuk-tuk",
        title: "Piaggio TUK TUK",
        description:
          "Premium coffee served in style wherever your event takes place. Our fully equipped coffee tuk-tuk is compact, elegant and purpose-built for venues that value experience, connection and a refined atmosphere.",
        image: "/images/concepts/events/piaggio-tuk-tuk.png",
      },
      {
        slug: "coffee-truck",
        title: "Vintage coffee truck",
        description:
          "A striking 1969 Commer coffee truck that brings vintage charm and artisan coffee to your event. Fully equipped and visually iconic, it creates a warm, welcoming atmosphere that invites people to connect.",
        image: "/images/concepts/events/vintage-truck.png",
      },
      {
        slug: "barista-service",
        title: "Barista service",
        description:
          "Professional baristas who add craft, elegance and warmth to your event. From espresso to latte art, every cup is a carefully crafted experience that elevates the moment and reflects your brand's attention to detail.",
        image: "/images/concepts/events/barista-service.png",
      },
    ],
  },
  inCompany: {
    eyebrow: "The experience",
    title: "Barista experiences for workplaces and offices",
    description:
      "We bring specialty barista stations into offices, co-working spaces and headquarters, turning coffee breaks into a refined experience of connection and care.\n\nFrom daily service to special team moments, our in-company setups strengthen workplace culture, support hospitality goals and deliver a meaningful pause in the rhythm of the day.",
    concepts: [
      {
        slug: "espresso-bar",
        title: "Office espresso bar",
        description:
          "A professional coffee setup for offices in the Netherlands. Ideal for team moments, client visits or daily hospitality — with quality and style.",
        image: "/images/concepts/in-company/espresso-bar.png",
      },
      {
        slug: "pop-up",
        title: "Pop-up coffee moments",
        description:
          "A mobile espresso bar that turns any room into a welcoming experience. Perfect for activations, trade shows and indoor events across Europe.",
        image: "/images/concepts/in-company/pop-up.png",
      },
      {
        slug: "executive",
        title: "Executive meeting coffee",
        description:
          "Specialty coffee service designed for boardrooms and corporate settings. Ideal for client conversations, presentations and executive moments that demand excellence.",
        image: "/images/concepts/in-company/executive.png",
      },
    ],
  },
  differentiator: {
    title: "What sets Branded Baristas apart",
    description:
      "Branded Baristas delivers specialty barista services built for high-end corporate environments: from corporate events and brand activations to in-house hospitality and workplace rituals.\n\nWe combine hospitality expertise with operational precision to help brands create moments of presence, connection and sensory refinement.",
    features: [
      {
        title: "Partners, not vendors.",
        description: "We serve businesses across Europe, with local insight and global quality.",
      },
    ],
    image: "/images/hero/hero-main.png",
    quote:
      "People remember the hospitality, not just the coffee. They remember how they were welcomed.",
    quoteDescription:
      "Our baristas welcome with attention. Trained in both technical execution and human interaction, they bring rhythm, warmth and awareness to every service.\n\nWhether on the workfloor or during a brand activation, their role is to subtly elevate the atmosphere and let every coffee moment reflect what defines your company's culture and care.",
    author: "Ander, barista since 2017.",
    authorRole: "Specialist in pour-over techniques and morning conversations.",
    portrait: "/images/about/barista-portrait.png",
  },
  faq: {
    title: "Your questions about our barista setups",
    description:
      "Need more details about our coffee services? Feel free to get in touch — we're happy to help.",
    ctaLabel: "Learn more",
    items: [
      {
        question: "What are the dimensions of the mobile coffee bar?",
        answer:
          "The mobile coffee bar (Piaggio Ape) measures approximately 300 cm (length) × 150 cm (width) × 200 cm (height). It's a compact and elegant concept, designed for indoor and outdoor corporate events, and makes for a real eye-catcher for your guests.",
      },
      {
        question: "Is tea included?",
        answer:
          "Yes — we offer a curated selection of loose-leaf teas alongside our specialty coffee, and can expand the menu on request.",
      },
      {
        question: "What coffee do you work with?",
        answer:
          "We work with specialty-grade coffee from local and European roasters, selected on flavour profile, origin and sustainability.",
      },
      {
        question: "Do I pay per cup?",
        answer:
          "No. We work with a fixed day rate based on your concept, event duration and expected guest count — no surprises afterwards.",
      },
    ],
  },
  footer: {
    columns: [
      { label: "About", href: "/over-ons" },
      { label: "Testimonials", href: "/over-ons#testimonials" },
      { label: "Our work", href: "/cases" },
      { label: "Frequently asked questions", href: "/#faq" },
      { label: "Services", href: "/diensten" },
      { label: "Contact", href: "/contact" },
    ],
    colophon: "© 2025 Branded Baristas. All rights reserved.",
  },
};

const content: Record<Locale, HomeContent> = { nl, en };

export function getHomeContent(locale: Locale): HomeContent {
  return content[locale];
}
