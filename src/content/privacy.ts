import type { Locale } from "@/lib/i18n/routing";

export type PrivacySection = {
  title: string;
  paragraphs: string[];
};

export type PrivacyContent = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  lastUpdatedLabel: string;
  lastUpdated: string;
  sections: PrivacySection[];
  contact: {
    title: string;
    description: string;
    email: string;
  };
};

const nl: PrivacyContent = {
  hero: {
    eyebrow: "Privacy",
    title: "Privacybeleid",
    lead: "We gaan zorgvuldig om met je gegevens. Hieronder leggen we uit welke gegevens we verzamelen, waarom en hoe lang.",
  },
  lastUpdatedLabel: "Laatst bijgewerkt",
  lastUpdated: "24 april 2026",
  sections: [
    {
      title: "1. Wie we zijn",
      paragraphs: [
        "Branded Baristas is een eenmanszaak gevestigd te Albert Schweitzersingel 91, 2719 DZ Zoetermeer, Nederland (KvK-nummer: 74669907). Wij verzorgen barista-services voor events en in-company setups. Voor vragen over dit privacybeleid kun je contact opnemen via hello@branded-baristas.com.",
      ],
    },
    {
      title: "2. Welke gegevens we verzamelen",
      paragraphs: [
        "We verzamelen alleen gegevens die je zelf aan ons verstrekt via ons contact- of offerteformulier: naam, emailadres, telefoonnummer, bedrijfsnaam, en de inhoud van je bericht.",
        "Daarnaast verzamelen we geanonimiseerde analytics-data via Google Analytics 4 (pagina-views, bezoektijd, apparaat) uitsluitend nadat je daar via ons cookie-consent toestemming voor hebt gegeven.",
      ],
    },
    {
      title: "3. Waarvoor we gegevens gebruiken",
      paragraphs: [
        "Je contactgegevens gebruiken we uitsluitend om te reageren op je aanvraag, een offerte op te stellen en indien gewenst een opdracht uit te voeren.",
        "Analytics-data gebruiken we om onze website te verbeteren en te begrijpen welke pagina's relevant zijn voor bezoekers.",
      ],
    },
    {
      title: "4. Hoe lang we gegevens bewaren",
      paragraphs: [
        "Contactgegevens uit ons offerteformulier bewaren we maximaal 24 maanden na laatste contact. Als er een commerciële relatie ontstaat, bewaren we de gegevens zolang dat wettelijk nodig is voor onze administratie (tot 7 jaar).",
        "Analytics-data wordt na 14 maanden automatisch geanonimiseerd of verwijderd.",
      ],
    },
    {
      title: "5. Met wie we gegevens delen",
      paragraphs: [
        "We delen je gegevens niet met derden, tenzij dat strikt nodig is voor de uitvoering van je opdracht (bijvoorbeeld een locatie-eigenaar of subcontractor). In alle gevallen maken we dan een verwerkersovereenkomst.",
        "Onze technische dienstverleners zijn verwerkers onder AVG-overeenkomst: Resend (emailverzending), Supabase (gegevensopslag), Railway (hosting) en Google (Analytics 4 — uitsluitend na jouw toestemming).",
      ],
    },
    {
      title: "6. Jouw rechten",
      paragraphs: [
        "Je hebt het recht om je gegevens in te zien, te corrigeren of te laten verwijderen. Ook kun je bezwaar maken tegen verwerking of je toestemming intrekken. Stuur daarvoor een bericht naar hello@branded-baristas.com.",
        "Als je een klacht hebt over hoe we met je gegevens omgaan, kun je die indienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).",
      ],
    },
    {
      title: "7. Cookies",
      paragraphs: [
        "Onze site gebruikt alleen functionele cookies (noodzakelijk voor werking) en optionele analytics-cookies. Je ziet bij je eerste bezoek een consent-banner waarmee je toestemming kunt geven of weigeren.",
      ],
    },
    {
      title: "8. Wijzigingen",
      paragraphs: [
        "We kunnen dit privacybeleid aanpassen wanneer onze werkwijze of wetgeving verandert. De datum bovenaan deze pagina toont altijd de laatste update.",
      ],
    },
  ],
  contact: {
    title: "Vragen over privacy?",
    description:
      "Stuur ons een bericht via het onderstaande adres. We reageren binnen één werkdag.",
    email: "hello@branded-baristas.com",
  },
};

const en: PrivacyContent = {
  hero: {
    eyebrow: "Privacy",
    title: "Privacy policy",
    lead: "We handle your data with care. Below we explain what we collect, why, and how long we keep it.",
  },
  lastUpdatedLabel: "Last updated",
  lastUpdated: "24 April 2026",
  sections: [
    {
      title: "1. Who we are",
      paragraphs: [
        "Branded Baristas is a sole proprietorship (eenmanszaak) registered at Albert Schweitzersingel 91, 2719 DZ Zoetermeer, Netherlands (KvK: 74669907). We provide barista services for events and in-company setups. For questions about this privacy policy, reach us at hello@branded-baristas.com.",
      ],
    },
    {
      title: "2. What data we collect",
      paragraphs: [
        "We only collect data you provide yourself through our contact or quote form: name, email address, phone number, company name, and the content of your message.",
        "We also collect anonymised analytics data via Google Analytics 4 (page views, session time, device) only after you grant consent via our cookie banner.",
      ],
    },
    {
      title: "3. Why we use data",
      paragraphs: [
        "We use your contact data exclusively to respond to your request, draft a quote, and — if agreed — deliver the service.",
        "Analytics data helps us improve our website and understand which pages matter to visitors.",
      ],
    },
    {
      title: "4. How long we keep data",
      paragraphs: [
        "Contact data from our quote form is retained for a maximum of 24 months after last contact. If a commercial relationship is established, we keep data as long as legally required for our accounting (up to 7 years).",
        "Analytics data is automatically anonymised or deleted after 14 months.",
      ],
    },
    {
      title: "5. Who we share data with",
      paragraphs: [
        "We don't share your data with third parties unless strictly necessary for delivering your project (e.g. a venue owner or subcontractor). In all such cases we sign a data processing agreement.",
        "Our technical providers are processors under GDPR agreement: Resend (email delivery), Supabase (data storage), Railway (hosting), and Google (Analytics 4 — only after your consent).",
      ],
    },
    {
      title: "6. Your rights",
      paragraphs: [
        "You have the right to access, correct or delete your data. You can also object to processing or withdraw consent. Contact us at hello@branded-baristas.com.",
        "If you have a complaint about how we handle your data, you can file it with the Dutch Data Protection Authority (autoriteitpersoonsgegevens.nl).",
      ],
    },
    {
      title: "7. Cookies",
      paragraphs: [
        "Our site only uses functional cookies (required for operation) and optional analytics cookies. On your first visit you'll see a consent banner to grant or decline.",
      ],
    },
    {
      title: "8. Changes",
      paragraphs: [
        "We may update this privacy policy when our practices or legislation change. The date at the top of this page always reflects the most recent update.",
      ],
    },
  ],
  contact: {
    title: "Questions about privacy?",
    description: "Send us a message at the address below. We respond within one business day.",
    email: "hello@branded-baristas.com",
  },
};

export function getPrivacyContent(locale: Locale): PrivacyContent {
  return locale === "en" ? en : nl;
}
