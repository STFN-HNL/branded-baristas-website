import type { Locale } from "@/lib/i18n/routing";

export type GuideSection = {
  /** Stable anchor id — shared across locales so deep links don't break per language */
  id: string;
  heading: string;
  body: string[];
};

export type GuideContent = {
  title: string;
  lead: string;
  intro: string[];
  sections: GuideSection[];
  cta: { title: string; description: string; label: string };
  updated: string;
  readingTimeMinutes: number;
};

const nl: GuideContent = {
  title: "Gids: koffiecatering voor zakelijke events",
  lead: "Wat een professionele koffiemoment onderscheidt van een gewone koffiebar — en hoe je de juiste opzet kiest voor jouw event.",
  intro: [
    "Deze gids geeft je een volledig overzicht van koffiecatering voor zakelijke events, brand activations en op kantoor. We behandelen setups, capaciteit, pricing, menu, logistiek en branding — zodat je in één keer kunt inschatten wat past bij jouw event.",
    "Branded Baristas werkt sinds 2013 met merken als Adidas, ING en BCG. Alle cijfers in deze gids komen uit onze eigen operaties en zijn realistische benchmarks die je in een offerteaanvraag kunt hanteren.",
  ],
  sections: [
    {
      id: "when-to-hire",
      heading: "Wanneer huur je een koffiecateraar in?",
      body: [
        "Koffiecatering is zinvol zodra koffie een touchpoint is in de beleving — niet slechts een dorstlesser. Denk aan brand activations, productlaunches, medewerkerevents, VIP-lunches, conferenties en meerdaagse bedrijfsbijeenkomsten.",
        "Een vuistregel: vanaf ongeveer 50 gasten met een service-raam van een uur of meer is een professionele barista efficiënter en kwalitatiever dan een thermoskan of automaat. Onder 50 gasten is een barista vooral waardevol als het event branding of hospitality-doelen heeft.",
      ],
    },
    {
      id: "setups",
      heading: "Setups: welke vorm past bij welk event?",
      body: [
        "Mobiele koffiebar (Piaggio Ape, ~3 × 1,5 × 2 m): compacte eyecatcher, binnen én buiten bruikbaar, één 230V / 16A-aansluiting voldoende. Ideaal voor 50–300 gasten per barista voor events van 3–5 uur.",
        "Piaggio tuk-tuk: buitengericht, perfect voor drive-through activaties en festivals. Zelfde power-eisen.",
        "Vintage koffietruck (1969 Commer): statement-piece op wielen voor launches en festivals. Vraagt een toegankelijke buitenlocatie van circa 4 × 5 m.",
        "Office espresso bar: terugkerend, wekelijks of maandelijks on-site op kantoor. Ideaal voor teams van 20 tot 1.000+ medewerkers.",
      ],
    },
    {
      id: "capacity",
      heading: "Capaciteit: hoeveel koffies per uur?",
      body: [
        "Een getrainde barista zet gemiddeld 60 tot 120 specialty koffies per uur. De bandbreedte hangt af van menucomplexiteit (flat whites en lattes vragen meer melkwerk), batch-verhoudingen en de piekintensiteit van je event.",
        "Voor events boven 300 gasten plannen we standaard twee barista's en vaak een tweede espressomachine om wachttijden onder de drie minuten te houden. Voor conferenties met koffiepauzes van 20–30 minuten rekenen we op één barista per 100–120 gelijktijdige gasten.",
      ],
    },
    {
      id: "pricing",
      heading: "Pricing: vast dagtarief in plaats van per kop",
      body: [
        "Koffiecatering op professioneel niveau wordt vrijwel altijd geprijsd als een vast dagtarief, niet per kop. Dat voorkomt afrekening achteraf en zorgt dat gasten onbeperkt kunnen bestellen zonder dat organisators zich zorgen maken over de factuur.",
        "Het tarief hangt af van: het gekozen concept, het aantal barista's, de event-duur, eventuele branding en de reisafstand. Indicatief ligt een mobiele koffiebar-dag in Nederland tussen EUR 1.500 en EUR 3.500 exclusief BTW en branding.",
      ],
    },
    {
      id: "menu",
      heading: "Menukaart en smaakprofiel",
      body: [
        "Een standaard menu bevat espresso, cappuccino, flat white, latte, Americano, espresso macchiato en cortado. Daarnaast is het aan te raden een filterkoffie, cold brew of signature drink op te nemen om de keuze te verbreden.",
        "Werk met specialty-grade bonen (SCA-score 80+) en plantaardige melken (haver, soja, amandel). Het verschil met commerciële bonen is merkbaar vanaf de eerste slok — gasten onthouden de koffie juist doordat hij niet lijkt op kantoorkoffie.",
      ],
    },
    {
      id: "logistics",
      heading: "Logistiek: wat moet je regelen?",
      body: [
        "Stroom: één 230V / 16A stopcontact per espressomachine volstaat. Check bij buitenlocaties of het stopcontact volledig toegewezen is; gedeelde fasen leiden tot trage opwarming.",
        "Water: een directe watertoevoer is prettig maar niet vereist. Alle Branded Baristas-setups hebben een interne watertank als backup.",
        "Opbouwtijd: reken op 60–90 minuten voor opbouw en 45 minuten voor afbouw en schoonmaak. Plan dit in met de venue zodat de barista's vóór gasten-aankomst klaar staan.",
      ],
    },
    {
      id: "branding",
      heading: "Branding: de koffiemoment als brand-touchpoint",
      body: [
        "Alles aan het koffiemoment kan branden: cups en sleeves, latte-art stencils, barstyling, uniforms, signage en menukaarten. Lead-tijd voor branded materialen is typisch 2–3 weken, met rush-productie voor een meerprijs.",
        "Een signature drink (zoals een branded iced latte voor een zomerlaunch) is vaak dé social share-motor van een event. Onze barista-playbooks slaan het recept en de presentatie vast zodat het exact hetzelfde smaakt op elke locatie.",
      ],
    },
    {
      id: "common-mistakes",
      heading: "Veelgemaakte fouten",
      body: [
        "Te weinig barista's inplannen: onder-capaciteit leidt tot rijen van 10 minuten+ en frustratie. Volg de capaciteitsregel (één barista per 100–120 gelijktijdige gasten).",
        "Stroom onderschatten: een gedeeld contact met andere apparatuur kan de machine trager maken. Vraag een dedicated circuit aan.",
        "Branding te laat aanleveren: cups en uniforms vragen productietijd. Plan branding in bij het tekenen van de offerte, niet in de week vóór het event.",
      ],
    },
  ],
  cta: {
    title: "Plannen we jouw koffiemoment?",
    description:
      "Vraag een indicatieve offerte aan — je ontvangt binnen één werkdag een voorstel op maat voor jouw event.",
    label: "Offerte aanvragen",
  },
  updated: "2026-04-15",
  readingTimeMinutes: 9,
};

const en: GuideContent = {
  title: "Guide: corporate coffee catering",
  lead: "What separates professional coffee catering from a regular coffee bar — and how to choose the right setup for your event.",
  intro: [
    "This guide gives a full overview of coffee catering for corporate events, brand activations and the office. We cover setups, capacity, pricing, menu, logistics and branding — so you can judge at a glance what fits your event.",
    "Branded Baristas has worked with brands like Adidas, ING and BCG since 2013. Every number in this guide comes from our own operations and is a realistic benchmark you can use in an RFP.",
  ],
  sections: [
    {
      id: "when-to-hire",
      heading: "When do you hire a coffee caterer?",
      body: [
        "Coffee catering makes sense whenever coffee is a touchpoint in the experience — not just a thirst quencher. Think brand activations, product launches, employee events, VIP lunches, conferences and multi-day company off-sites.",
        "Rule of thumb: from around 50 guests with a service window of an hour or more, a professional barista is more efficient and higher quality than a thermos or vending machine. Below 50 guests, a barista is mainly useful when the event has branding or hospitality goals.",
      ],
    },
    {
      id: "setups",
      heading: "Setups: which format fits which event?",
      body: [
        "Mobile coffee bar (Piaggio Ape, ~3 × 1.5 × 2 m): compact eye-catcher, works indoors and outdoors, a single 230V / 16A socket is enough. Ideal for 50–300 guests per barista over 3–5 hour events.",
        "Piaggio tuk-tuk: outdoor-first, perfect for drive-through activations and festivals. Same power requirements.",
        "Vintage coffee truck (1969 Commer): statement piece on wheels for launches and festivals. Needs an accessible outdoor spot of around 4 × 5 m.",
        "Office espresso bar: recurring weekly or monthly on-site service. Ideal for teams of 20 to 1,000+ employees.",
      ],
    },
    {
      id: "capacity",
      heading: "Capacity: how many coffees per hour?",
      body: [
        "A trained barista serves 60 to 120 specialty coffees per hour on average. The range depends on menu complexity (flat whites and lattes need more milk work), batch ratios and peak intensity of your event.",
        "For events over 300 guests we routinely plan two baristas and often a second espresso machine to keep wait times under three minutes. For conferences with 20–30 minute coffee breaks we plan one barista per 100–120 concurrent guests.",
      ],
    },
    {
      id: "pricing",
      heading: "Pricing: fixed day rate instead of per cup",
      body: [
        "Professional coffee catering is almost always priced as a fixed day rate, not per cup. That avoids a billing surprise afterwards and lets guests order freely without organisers worrying about the invoice.",
        "The rate depends on: chosen concept, number of baristas, event duration, branding elements and travel distance. Indicatively, a mobile coffee bar day in the Netherlands sits between EUR 1,500 and EUR 3,500 excluding VAT and branding.",
      ],
    },
    {
      id: "menu",
      heading: "Menu and flavour profile",
      body: [
        "A standard menu includes espresso, cappuccino, flat white, latte, Americano, espresso macchiato and cortado. It is a good idea to add a filter coffee, cold brew or signature drink to broaden the range.",
        "Work with specialty-grade beans (SCA score 80+) and plant-based milks (oat, soy, almond). The difference versus commercial beans is noticeable from the first sip — guests remember the coffee precisely because it doesn't taste like office coffee.",
      ],
    },
    {
      id: "logistics",
      heading: "Logistics: what do you need to arrange?",
      body: [
        "Power: one 230V / 16A socket per espresso machine is enough. At outdoor venues confirm the socket is dedicated; shared phases lead to slow warm-up.",
        "Water: a direct water supply is nice but not required. Every Branded Baristas setup has an internal water tank as backup.",
        "Setup time: expect 60–90 minutes for setup and 45 minutes for breakdown and cleaning. Plan this in with the venue so baristas are ready before guests arrive.",
      ],
    },
    {
      id: "branding",
      heading: "Branding: the coffee moment as a brand touchpoint",
      body: [
        "Everything about the coffee moment can be branded: cups and sleeves, latte-art stencils, bar styling, uniforms, signage and menu cards. Lead time for branded materials is typically 2–3 weeks, with rush production at a surcharge.",
        "A signature drink (like a branded iced latte for a summer launch) is often the social-share engine of an event. Our barista playbooks lock in the recipe and presentation so it tastes exactly the same at every location.",
      ],
    },
    {
      id: "common-mistakes",
      heading: "Common mistakes",
      body: [
        "Planning too few baristas: under-capacity leads to 10-minute lines and frustration. Follow the capacity rule (one barista per 100–120 concurrent guests).",
        "Underestimating power: a shared circuit with other equipment can slow the machine down. Ask for a dedicated circuit.",
        "Submitting branding too late: cups and uniforms need production time. Lock in branding when you sign the quote, not the week before the event.",
      ],
    },
  ],
  cta: {
    title: "Shall we plan your coffee moment?",
    description:
      "Request an indicative quote — you'll receive a tailored proposal for your event within one business day.",
    label: "Request a quote",
  },
  updated: "2026-04-15",
  readingTimeMinutes: 9,
};

export function getCoffeeCateringGuide(locale: Locale): GuideContent {
  return locale === "en" ? en : nl;
}
