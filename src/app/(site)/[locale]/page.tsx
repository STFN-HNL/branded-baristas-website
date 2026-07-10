import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/blocks/Hero";
import { TrustRow } from "@/components/blocks/TrustRow";
import { IntroSplit } from "@/components/blocks/IntroSplit";
import { ClientLogoStrip } from "@/components/blocks/ClientLogoStrip";
import { ServicesSection } from "@/components/blocks/ServicesSection";
import { InlineCta } from "@/components/blocks/InlineCta";
import { ParallaxTagline } from "@/components/blocks/ParallaxTagline";
import { Pillars } from "@/components/blocks/Pillars";
import { Differentiator } from "@/components/blocks/Differentiator";
import { FAQ } from "@/components/blocks/FAQ";
import { ContactSection } from "@/components/blocks/ContactSection";
import { Footer } from "@/components/blocks/Footer";
import { getHomeContent } from "@/content/home";
import { getHomePageContent } from "@/lib/content/homePage";
import { getFaqItems } from "@/lib/content/faqItems";
import { getConcepts } from "@/lib/content/concepts";
import type { Locale } from "@/lib/i18n/routing";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.home" });
  return buildMetadata({
    locale,
    path: "/",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const hardcoded = getHomeContent(locale);

  const [tCommon, homeContent, faqItems, eventConcepts, inCompanyConcepts] = await Promise.all([
    getTranslations("common"),
    getHomePageContent(locale),
    getFaqItems(locale),
    getConcepts(locale, "events"),
    getConcepts(locale, "in-company"),
  ]);

  const readMoreLabel = tCommon("readMore");

  const intro = homeContent?.intro ?? hardcoded.intro;
  const inlineCta = homeContent?.inlineCta ?? hardcoded.inlineCta;
  const tagline = homeContent?.tagline ?? hardcoded.tagline;
  const pillars = homeContent?.pillars ?? hardcoded.pillars;
  const differentiator = homeContent?.differentiator ?? hardcoded.differentiator;
  const faqData = { ...(homeContent?.faq ?? hardcoded.faq), items: faqItems };
  const events = {
    ...hardcoded.events,
    concepts: eventConcepts.length > 0 ? eventConcepts : hardcoded.events.concepts,
  };
  const inCompany = {
    ...hardcoded.inCompany,
    concepts: inCompanyConcepts.length > 0 ? inCompanyConcepts : hardcoded.inCompany.concepts,
  };

  return (
    <>
      <Hero />
      <TrustRow />
      <IntroSplit data={intro} />
      <ClientLogoStrip logos={hardcoded.logos} />
      <ServicesSection
        eyebrow={events.eyebrow}
        title={events.title}
        description={events.description}
        concepts={events.concepts}
        basePath="/diensten/events/[slug]"
        readMoreLabel={readMoreLabel}
        columns={4}
        variant="pine"
      />
      <ServicesSection
        eyebrow={inCompany.eyebrow}
        title={inCompany.title}
        description={inCompany.description}
        concepts={inCompany.concepts}
        basePath="/diensten/in-company/[slug]"
        readMoreLabel={readMoreLabel}
        columns={3}
        variant="sand"
      />
      <InlineCta data={inlineCta} />
      <ParallaxTagline data={tagline} />
      <Pillars data={pillars} />
      <Differentiator data={differentiator} />
      <FAQ data={faqData} />
      <ContactSection data={hardcoded.contact} />
      <Footer locale={locale} wrapperBg="mocha" flush />
    </>
  );
}
