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

export type LogoItem = {
  name: string;
  icon: "square" | "bolt" | "arc" | "ring" | "dots" | "circle" | "t";
};

export type PillarItem = {
  icon: "storefront" | "handshake" | "pitcher" | "cup";
  title: string;
  description: string;
};

export type Social = {
  platform: "instagram" | "linkedin";
  href: string;
};

export type HomeContent = {
  intro: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    image: string;
  };
  logos: LogoItem[];
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
  inlineCta: {
    text: string;
    ctaLabel: string;
    ctaHref: string;
  };
  tagline: {
    title: string;
    image: string;
  };
  pillars: {
    subtitle: string;
    title: string;
    items: PillarItem[];
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
  contact: {
    title: string;
    description: string;
    labels: {
      office: string;
      email: string;
      phone: string;
      follow: string;
    };
    office: string;
    email: string;
    phone: string;
    socials: Social[];
    form: {
      labels: {
        name: string;
        email: string;
        phone: string;
        message: string;
      };
      placeholders: {
        name: string;
        email: string;
        phone: string;
        message: string;
      };
      submitLabel: string;
      thankYou: string;
    };
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

const sharedLogos: LogoItem[] = [
  { name: "Wealthro", icon: "square" },
  { name: "Finyon", icon: "bolt" },
  { name: "Aegra", icon: "arc" },
  { name: "Portivio", icon: "ring" },
  { name: "Vaultic", icon: "dots" },
  { name: "Altoris", icon: "circle" },
  { name: "Quan", icon: "t" },
];

const sharedSocials: Social[] = [
  { platform: "instagram", href: "https://www.instagram.com/branded_baristas/" },
  { platform: "linkedin", href: "https://www.linkedin.com/company/branded-baristas/" },
];

const nl: HomeContent = {
  intro: {
    eyebrow: "Welkom bij Branded Baristas",
    title: "Speciale momenten,\nmet zorg geserveerd",
    description:
      "Wij creëren betekenisvolle touchpoints binnen jouw bedrijf, event of brand activation.\n\nElk detail — van aroma tot flow — is ontworpen om de beleving te versterken en waarde te creëren.",
    ctaLabel: "Meer weten",
    ctaHref: "/over-ons",
    image: "/images/home/intro-espresso-bar.jpg",
  },
  logos: sharedLogos,
  events: {
    eyebrow: "De ervaring",
    title: "Event\nServices",
    description:
      "Wij leveren professionele barista koffieservices voor bedrijfsevenementen, conferenties en brand activations. Elk detail, van koffieselectie tot hospitality en service flow, is zorgvuldig ontworpen om de sfeer te verheffen, jouw gasten te verrassen en onvergetelijke momenten te creëren.",
    concepts: [
      {
        slug: "mobile-coffee-bar",
        title: "Mobiele Koffiebar",
        description:
          "Onze volledig uitgeruste mobiele koffiebars kunnen overal worden opgesteld en bieden kwaliteitskoffie en een onvergetelijke beleving voor jouw gasten of team.",
        image: "/images/concepts/events/mobile-coffee-bar.png",
      },
      {
        slug: "piaggio-tuk-tuk",
        title: "Piaggio TUK TUK",
        description:
          "Onze volledig uitgeruste Piaggio Tuk Tuk koffiebar brengt kwaliteitskoffie en een unieke ervaring naar elke locatie of event.",
        image: "/images/concepts/events/piaggio-tuk-tuk.png",
      },
      {
        slug: "coffee-truck",
        title: "Vintage Koffietruck",
        description:
          "De 1969 Commer Coffee Truck is een iconische vintage koffiebar op wielen. Perfect voor een unieke koffiebeleving bij elk event.",
        image: "/images/concepts/events/vintage-truck.png",
      },
      {
        slug: "barista-service",
        title: "Barista Huren",
        description:
          "Heb je al een koffiebar met apparatuur en tools? Huur een ervaren barista om jouw service naar een hoger niveau te tillen.",
        image: "/images/concepts/events/barista-service.png",
      },
    ],
  },
  inCompany: {
    eyebrow: "De ervaring",
    title: "In-Company\nServices",
    description:
      "Onze in-company barista services transformeren jouw kantoor of werkplek in een gastvrije hub voor teams en gasten. Elk detail is zorgvuldig ontworpen om engagement, welzijn en bedrijfscultuur te versterken.",
    concepts: [
      {
        slug: "espresso-bar",
        title: "Office Espresso Bar",
        description:
          "Bied jouw team een unieke kantoorperk met onze professionele on-site barista service, beschikbaar wekelijks of maandelijks.",
        image: "/images/concepts/in-company/espresso-bar.png",
      },
      {
        slug: "pop-up",
        title: "Pop-up Moments",
        description:
          "Verras jouw team met pop-up koffie-activaties, perfect voor onboardings, bedrijfsfeestdagen of medewerker waarderingsdagen.",
        image: "/images/concepts/in-company/pop-up.png",
      },
      {
        slug: "executive",
        title: "Executive Meeting",
        description:
          "Bied discrete, high-end koffieservice voor boardrooms, directievergaderingen of VIP-gasten met onze professionele barista-ervaring.",
        image: "/images/concepts/in-company/executive.png",
      },
    ],
  },
  inlineCta: {
    text: "Wil je dat jouw merk aanwezig is met intentie?",
    ctaLabel: "Geef vorm aan jouw beleving",
    ctaHref: "/contact",
  },
  tagline: {
    title: "De nieuwste manier om\nmensen en bedrijven te verbinden\ndoor kwaliteitskoffie",
    image: "/images/home/tagline-tamping.jpg",
  },
  pillars: {
    subtitle: "Een complete koffiereis in vier essentiële lagen.",
    title: "De Branded Baristas\nkoffiebeleving",
    items: [
      {
        icon: "storefront",
        title: "Ambience Design",
        description:
          "Wij ontwerpen elke ruimte als een strategische achtergrond — van indeling tot verlichting — om verbinding en flow te ondersteunen.",
      },
      {
        icon: "handshake",
        title: "Hospitality Service",
        description:
          "Onze barista's doen meer dan koffie serveren. Ze ontvangen met warmte en aandacht, en stemmen elk gebaar af op de unieke toon van jouw bedrijf.",
      },
      {
        icon: "pitcher",
        title: "Technical Precision",
        description:
          "Elk detail telt, van koffieorigine tot service flow en timing. Wij zorgen voor precisie en consistentie bij elk event.",
      },
      {
        icon: "cup",
        title: "Branding Applications",
        description:
          "Jouw merk wordt visueel en zintuiglijk geïntegreerd in elk detail, van custom setups tot kopjes, uniformen en elk touchpoint.",
      },
    ],
  },
  differentiator: {
    title: "Waarom Branded Baristas?",
    description:
      "Branded Baristas combineert hospitality-expertise en operationele uitmuntendheid om naadloze koffiebelevingen te leveren — ontworpen om jouw merkpresentie te verheffen tijdens events, op werkplekken en bij corporate samenkomsten.",
    features: [
      {
        title: "Partners, geen leveranciers.",
        description:
          "Wij bedienen bedrijven in heel Europa, met lokale inzichten en wereldwijde kwaliteit.",
      },
    ],
    image: "/images/home/differentiator-tuktuk.jpg",
    quote: "Mensen herinneren zich hoe ze werden ontvangen",
    quoteDescription:
      "Onze barista's zijn meer dan koffiespecialisten — ze zijn experts in aanwezigheid. Elk is getraind niet alleen om te serveren, maar om gastheer te zijn. Met rustige zelfverzekerdheid creëren ze een gevoel van zorg, ritme en aandacht dat een simpele service verandert in een blijvende indruk.",
    author: "Ander, barista sinds 2017.",
    authorRole: "Specialist in pour-over technieken en ochtendgesprekken.",
    portrait: "/images/home/differentiator-portrait-executive.jpg",
  },
  contact: {
    title: "Neem contact op",
    description:
      "Voor vragen of om jouw visie verder te verkennen, nodigen wij je uit om contact op te nemen met ons professionele team via onderstaande gegevens.",
    labels: {
      office: "Kantoor",
      email: "E-mail",
      phone: "Telefoon",
      follow: "Volg ons",
    },
    office: "Albert Schweitzersingel 91, 271DZ Zoetermeer",
    email: "Info@branded-baristas.com",
    phone: "+31 641697775",
    socials: sharedSocials,
    form: {
      labels: {
        name: "Naam*",
        email: "E-mail*",
        phone: "Telefoonnummer",
        message: "Bericht*",
      },
      placeholders: {
        name: "Jan Jansen",
        email: "janjansen@gmail.com",
        phone: "+31 612 345678",
        message: "Hallo, ik wil graag informeren naar...",
      },
      submitLabel: "Verstuur bericht",
      thankYou: "Bedankt — we hebben je bericht ontvangen en nemen binnen één werkdag contact op.",
    },
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
      {
        question: "Hoeveel koffies maakt een barista per uur?",
        answer:
          "Een ervaren barista serveert gemiddeld 60 tot 120 specialty koffies per uur, afhankelijk van menu en melkwerk. Voor events boven de 300 gasten zetten we standaard twee barista's en vaak een tweede machine in om wachttijden onder de drie minuten te houden.",
      },
      {
        question: "Hoe lang van tevoren moeten we boeken?",
        answer:
          "Voor events met branded elementen (cups, uniforms, signage) adviseren we 4 tot 8 weken vooraf te boeken. Een standaard setup kunnen we soms binnen een week bevestigen — stuur ons een aanvraag met datum en locatie voor een snelle beschikbaarheidscheck.",
      },
      {
        question: "Werken jullie ook buiten Nederland?",
        answer:
          "Ja. We werken regelmatig in België, Duitsland, Luxemburg, Frankrijk en het Verenigd Koninkrijk. Reis- en verblijfskosten worden transparant in de offerte opgenomen.",
      },
      {
        question: "Welke stroom en ruimte hebben jullie nodig?",
        answer:
          "Een standaard 230V / 16A stopcontact is voldoende voor onze mobiele koffiebar. Reken op een opstelruimte van circa 3 × 2 meter voor de Piaggio en iets meer voor de vintage koffietruck. Opbouwen duurt 60 tot 90 minuten.",
      },
      {
        question: "Kunnen jullie de koffiemomenten brandpersoonlijk maken?",
        answer:
          "Ja — cups, sleeves, latte-art stencils, bar styling, uniformen, signage en menukaarten kunnen we afstemmen op jouw huisstijl. Bekijk onze branding-pagina voor voorbeelden en doorlooptijden.",
      },
      {
        question: "Kunnen jullie buiten cateren bij slecht weer?",
        answer:
          "Onze Piaggio tuk-tuk en 1969 Commer koffietruck zijn gemaakt voor buitenevenementen. Voor de reguliere mobiele bar adviseren we een partytent of overkapping bij regen — we denken graag mee in je eventplanning.",
      },
      {
        question: "Bieden jullie alternatieven voor zuivel?",
        answer:
          "Standaard hebben we haver-, soja- en amandelmelk aan boord. Op aanvraag kunnen we ook kokos of andere plantaardige melkopties meenemen — zonder extra kosten voor je gasten.",
      },
      {
        question: "Kunnen jullie een vast espressobar-ritme op kantoor verzorgen?",
        answer:
          "Ja, we draaien wekelijkse of maandelijkse espressobars op kantoor voor teams van 20 tot meer dan 1.000 medewerkers. Typisch boeken onze klanten één ochtend per week van 3 tot 4 uur.",
      },
      {
        question: "Hoe ziet de menukaart eruit?",
        answer:
          "Standaard serveren we espresso, cappuccino, flat white, latte, Americano, espresso macchiato, cortado en een filterkoffie of cold brew naar keuze. Ook specialty drinks, matcha, chai en signature coffees zijn mogelijk.",
      },
      {
        question: "Zijn jullie bekers composteerbaar?",
        answer:
          "Ja. Onze standaard beker is composteerbaar. Voor recurring events of kantoor-setups werken we graag met herbruikbare cups — dat past bij onze duurzaamheidsaanpak en verlaagt je footprint.",
      },
      {
        question: "Hoe werkt de offerte- en betaalprocedure?",
        answer:
          "Na je aanvraag sturen we binnen één werkdag een indicatieve offerte. Na bevestiging ontvang je een factuur met standaard B2B-betaaltermijn van 14 dagen. Voor events boven EUR 10.000 vragen we soms 30% aanbetaling.",
      },
      {
        question: "Zijn jullie verzekerd en gediplomeerd?",
        answer:
          "Ja. Branded Baristas heeft een bedrijfsaansprakelijkheidsverzekering (WA). Onze barista's zijn getraind op techniek én gastvrijheid en werken onder Nederlandse horeca-afspraken.",
      },
      {
        question: "Kunnen jullie signature drinks ontwikkelen voor een brand-activatie?",
        answer:
          "Zeker. Van een branded iced latte voor een zomerlaunch tot een signature signature matcha voor een retailopening: we ontwikkelen samen een drink die aansluit bij de campagne en zetten deze receptmatig vast in ons playbook.",
      },
      {
        question: "Kan de koffie-activatie onderdeel zijn van onze marketing-KPIs?",
        answer:
          "Ja. We werken regelmatig met marketing- en brand-teams en kunnen metingen als kopjes geserveerd, doorlooptijd, NPS en social shares terugkoppelen. Zo wordt een koffiemoment een meetbaar brand-touchpoint.",
      },
      {
        question: "Hoe groot moet de ruimte zijn voor jullie setup?",
        answer:
          "Voor de Piaggio Ape mobiele bar rekenen we op 3 × 2 meter, voor de coffee truck op circa 4 × 5 meter met een accessible outdoor spot. Een standaard kantoorsetup past in een foyer of receptie van 2 × 2 meter.",
      },
    ],
  },
  footer: {
    columns: [
      { label: "Over ons", href: "/over-ons" },
      { label: "Ons werk", href: "/cases" },
      { label: "Diensten", href: "/diensten" },
      { label: "Offerte aanvragen", href: "/offerte" },
      { label: "Veel gestelde vragen", href: "/#faq" },
      { label: "Contact", href: "/contact" },
      { label: "Koffiegids", href: "/gids" },
    ],
    colophon: `© ${new Date().getFullYear()} Branded Baristas. Alle rechten voorbehouden.`,
  },
};

const en: HomeContent = {
  intro: {
    eyebrow: "Welcome to Branded Baristas",
    title: "Special moments,\nserved with care",
    description:
      "We create meaningful touchpoints inside your company, event, or brand activation.\n\nEvery detail — from aroma to flow — is designed to enhance the experience and create value.",
    ctaLabel: "Learn More",
    ctaHref: "/over-ons",
    image: "/images/home/intro-espresso-bar.jpg",
  },
  logos: sharedLogos,
  events: {
    eyebrow: "The experience",
    title: "Event\nServices",
    description:
      "We deliver professional barista coffee services for corporate events, conferences and brand activations. Every detail, from coffee selection to hospitality and service flow, is thoughtfully designed to elevate the atmosphere, engage your guests and create memorable experiences.",
    concepts: [
      {
        slug: "mobile-coffee-bar",
        title: "Mobiele Koffiebar",
        description:
          "Our fully equipped mobile coffee bars can be set up anywhere, delivering quality coffee and a memorable experience for your guests or team.",
        image: "/images/concepts/events/mobile-coffee-bar.png",
      },
      {
        slug: "piaggio-tuk-tuk",
        title: "Piaggio TUK TUK",
        description:
          "Our fully equipped Piaggio Tuk Tuk coffee bar brings quality coffee and a unique experience to any location or event.",
        image: "/images/concepts/events/piaggio-tuk-tuk.png",
      },
      {
        slug: "coffee-truck",
        title: "Vintage Koffietruck",
        description:
          "The 1969 Commer Coffee Truck is an iconic vintage coffee bar on wheels. Perfect for bringing a unique coffee experience to any event.",
        image: "/images/concepts/events/vintage-truck.png",
      },
      {
        slug: "barista-service",
        title: "Barista Huren",
        description:
          "Already have a coffee bar set up with equipment and tools? Hire an experienced barista to elevate your service.",
        image: "/images/concepts/events/barista-service.png",
      },
    ],
  },
  inCompany: {
    eyebrow: "The experience",
    title: "In-Company\nServices",
    description:
      "Our in-company barista services transform your office or workspace into a welcoming hub for teams and guests. Each detail is carefully crafted to boost engagement, well-being, and company culture.",
    concepts: [
      {
        slug: "espresso-bar",
        title: "Office Espresso Bar",
        description:
          "Offer your team a unique office perk with our professional on-site barista service, available weekly or monthly.",
        image: "/images/concepts/in-company/espresso-bar.png",
      },
      {
        slug: "pop-up",
        title: "Pop-up Moments",
        description:
          "Delight your team with surprise pop-up coffee activations, perfect for onboardings, company holidays or employee appreciation days.",
        image: "/images/concepts/in-company/pop-up.png",
      },
      {
        slug: "executive",
        title: "Executive Meeting",
        description:
          "Provide discreet, high-end coffee service for boardrooms, leadership meetings or VIP guests with our professional barista experience.",
        image: "/images/concepts/in-company/executive.png",
      },
    ],
  },
  inlineCta: {
    text: "Want your brand to show up with intention?",
    ctaLabel: "Let's shape your experience",
    ctaHref: "/contact",
  },
  tagline: {
    title: "The newest way to connect\npeople and businesses\nthrough quality coffee",
    image: "/images/home/tagline-tamping.jpg",
  },
  pillars: {
    subtitle: "A complete coffee journey in four essential layers.",
    title: "The Branded Baristas\ncoffee experience",
    items: [
      {
        icon: "storefront",
        title: "Ambience Design",
        description:
          "We design each space as a strategic backdrop — from layout to lighting — to support connection and flow.",
      },
      {
        icon: "handshake",
        title: "Hospitality Service",
        description:
          "Our baristas do more than serve coffee. They host with warmth and attention, aligning every gesture with your company's unique tone.",
      },
      {
        icon: "pitcher",
        title: "Technical Precision",
        description:
          "Every detail matters, from coffee origin to service flow and timing. We ensure precision and consistency at every event.",
      },
      {
        icon: "cup",
        title: "Branding Applications",
        description:
          "Your brand is integrated visually and sensorially into every detail, from custom setups to cups, uniforms and every touchpoint.",
      },
    ],
  },
  differentiator: {
    title: "Why Branded Baristas?",
    description:
      "Branded Baristas combines hospitality expertise and operational excellence to deliver seamless coffee experiences — designed to elevate your brand presence in events, workspaces and corporate gatherings.",
    features: [
      {
        title: "Partners, not suppliers.",
        description: "Serving businesses across Europe, with local insight and global quality.",
      },
    ],
    image: "/images/home/differentiator-tuktuk.jpg",
    quote: "People remember how they were received",
    quoteDescription:
      "Our baristas are more than coffee specialists — they're experts in presence. Each one is trained not only to serve, but to host. With quiet confidence, they create a sense of care, rhythm and attention that turns a simple service into a lasting impression.",
    author: "Ander, barista since 2017.",
    authorRole: "Specialist in pour-over techniques and morning conversations.",
    portrait: "/images/home/differentiator-portrait-executive.jpg",
  },
  contact: {
    title: "Get in touch",
    description:
      "For any inquiries or to explore your vision further, we invite you to contact our professional team using the details provided below.",
    labels: {
      office: "Office",
      email: "Email",
      phone: "Telephone",
      follow: "Follow us",
    },
    office: "Albert Schweitzersingel 91, 271DZ Zoetermeer",
    email: "Info@branded-baristas.com",
    phone: "+31 641697775",
    socials: sharedSocials,
    form: {
      labels: {
        name: "Name*",
        email: "Email*",
        phone: "Phone Number",
        message: "Message*",
      },
      placeholders: {
        name: "John Smith",
        email: "johnsmith@gmail.com",
        phone: "+44789 123456",
        message: "Hello, I'd like to enquire about...",
      },
      submitLabel: "Send message",
      thankYou:
        "Thank you — we've received your message and will be in touch within one business day.",
    },
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
      {
        question: "How many coffees can a barista make per hour?",
        answer:
          "An experienced barista serves roughly 60 to 120 specialty coffees per hour, depending on menu complexity and milk-steaming workload. For events above 300 guests we typically deploy two baristas and often a second machine to keep wait times under three minutes.",
      },
      {
        question: "How far in advance should we book?",
        answer:
          "For events with branded elements (cups, uniforms, signage) we recommend booking 4 to 8 weeks ahead. A plain setup can sometimes be confirmed within a week — send us a request with date and location for a quick availability check.",
      },
      {
        question: "Do you operate outside the Netherlands?",
        answer:
          "Yes. We regularly work in Belgium, Germany, Luxembourg, France and the United Kingdom. Travel and lodging costs are listed transparently in the quote.",
      },
      {
        question: "What power and space do you need?",
        answer:
          "A standard 230V / 16A socket is enough for our mobile coffee bar. Expect a setup footprint of around 3 × 2 metres for the Piaggio and slightly more for the vintage coffee truck. Set-up takes 60 to 90 minutes.",
      },
      {
        question: "Can the coffee moment match our brand?",
        answer:
          "Yes — cups, sleeves, latte-art stencils, bar styling, uniforms, signage and menu cards can all be tailored to your brand. See our branding page for examples and lead times.",
      },
      {
        question: "Can you cater outdoors in bad weather?",
        answer:
          "Our Piaggio tuk-tuk and 1969 Commer coffee truck are built for outdoor events. For the regular mobile bar we recommend a tent or shelter when rain is likely — we're happy to think along in your event planning.",
      },
      {
        question: "Do you offer dairy alternatives?",
        answer:
          "Oat, soy and almond milk are included by default. On request we can add coconut or other plant-based milks — at no extra cost to your guests.",
      },
      {
        question: "Can you run a recurring espresso bar at our office?",
        answer:
          "Yes, we operate weekly or monthly on-site espresso bars for teams of 20 to more than 1,000 employees. A typical cadence is one morning per week for 3 to 4 hours.",
      },
      {
        question: "What does the menu look like?",
        answer:
          "By default we serve espresso, cappuccino, flat white, latte, Americano, espresso macchiato, cortado and a filter coffee or cold brew. Specialty drinks, matcha, chai and signature coffees are available on request.",
      },
      {
        question: "Are your cups compostable?",
        answer:
          "Yes. Our default cup is compostable. For recurring events or office setups we like to work with reusable cups — aligned with our sustainability approach and lowering your footprint.",
      },
      {
        question: "How do quoting and payment work?",
        answer:
          "After your request we send an indicative quote within one business day. Once confirmed you receive an invoice with standard Dutch B2B terms (14 days). For events above EUR 10,000 we may request a 30% deposit.",
      },
      {
        question: "Are you insured and certified?",
        answer:
          "Yes. Branded Baristas carries public liability insurance. Our baristas are trained on technique and hospitality and are employed or contracted under Dutch hospitality terms.",
      },
      {
        question: "Can you develop a signature drink for a brand activation?",
        answer:
          "Absolutely. From a branded iced latte for a summer launch to a signature matcha for a retail opening: we co-create a drink that fits the campaign and lock the recipe into our playbook.",
      },
      {
        question: "Can the coffee activation tie into our marketing KPIs?",
        answer:
          "Yes. We regularly work with marketing and brand teams and can report back on cups served, throughput, NPS and social shares. That turns a coffee moment into a measurable brand touchpoint.",
      },
      {
        question: "How much space do you need?",
        answer:
          "For the Piaggio Ape mobile bar we plan on 3 × 2 metres, for the coffee truck around 4 × 5 metres with an accessible outdoor spot. A standard office setup fits into a foyer or reception area of 2 × 2 metres.",
      },
    ],
  },
  footer: {
    columns: [
      { label: "About us", href: "/over-ons" },
      { label: "Our work", href: "/cases" },
      { label: "Services", href: "/diensten" },
      { label: "Request a quote", href: "/offerte" },
      { label: "FAQs", href: "/#faq" },
      { label: "Contact", href: "/contact" },
      { label: "Coffee guide", href: "/gids" },
    ],
    colophon: `© ${new Date().getFullYear()} Branded Baristas. All rights reserved.`,
  },
};

const content: Record<Locale, HomeContent> = { nl, en };

export function getHomeContent(locale: Locale): HomeContent {
  return content[locale];
}
