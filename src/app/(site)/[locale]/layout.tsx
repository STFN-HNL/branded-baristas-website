import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Fraunces, Questrial } from "next/font/google";
import localFont from "next/font/local";
import { routing, type Locale } from "@/lib/i18n/routing";
import { CookieBanner } from "@/components/blocks/CookieBanner";
import { Header } from "@/components/blocks/Header";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { WebVitals } from "@/components/analytics/WebVitals";
import { JsonLd } from "@/components/JsonLd";
import { UtmCapture } from "@/components/UtmCapture";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import "../../globals.css";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-questrial",
  display: "swap",
});

// Display face. Roie is now licensed (files in public/fonts/roie); Fraunces
// stays loaded as the CSS fallback in --font-display.
const roie = localFont({
  src: [
    { path: "../../../../public/fonts/roie/Roie.woff2", weight: "400", style: "normal" },
    { path: "../../../../public/fonts/roie/Roie.woff", weight: "400", style: "normal" },
  ],
  variable: "--font-roie",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fraunces",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) return {};
  const t = await getTranslations({ locale, namespace: "pages.home" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) notFound();
  const typedLocale = locale as Locale;

  const messages = await getMessages();
  const tCommon = await getTranslations({ locale: typedLocale, namespace: "common" });

  return (
    <html
      lang={typedLocale}
      className={`${questrial.variable} ${roie.variable} ${fraunces.variable}`}
    >
      <body>
        <a
          href="#main-content"
          className="bg-copper text-cream focus:ring-cream sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2 focus:ring-2 focus:outline-none"
        >
          {tCommon("skipToContent")}
        </a>
        <NextIntlClientProvider messages={messages} locale={typedLocale}>
          <Header />
          <main id="main-content">{children}</main>
          <WebVitals />
          <UtmCapture />
          <CookieBanner />
        </NextIntlClientProvider>
        <JsonLd
          id="ld-site-global"
          data={[
            organizationSchema(typedLocale),
            localBusinessSchema(typedLocale),
            websiteSchema(typedLocale),
          ]}
        />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
