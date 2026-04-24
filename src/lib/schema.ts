import { type Locale } from "@/lib/i18n/routing";
import { localeUrl, siteOrigin, SITE_NAME } from "@/lib/seo";

type JsonLd = Record<string, unknown>;

const LEGAL_NAME = "Branded Baristas B.V.";
const ADDRESS_LOCALITY = "Zoetermeer";
const STREET = "Albert Schweitzersingel 91";
const POSTAL_CODE = "2719 DZ";
const COUNTRY = "NL";
const PHONE = "+31-6-41697775";
const EMAIL = "hello@branded-baristas.com";

export function organizationSchema(locale: Locale): JsonLd {
  const origin = siteOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${origin}/#organization`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: `${origin}/${locale}`,
    logo: `${origin}/logo/mark.svg`,
    email: EMAIL,
    telephone: PHONE,
    address: {
      "@type": "PostalAddress",
      streetAddress: STREET,
      addressLocality: ADDRESS_LOCALITY,
      postalCode: POSTAL_CODE,
      addressCountry: COUNTRY,
    },
    sameAs: [
      "https://www.instagram.com/branded_baristas/",
      "https://www.linkedin.com/company/branded-baristas/",
    ],
    areaServed: ["NL", "BE", "DE", "LU", "FR", "UK"],
  };
}

export function localBusinessSchema(locale: Locale): JsonLd {
  const origin = siteOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${origin}/#local-business`,
    name: SITE_NAME,
    image: `${origin}/opengraph-image`,
    url: `${origin}/${locale}`,
    telephone: PHONE,
    email: EMAIL,
    priceRange: "€€-€€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: STREET,
      addressLocality: ADDRESS_LOCALITY,
      postalCode: POSTAL_CODE,
      addressCountry: COUNTRY,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.0575,
      longitude: 4.4931,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: ["NL", "BE", "DE", "LU", "FR", "UK"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "en" ? "Coffee catering services" : "Koffiecatering diensten",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile coffee bar",
            url: `${origin}/${locale}/diensten/events/mobile-coffee-bar`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Piaggio tuk-tuk coffee bar",
            url: `${origin}/${locale}/diensten/events/piaggio-tuk-tuk`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Office espresso bar",
            url: `${origin}/${locale}/diensten/in-company/espresso-bar`,
          },
        },
      ],
    },
  };
}

export function websiteSchema(locale: Locale): JsonLd {
  const origin = siteOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    name: SITE_NAME,
    url: `${origin}/${locale}`,
    inLanguage: locale === "en" ? "en-GB" : "nl-NL",
    publisher: { "@id": `${origin}/#organization` },
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(
  locale: Locale,
  trail: { name: string; path: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((node, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: node.name,
      item: localeUrl(locale, node.path),
    })),
  };
}

export function serviceSchema(locale: Locale, params: {
  name: string;
  description: string;
  path: string;
  image?: string;
}): JsonLd {
  const origin = siteOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: params.name,
    name: params.name,
    description: params.description,
    provider: { "@id": `${origin}/#organization` },
    url: localeUrl(locale, params.path),
    image: params.image ? `${origin}${params.image}` : undefined,
    areaServed: ["NL", "BE", "DE", "LU", "FR", "UK"],
  };
}

export function articleSchema(params: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}): JsonLd {
  const origin = siteOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.description,
    image: params.image ? `${origin}${params.image}` : undefined,
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? params.datePublished,
    author: params.authorName
      ? { "@type": "Person", name: params.authorName }
      : { "@id": `${origin}/#organization` },
    publisher: { "@id": `${origin}/#organization` },
    mainEntityOfPage: localeUrl(params.locale, params.path),
  };
}
