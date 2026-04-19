import type { Locale } from "@/lib/i18n/routing";

export type QuoteContent = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    image: string;
  };
  intro: {
    title: string;
    description: string;
    steps: { number: string; title: string; description: string }[];
  };
  form: {
    title: string;
    description: string;
    sections: {
      service: { title: string; options: { value: string; label: string; description: string }[] };
      event: {
        title: string;
        fields: {
          date: string;
          guests: string;
          location: string;
          duration: string;
        };
        placeholders: {
          date: string;
          guests: string;
          location: string;
          duration: string;
        };
      };
      concept: { title: string; description: string };
      contact: {
        title: string;
        fields: { name: string; email: string; phone: string; company: string; message: string };
        placeholders: {
          name: string;
          email: string;
          phone: string;
          company: string;
          message: string;
        };
      };
    };
    submit: string;
    disclaimer: string;
    success: string;
  };
};

const nl: QuoteContent = {
  hero: {
    eyebrow: "Offerte",
    title: "Een indicatie in vijf minuten",
    lead: "Vertel ons over je event of kantoorbehoefte. We maken een indicatieve offerte op maat en komen binnen één werkdag bij je terug.",
    image: "/images/hero/hero-main.png",
  },
  intro: {
    title: "Hoe het werkt",
    description:
      "We werken met vaste concepten en flexibele branding. Onze prijs is een indicatie — de definitieve offerte volgt na een kort afstemmingsgesprek.",
    steps: [
      {
        number: "01",
        title: "Vertel ons wat je nodig hebt",
        description: "Service, datum, gasten, locatie. Hoe concreter, hoe beter.",
      },
      {
        number: "02",
        title: "Kies een concept",
        description: "Mobiele koffiebar, coffee truck, espresso bar of barista service.",
      },
      {
        number: "03",
        title: "Ontvang een indicatie",
        description:
          "Binnen één werkdag sturen we een indicatieve prijs + voorstel van onze planning.",
      },
    ],
  },
  form: {
    title: "Vraag je offerte aan",
    description: "Vul zoveel mogelijk in dat je weet. Ontbrekende velden vullen we samen aan.",
    sections: {
      service: {
        title: "Service",
        options: [
          {
            value: "events",
            label: "Events",
            description: "Mobiele koffiebar, coffee truck, tuk-tuk of losse barista.",
          },
          {
            value: "in-company",
            label: "In-Company",
            description: "Vaste espresso bar, pop-up moment of executive setup.",
          },
          {
            value: "branding",
            label: "Branded activation",
            description: "Concept met volledige merkbranding (cups, art, setup).",
          },
        ],
      },
      event: {
        title: "Event details",
        fields: {
          date: "Datum",
          guests: "Aantal gasten",
          location: "Locatie",
          duration: "Duur",
        },
        placeholders: {
          date: "dd-mm-jjjj",
          guests: "Bijv. 150",
          location: "Stad of adres",
          duration: "Bijv. 4 uur",
        },
      },
      concept: {
        title: "Voorkeur concept",
        description: "Niet zeker? Sla gerust over — we denken graag mee.",
      },
      contact: {
        title: "Je contactgegevens",
        fields: {
          name: "Naam",
          email: "Email",
          phone: "Telefoon",
          company: "Bedrijf",
          message: "Toelichting",
        },
        placeholders: {
          name: "Je volledige naam",
          email: "naam@bedrijf.com",
          phone: "+31 6 ...",
          company: "Bedrijfsnaam",
          message: "Extra context, wensen of vragen…",
        },
      },
    },
    submit: "Offerte aanvragen",
    disclaimer:
      "We sturen binnen één werkdag een indicatieve offerte. Definitieve prijzen worden bepaald na afstemming over concept en planning.",
    success:
      "Bedankt — je aanvraag is binnen. We nemen binnen één werkdag contact op met een indicatieve offerte.",
  },
};

const en: QuoteContent = {
  hero: {
    eyebrow: "Quote",
    title: "An indicative quote in five minutes",
    lead: "Tell us about your event or office needs. We'll build an indicative quote and get back to you within one business day.",
    image: "/images/hero/hero-main.png",
  },
  intro: {
    title: "How it works",
    description:
      "We work with fixed concepts and flexible branding. The price is indicative — the final quote follows a short alignment call.",
    steps: [
      {
        number: "01",
        title: "Tell us what you need",
        description: "Service, date, guests, location. The more concrete, the better.",
      },
      {
        number: "02",
        title: "Pick a concept",
        description: "Mobile coffee bar, coffee truck, espresso bar or barista service.",
      },
      {
        number: "03",
        title: "Receive an indication",
        description:
          "Within one business day we'll send an indicative price and planning proposal.",
      },
    ],
  },
  form: {
    title: "Request your quote",
    description: "Fill in what you already know. We'll complete the rest together.",
    sections: {
      service: {
        title: "Service",
        options: [
          {
            value: "events",
            label: "Events",
            description: "Mobile coffee bar, coffee truck, tuk-tuk or individual barista.",
          },
          {
            value: "in-company",
            label: "In-Company",
            description: "Fixed espresso bar, pop-up moment or executive setup.",
          },
          {
            value: "branding",
            label: "Branded activation",
            description: "Concept with full brand treatment (cups, art, setup).",
          },
        ],
      },
      event: {
        title: "Event details",
        fields: {
          date: "Date",
          guests: "Number of guests",
          location: "Location",
          duration: "Duration",
        },
        placeholders: {
          date: "dd-mm-yyyy",
          guests: "e.g. 150",
          location: "City or address",
          duration: "e.g. 4 hours",
        },
      },
      concept: {
        title: "Preferred concept",
        description: "Not sure? Skip it — we love thinking along.",
      },
      contact: {
        title: "Your contact details",
        fields: {
          name: "Name",
          email: "Email",
          phone: "Phone",
          company: "Company",
          message: "Notes",
        },
        placeholders: {
          name: "Your full name",
          email: "name@company.com",
          phone: "+31 6 ...",
          company: "Company name",
          message: "Extra context, wishes or questions…",
        },
      },
    },
    submit: "Request quote",
    disclaimer:
      "We'll send an indicative quote within one business day. Final prices are set after alignment on concept and planning.",
    success:
      "Thanks — we've received your request. We'll be in touch within one business day with an indicative quote.",
  },
};

export function getQuoteContent(locale: Locale): QuoteContent {
  return locale === "en" ? en : nl;
}
