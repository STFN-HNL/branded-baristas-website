import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/blocks/Hero";
import { ServicesSection } from "@/components/blocks/ServicesSection";
import { Differentiator } from "@/components/blocks/Differentiator";
import { FAQ } from "@/components/blocks/FAQ";
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
        background="cream"
      />
      <ServicesSection
        eyebrow={content.inCompany.eyebrow}
        title={content.inCompany.title}
        description={content.inCompany.description}
        concepts={content.inCompany.concepts}
        basePath="/diensten/in-company"
        readMoreLabel={readMoreLabel}
        columns={3}
        background="oat"
      />
      <Differentiator data={content.differentiator} />
      <FAQ data={content.faq} />
    </>
  );
}
