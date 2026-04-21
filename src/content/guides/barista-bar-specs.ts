import type { Locale } from "@/lib/i18n/routing";
import type { GuideContent } from "./coffee-catering";

const nl: GuideContent = {
  title: "Gids: barista bar specs",
  lead: "Technische specificaties van onze mobiele koffiebars — afmetingen, stroom, capaciteit en tijdsplanning.",
  intro: [
    "Deze pagina bundelt alle harde specs van de mobiele setups van Branded Baristas. Gebruik het als referentie bij venue-checks, tenderdocumenten of offerteaanvragen.",
    "Alle cijfers zijn actuele waarden uit onze operationele handleiding. Voor event-specifieke vragen (generator-vereisten, trapgangen, laad- en lostijden) kunnen we een bezoek aan de locatie inplannen.",
  ],
  sections: [
    {
      id: "piaggio-ape",
      heading: "Piaggio Ape mobiele koffiebar",
      body: [
        "Afmetingen: 300 cm × 150 cm × 200 cm (L × B × H). Totaalgewicht circa 680 kg.",
        "Stroom: 1× 230V / 16A geaard stopcontact, dedicated circuit.",
        "Water: interne tank van 20 liter + afvaltank van 20 liter; directe toevoer optioneel.",
        "Capaciteit: 60–120 specialty koffies per uur per barista, afhankelijk van menu.",
        "Opbouwtijd: 60–90 minuten. Afbouwtijd: 45 minuten.",
        "Minimale toegangsbreedte: 155 cm vrije opening van straat tot standplaats. Stoepranden tot 6 cm overkomen we zelfstandig, hoger vraagt een rijplaat.",
      ],
    },
    {
      id: "piaggio-tuk-tuk",
      heading: "Piaggio tuk-tuk",
      body: [
        "Afmetingen: 300 cm × 140 cm × 195 cm (L × B × H). Open zijwanden voor snelle service.",
        "Stroom: 1× 230V / 16A, dedicated circuit. Aggregaat beschikbaar voor off-grid events (+€ 250/dag).",
        "Bedoeld voor buitenevenementen; bij serieuze regen een eventcanopy aanbevolen.",
        "Capaciteit identiek aan de Piaggio Ape: 60–120 koffies per uur per barista.",
      ],
    },
    {
      id: "vintage-truck",
      heading: "1969 Commer Coffee Truck",
      body: [
        "Afmetingen: 480 cm × 200 cm × 250 cm (L × B × H). Minimale standplaats: 4 × 5 m op harde ondergrond.",
        "Stroom: 1× 230V / 16A of aggregaat. Extra cold brew tap vraagt een tweede circuit.",
        "Twee servicevensters voor dubbele gasten-flow; ideaal voor festivals en launches.",
        "Capaciteit: tot 180 koffies per uur bij dubbele barista-bezetting.",
      ],
    },
    {
      id: "office-espresso-bar",
      heading: "Office espresso bar",
      body: [
        "Afmetingen: variabel, standaard 180 cm × 80 cm × 100 cm. Past op elke tafel of ontvangstbalie.",
        "Stroom: 1× 230V / 16A stopcontact.",
        "Capaciteit: 60–100 koffies per uur per barista; geschikt voor teams tot ~250 gelijktijdige gasten.",
        "Standaard cadans: 1 ochtend per week van 3–4 uur. Andere ritmes op aanvraag.",
      ],
    },
    {
      id: "equipment",
      heading: "Apparatuur en hardware",
      body: [
        "Espressomachine: 2-groeps Victoria Arduino Eagle One (dual boiler, PID-regeling).",
        "Molen: Mahlkönig E65S GbW (gewicht-gebaseerd doseren voor dose-consistentie onder 0,2 g).",
        "Melk: gekoelde ijsemmer of display fridge; standaard haver-, soja- en amandelmelk.",
        "Cups: composteerbaar (standaard) of herbruikbaar keramiek (op aanvraag).",
      ],
    },
    {
      id: "coffee",
      heading: "Koffie en bonen",
      body: [
        "Single-origin seizoensblend van specialty-grade bonen (SCA-score 84+).",
        "Bonen worden geleverd binnen 10–14 dagen na branding, voor optimale smaak.",
        "Menu signature: een flat white wordt geserveerd op 58°C met 150 ml melk — een bewuste afwijking van de Italiaanse standaard die beter werkt bij een corporate doelgroep.",
      ],
    },
    {
      id: "staffing",
      heading: "Staffing en planning",
      body: [
        "Eén barista per 100–120 gelijktijdige gasten. Vanaf 300 gasten plannen we standaard twee barista's plus een runner voor cups en melk.",
        "Alle barista's zijn in vast of vast-contract dienstverband en zijn getraind op Branded Baristas hospitality-standaarden (eye contact, begroeting, naam vragen, dankzeggen).",
        "Dag-inzet: maximaal 10 uur op locatie inclusief opbouw, service en afbouw.",
      ],
    },
  ],
  cta: {
    title: "Specs vertalen naar jouw event?",
    description:
      "Stuur ons je event-brief — we matchen de juiste setup en barista-bezetting aan je programma en geven een tariefindicatie.",
    label: "Offerte aanvragen",
  },
  updated: "2026-04-15",
  readingTimeMinutes: 7,
};

const en: GuideContent = {
  title: "Guide: barista bar specs",
  lead: "Technical specifications of our mobile coffee bars — dimensions, power, capacity and time planning.",
  intro: [
    "This page bundles every hard spec of the Branded Baristas mobile setups. Use it as a reference during venue checks, RFPs or quote requests.",
    "All numbers are current values from our operational playbook. For event-specific questions (generator requirements, stairwells, loading windows) we can schedule a site visit.",
  ],
  sections: [
    {
      id: "piaggio-ape",
      heading: "Piaggio Ape mobile coffee bar",
      body: [
        "Dimensions: 300 cm × 150 cm × 200 cm (L × W × H). Total weight approximately 680 kg.",
        "Power: 1× 230V / 16A grounded socket, dedicated circuit.",
        "Water: internal 20-litre tank + 20-litre waste tank; direct supply optional.",
        "Capacity: 60–120 specialty coffees per hour per barista, depending on the menu.",
        "Setup time: 60–90 minutes. Breakdown time: 45 minutes.",
        "Minimum access width: 155 cm clearance from street to pitch. Kerbs up to 6 cm we handle ourselves, anything higher needs a ramp.",
      ],
    },
    {
      id: "piaggio-tuk-tuk",
      heading: "Piaggio tuk-tuk",
      body: [
        "Dimensions: 300 cm × 140 cm × 195 cm (L × W × H). Open side panels for fast service.",
        "Power: 1× 230V / 16A, dedicated circuit. Generator available for off-grid events (+ EUR 250/day).",
        "Designed for outdoor events; during heavy rain an event canopy is recommended.",
        "Capacity identical to the Piaggio Ape: 60–120 coffees per hour per barista.",
      ],
    },
    {
      id: "vintage-truck",
      heading: "1969 Commer coffee truck",
      body: [
        "Dimensions: 480 cm × 200 cm × 250 cm (L × W × H). Minimum pitch: 4 × 5 m on hard surface.",
        "Power: 1× 230V / 16A or generator. An extra cold brew tap requires a second circuit.",
        "Two service windows for dual guest flow; ideal for festivals and launches.",
        "Capacity: up to 180 coffees per hour with double barista staffing.",
      ],
    },
    {
      id: "office-espresso-bar",
      heading: "Office espresso bar",
      body: [
        "Dimensions: variable, standard 180 cm × 80 cm × 100 cm. Fits any table or reception desk.",
        "Power: 1× 230V / 16A socket.",
        "Capacity: 60–100 coffees per hour per barista; suitable for teams up to ~250 concurrent guests.",
        "Default cadence: 1 morning per week, 3–4 hours. Other rhythms on request.",
      ],
    },
    {
      id: "equipment",
      heading: "Equipment and hardware",
      body: [
        "Espresso machine: 2-group Victoria Arduino Eagle One (dual boiler, PID control).",
        "Grinder: Mahlkönig E65S GbW (weight-based dosing for dose consistency below 0.2 g).",
        "Milk: chilled ice bucket or display fridge; default oat, soy and almond milk.",
        "Cups: compostable (default) or reusable ceramic (on request).",
      ],
    },
    {
      id: "coffee",
      heading: "Coffee and beans",
      body: [
        "Single-origin seasonal blend of specialty-grade beans (SCA score 84+).",
        "Beans are delivered within 10–14 days of roasting for peak flavour.",
        "Signature menu: flat whites are served at 58 °C with 150 ml of milk — a deliberate deviation from the Italian standard that works better with a corporate audience.",
      ],
    },
    {
      id: "staffing",
      heading: "Staffing and planning",
      body: [
        "One barista per 100–120 concurrent guests. Above 300 guests we routinely plan two baristas plus a runner for cups and milk.",
        "All baristas are permanent or fixed-contract employees trained to Branded Baristas hospitality standards (eye contact, greeting, asking the name, thanking).",
        "Day deployment: maximum 10 hours on site including setup, service and breakdown.",
      ],
    },
  ],
  cta: {
    title: "Translate these specs to your event?",
    description:
      "Send us your event brief — we'll match the right setup and barista staffing to your programme and give an indicative price.",
    label: "Request a quote",
  },
  updated: "2026-04-15",
  readingTimeMinutes: 7,
};

export function getBaristaBarSpecsGuide(locale: Locale): GuideContent {
  return locale === "en" ? en : nl;
}
