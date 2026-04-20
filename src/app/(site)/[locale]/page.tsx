import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/blocks/Hero";
import { ServicesSection } from "@/components/blocks/ServicesSection";
import { Differentiator } from "@/components/blocks/Differentiator";
import { FAQ } from "@/components/blocks/FAQ";
import { Footer } from "@/components/blocks/Footer";
import { getHomeContent } from "@/content/home";
import type { Locale } from "@/lib/i18n/routing";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const content = getHomeContent(locale);
  const tCommon = await getTranslations("common");
  const readMoreLabel = tCommon("readMore");

  return (
    <>
      <Hero />
      <ServicesSection
        eyebrow={content.events.eyebrow}
        title={content.events.title}
        description={content.events.description}
        concepts={content.events.concepts}
        basePath="/diensten/events"
        readMoreLabel={readMoreLabel}
        columns={2}
        variant="pine"
        overlap
      />
      <ServicesSection
        eyebrow={content.inCompany.eyebrow}
        title={content.inCompany.title}
        description={content.inCompany.description}
        concepts={content.inCompany.concepts}
        basePath="/diensten/in-company"
        readMoreLabel={readMoreLabel}
        columns={3}
        variant="sand"
      />
      <Differentiator data={content.differentiator} />
      <FAQ data={content.faq} />
      <Footer locale={locale} wrapperBg="mocha" />
    </>
  );
}
