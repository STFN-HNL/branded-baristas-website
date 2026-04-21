import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/blocks/Footer";
import { JsonLd } from "@/components/JsonLd";
import { getHomeContent } from "@/content/home";
import type { Locale } from "@/lib/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const content = getHomeContent(locale);
  const concept = content.events.concepts.find((c) => c.slug === slug);
  if (!concept) {
    return buildMetadata({
      locale,
      path: `/diensten/events/${slug}`,
      title: "Not found",
      description: "",
      noIndex: true,
    });
  }
  return buildMetadata({
    locale,
    path: `/diensten/events/${slug}`,
    title: `${concept.title} — Branded Baristas`,
    description: concept.description,
    image: concept.image,
  });
}

export default async function EventConceptPage({ params }: Props) {
  const { locale, slug } = await params;
  const content = getHomeContent(locale);
  const concept = content.events.concepts.find((c) => c.slug === slug);
  if (!concept) notFound();

  const tCommon = await getTranslations("common");

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(locale, {
            name: concept.title,
            description: concept.description,
            path: `/diensten/events/${slug}`,
            image: concept.image,
          }),
          breadcrumbSchema(locale, [
            { name: locale === "en" ? "Home" : "Home", path: "/" },
            { name: locale === "en" ? "Services" : "Diensten", path: "/diensten" },
            { name: concept.title, path: `/diensten/events/${slug}` },
          ]),
        ]}
      />
      <section className="bg-cream px-10 pt-40 pb-24 lg:pb-32">
        <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col gap-6">
            <span className="text-forest text-[12px] leading-[27px]">{content.events.eyebrow}</span>
            <h1 className="font-display text-ink text-[64px] leading-[1.05]">{concept.title}</h1>
            <p className="text-ink/75 text-[20px] leading-[27px]">{concept.description}</p>
            <p className="text-ink/60 mt-4 text-[16px] leading-[21.5px] italic">
              {tCommon("comingSoon")}
            </p>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px]">
            <Image
              src={concept.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>
      <Footer locale={locale} />
    </>
  );
}

export function generateStaticParams() {
  const content = getHomeContent("nl");
  return content.events.concepts.map((c) => ({ slug: c.slug }));
}
