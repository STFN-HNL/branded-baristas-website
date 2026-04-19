import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ServicesSection } from "@/components/blocks/ServicesSection";
import { Footer } from "@/components/blocks/Footer";
import { getHomeContent } from "@/content/home";
import type { Locale } from "@/lib/i18n/routing";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const content = getHomeContent(locale);
  const tCommon = await getTranslations("common");
  const readMoreLabel = tCommon("readMore");

  const heroCopy =
    locale === "en"
      ? {
          eyebrow: "Services",
          title: "Barista services built for events and in-company",
          lead: "From mobile coffee bars at brand activations to everyday espresso routines in the office — we design, staff and run every coffee moment you need.",
        }
      : {
          eyebrow: "Diensten",
          title: "Barista services voor events en in-company",
          lead: "Van mobiele koffiebars tijdens brand activations tot dagelijkse espresso-momenten op kantoor — wij ontwerpen, bemannen en draaien elk koffiemoment dat jij nodig hebt.",
        };

  return (
    <>
      <section className="relative h-[560px] w-full overflow-hidden">
        <Image
          src="/images/hero/hero-main.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-20 pb-[80px]">
          <span className="text-cream text-[12px] leading-[27px]">{heroCopy.eyebrow}</span>
          <h1 className="font-display text-cream mt-4 max-w-[900px] text-[64px] leading-[1.05]">
            {heroCopy.title}
          </h1>
          <p className="text-cream mt-6 max-w-[660px] text-[20px] leading-[27px]">
            {heroCopy.lead}
          </p>
        </div>
      </section>

      <ServicesSection
        eyebrow={content.events.eyebrow}
        title={content.events.title}
        description={content.events.description}
        concepts={content.events.concepts}
        basePath="/diensten/events"
        readMoreLabel={readMoreLabel}
        columns={2}
        variant="pine"
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

      <Footer locale={locale} />
    </>
  );
}
