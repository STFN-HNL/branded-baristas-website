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
import { ContactSection } from "@/components/blocks/ContactSection";
import { Footer } from "@/components/blocks/Footer";
import { getHomeContent } from "@/content/home";
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
  const content = getHomeContent(locale);
  const tCommon = await getTranslations("common");
  const readMoreLabel = tCommon("readMore");

  return (
    <>
      <Hero />
      <TrustRow />
      <IntroSplit data={content.intro} />
      <ClientLogoStrip logos={content.logos} />
      <ServicesSection
        eyebrow={content.events.eyebrow}
        title={content.events.title}
        description={content.events.description}
        concepts={content.events.concepts}
        basePath="/diensten/events/[slug]"
        readMoreLabel={readMoreLabel}
        columns={4}
        variant="pine"
      />
      <ServicesSection
        eyebrow={content.inCompany.eyebrow}
        title={content.inCompany.title}
        description={content.inCompany.description}
        concepts={content.inCompany.concepts}
        basePath="/diensten/in-company/[slug]"
        readMoreLabel={readMoreLabel}
        columns={3}
        variant="sand"
      />
      <InlineCta data={content.inlineCta} />
      <ParallaxTagline data={content.tagline} />
      <Pillars data={content.pillars} />
      <Differentiator data={content.differentiator} />
      <ContactSection data={content.contact} />
      <Footer locale={locale} wrapperBg="mocha" flush />
    </>
  );
}
