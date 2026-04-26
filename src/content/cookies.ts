import type { Locale } from "@/lib/i18n/routing";
import type { PrivacyContent } from "./privacy";

const nl: PrivacyContent = {
  hero: {
    eyebrow: "Cookies",
    title: "Cookiebeleid",
    lead: "We gebruiken zo min mogelijk cookies. Hieronder staat precies welke cookies we plaatsen, waarvoor en hoe je ze beheert.",
  },
  lastUpdatedLabel: "Laatst bijgewerkt",
  lastUpdated: "24 april 2026",
  sections: [
    {
      title: "1. Wat zijn cookies?",
      paragraphs: [
        "Cookies zijn kleine tekstbestanden die een website opslaat in je browser. Ze helpen websites om je voorkeuren te onthouden of om te meten hoe bezoekers de site gebruiken.",
      ],
    },
    {
      title: "2. Welke cookies gebruiken wij?",
      paragraphs: [
        "Functioneel — toestemmingsvoorkeur: we slaan je cookie-keuze op in je browser (localStorage, sleutel: cookie_consent). Dit is een technisch noodzakelijke opslag zonder vervaldatum totdat je je cache leegt. Er wordt geen informatie naar externe servers gestuurd.",
        "Analytisch — Google Analytics 4: nadat je toestemming hebt gegeven plaatsen we GA4-cookies (_ga, _ga_XXXXXXXX). Deze cookies meten geanonimiseerd bezoekersgedrag (pagina-views, sessieduur, apparaat). De data wordt bewaard door Google voor maximaal 14 maanden. IP-adressen worden geanonimiseerd voor opslag. We gebruiken Consent Mode v2, waardoor er standaard geen analytische data wordt verzameld zonder je toestemming.",
      ],
    },
    {
      title: "3. Cookies van derden",
      paragraphs: [
        "We maken geen gebruik van advertentiecookies, social media tracking pixels of andere cookies van derden. De enige externe partij die cookies plaatst is Google (GA4), uitsluitend na jouw toestemming.",
      ],
    },
    {
      title: "4. Toestemming beheren",
      paragraphs: [
        "Bij je eerste bezoek vragen we je toestemming via een cookiebanner. Je kunt analytische cookies weigeren zonder dat dit invloed heeft op de werking van de website.",
        "Je toestemming intrekken: verwijder de localStorage-sleutel cookie_consent via de developer tools van je browser (F12 → Application → Local Storage) of verwijder alle sitedata van branded-baristas.com in je browserinstellingen. Bij je volgende bezoek verschijnt de banner opnieuw.",
      ],
    },
    {
      title: "5. Cookiebeheer via browserinstellingen",
      paragraphs: [
        "Je kunt cookies ook beheren of blokkeren via de instellingen van je browser. Houd er rekening mee dat het blokkeren van alle cookies de werking van sommige websites kan beïnvloeden.",
        "Meer informatie over cookiebeheer per browser: Chrome → Instellingen → Privacy en beveiliging → Cookies. Firefox → Instellingen → Privacy & Beveiliging. Safari → Voorkeuren → Privacy.",
      ],
    },
    {
      title: "6. Wijzigingen in dit beleid",
      paragraphs: [
        "We kunnen dit cookiebeleid aanpassen als we nieuwe cookies toevoegen of stoppen met het gebruik ervan. De datum bovenaan geeft aan wanneer het beleid voor het laatst is gewijzigd.",
      ],
    },
  ],
  contact: {
    title: "Vragen over cookies?",
    description: "Neem gerust contact op.",
    email: "hello@branded-baristas.com",
  },
};

const en: PrivacyContent = {
  hero: {
    eyebrow: "Cookies",
    title: "Cookie policy",
    lead: "We use as few cookies as possible. Below you'll find exactly which cookies we place, why, and how to manage them.",
  },
  lastUpdatedLabel: "Last updated",
  lastUpdated: "24 April 2026",
  sections: [
    {
      title: "1. What are cookies?",
      paragraphs: [
        "Cookies are small text files that a website stores in your browser. They help websites remember your preferences or measure how visitors use the site.",
      ],
    },
    {
      title: "2. Which cookies do we use?",
      paragraphs: [
        "Functional — consent preference: we store your cookie choice in your browser (localStorage, key: cookie_consent). This is technically necessary storage with no expiry date until you clear your cache. No information is sent to external servers.",
        "Analytics — Google Analytics 4: after you give consent we place GA4 cookies (_ga, _ga_XXXXXXXX). These cookies measure anonymised visitor behaviour (page views, session duration, device). Data is retained by Google for up to 14 months. IP addresses are anonymised before storage. We use Consent Mode v2, meaning no analytics data is collected by default without your consent.",
      ],
    },
    {
      title: "3. Third-party cookies",
      paragraphs: [
        "We do not use advertising cookies, social media tracking pixels or other third-party cookies. The only external party that places cookies is Google (GA4), solely after your consent.",
      ],
    },
    {
      title: "4. Managing consent",
      paragraphs: [
        "On your first visit we ask for your consent via a cookie banner. You can decline analytics cookies without affecting the functionality of the website.",
        "Withdraw consent: delete the localStorage key cookie_consent via your browser's developer tools (F12 → Application → Local Storage) or clear all site data for branded-baristas.com in your browser settings. The banner will reappear on your next visit.",
      ],
    },
    {
      title: "5. Cookie management via browser settings",
      paragraphs: [
        "You can also manage or block cookies via your browser settings. Note that blocking all cookies may affect how some websites function.",
        "Cookie management per browser: Chrome → Settings → Privacy and security → Cookies. Firefox → Settings → Privacy & Security. Safari → Preferences → Privacy.",
      ],
    },
    {
      title: "6. Changes to this policy",
      paragraphs: [
        "We may update this cookie policy when we add new cookies or stop using existing ones. The date at the top indicates when the policy was last changed.",
      ],
    },
  ],
  contact: {
    title: "Questions about cookies?",
    description: "Feel free to get in touch.",
    email: "hello@branded-baristas.com",
  },
};

const content: Record<Locale, PrivacyContent> = { nl, en };

export function getCookiesContent(locale: Locale): PrivacyContent {
  return content[locale];
}
