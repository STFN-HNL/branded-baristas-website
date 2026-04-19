import type { Locale } from "@/lib/i18n/routing";

export type ContactContent = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    image: string;
  };
  info: {
    title: string;
    description: string;
    email: { label: string; value: string };
    phone: { label: string; value: string };
    address: { label: string; lines: string[] };
    hours: { label: string; value: string };
  };
  form: {
    title: string;
    description: string;
    fields: {
      name: string;
      email: string;
      phone: string;
      company: string;
      subject: string;
      message: string;
    };
    placeholders: {
      name: string;
      email: string;
      phone: string;
      company: string;
      subject: string;
      message: string;
    };
    submit: string;
    disclaimer: string;
  };
};

const nl: ContactContent = {
  hero: {
    eyebrow: "Contact",
    title: "Laten we samen een koffiemoment bouwen",
    lead: "Heb je een event, kantoor of brand activation in gedachten? Stuur een bericht — we denken graag mee en reageren binnen één werkdag.",
    image: "/images/hero/hero-main.png",
  },
  info: {
    title: "Zo bereik je ons",
    description:
      "We zijn het snelst bereikbaar via email. Voor directe vragen kun je ook bellen tijdens kantooruren.",
    email: { label: "Email", value: "hello@branded-baristas.com" },
    phone: { label: "Telefoon", value: "+31 (0)10 123 45 67" },
    address: {
      label: "Adres",
      lines: ["Branded Baristas HQ", "Keilestraat 9F", "3029 BP Rotterdam"],
    },
    hours: { label: "Openingsuren", value: "Ma–Vr · 09:00 – 18:00" },
  },
  form: {
    title: "Stuur ons een bericht",
    description: "Vertel ons wat je in gedachten hebt. Hoe concreter, hoe beter we kunnen meedenken.",
    fields: {
      name: "Naam",
      email: "Email",
      phone: "Telefoon",
      company: "Bedrijf",
      subject: "Onderwerp",
      message: "Bericht",
    },
    placeholders: {
      name: "Je volledige naam",
      email: "naam@bedrijf.com",
      phone: "+31 6 ...",
      company: "Bedrijfsnaam",
      subject: "Waar gaat het over?",
      message: "Vertel ons over je event of kantoorbehoefte…",
    },
    submit: "Verzenden",
    disclaimer:
      "Door het formulier te versturen ga je akkoord met ons privacybeleid. We gebruiken je gegevens uitsluitend om contact op te nemen.",
  },
};

const en: ContactContent = {
  hero: {
    eyebrow: "Contact",
    title: "Let's build a coffee moment together",
    lead: "Got an event, office, or brand activation in mind? Send a message — we love to think along and respond within one business day.",
    image: "/images/hero/hero-main.png",
  },
  info: {
    title: "How to reach us",
    description:
      "Email is the fastest way to reach us. For urgent questions, you can also call during office hours.",
    email: { label: "Email", value: "hello@branded-baristas.com" },
    phone: { label: "Phone", value: "+31 (0)10 123 45 67" },
    address: {
      label: "Address",
      lines: ["Branded Baristas HQ", "Keilestraat 9F", "3029 BP Rotterdam"],
    },
    hours: { label: "Office hours", value: "Mon–Fri · 09:00 – 18:00" },
  },
  form: {
    title: "Send us a message",
    description: "Tell us what you have in mind. The more concrete, the better we can think along.",
    fields: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      subject: "Subject",
      message: "Message",
    },
    placeholders: {
      name: "Your full name",
      email: "name@company.com",
      phone: "+31 6 ...",
      company: "Company name",
      subject: "What's it about?",
      message: "Tell us about your event or office needs…",
    },
    submit: "Send",
    disclaimer:
      "By submitting this form you agree to our privacy policy. We only use your data to respond to your message.",
  },
};

export function getContactContent(locale: Locale): ContactContent {
  return locale === "en" ? en : nl;
}
