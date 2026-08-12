import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/blocks/Footer";
import { InlineCta } from "@/components/blocks/InlineCta";
import { JsonLd } from "@/components/JsonLd";
import { PortableText, type PortableBlock } from "@/components/PortableText";
import { getHomeContent } from "@/content/home";
import { getFromPriceEuros } from "@/lib/content/pricing";
import { getConceptBySlug } from "@/lib/sanity/queries/concept";
import type { Locale } from "@/lib/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export const revalidate = 3600;

type ConceptDoc = {
  _id: string;
  title?: Record<string, string>;
  shortDescription?: Record<string, string>;
  hero?: { url?: string; alt?: Record<string, string> };
  gallery?: { url?: string; alt?: Record<string, string> }[];
  body?: Record<string, PortableBlock[]>;
  specs?: { label?: string; value?: string }[];
  seo?: { title?: Record<string, string>; description?: Record<string, string> };
};

async function loadConcept(slug: string, locale: Locale): Promise<ConceptDoc | null> {
  try {
    return ((await getConceptBySlug(slug, locale)) as unknown as ConceptDoc | null) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const content = getHomeContent(locale);
  const fallback = content.inCompany.concepts.find((c) => c.slug === slug);
  const doc = await loadConcept(slug, locale);
  if (!doc && !fallback) {
    return buildMetadata({
      locale,
      path: `/diensten/in-company/${slug}`,
      title: "Not found",
      description: "",
      noIndex: true,
    });
  }
  const title = doc?.seo?.title?.[locale] ?? doc?.title?.[locale] ?? fallback?.title ?? "";
  const description =
    doc?.seo?.description?.[locale] ??
    doc?.shortDescription?.[locale] ??
    fallback?.description ??
    "";
  return buildMetadata({
    locale,
    path: `/diensten/in-company/${slug}`,
    title: `${title} — Branded Baristas`,
    description,
    image: doc?.hero?.url ?? fallback?.image,
  });
}

export default async function InCompanyConceptPage({ params }: Props) {
  const { locale, slug } = await params;
  const content = getHomeContent(locale);
  const [doc, fromPrice, tPricing] = await Promise.all([
    loadConcept(slug, locale),
    getFromPriceEuros(slug),
    getTranslations({ locale, namespace: "pricing" }),
  ]);
  const fallback = content.inCompany.concepts.find((c) => c.slug === slug);
  if (!doc && !fallback) notFound();

  const title = doc?.title?.[locale] ?? fallback?.title ?? "";
  const description = doc?.shortDescription?.[locale] ?? fallback?.description ?? "";
  const heroUrl = doc?.hero?.url ?? fallback?.image ?? "";
  const body = doc?.body?.[locale];

  const ctaText =
    locale === "en"
      ? "Want to bring a premium coffee experience to your team?"
      : "Een premium koffie-ervaring voor jouw team?";
  const ctaLabel = locale === "en" ? "Request a quote" : "Offerte aanvragen";

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(locale, {
            name: title,
            description,
            path: `/diensten/in-company/${slug}`,
            image: heroUrl,
          }),
          breadcrumbSchema(locale, [
            { name: "Home", path: "/" },
            { name: locale === "en" ? "Services" : "Diensten", path: "/diensten" },
            { name: title, path: `/diensten/in-company/${slug}` },
          ]),
        ]}
      />

      <section className="bg-cream px-10 pt-40 pb-24 lg:pb-32">
        <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col gap-6">
            <span className="text-forest text-[12px] leading-[27px]">
              {content.inCompany.eyebrow}
            </span>
            <h1 className="font-display text-ink text-[56px] leading-[1.05] lg:text-[64px]">
              {title}
            </h1>
            <p className="text-ink/75 text-[20px] leading-[27px]">{description}</p>
            {fromPrice !== null ? (
              <div className="flex flex-col gap-1">
                <span className="text-pine text-[24px] leading-[33px] font-medium">
                  {tPricing("from", { price: fromPrice })}
                </span>
                <span className="text-ink/60 text-[14px] leading-[22px]">{tPricing("note")}</span>
              </div>
            ) : null}
          </div>
          {heroUrl ? (
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px]">
              <Image
                src={heroUrl}
                alt={title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          ) : null}
        </div>
      </section>

      {doc?.specs && doc.specs.length > 0 ? (
        <section className="bg-cream px-10 pb-24 lg:pb-32">
          <dl className="mx-auto grid max-w-[1360px] grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {doc.specs.map((spec, i) =>
              spec.label && spec.value ? (
                <div key={i} className="flex flex-col gap-1">
                  <dt className="text-forest/60 text-[12px] leading-[27px] tracking-wider uppercase">
                    {spec.label}
                  </dt>
                  <dd className="text-pine text-[20px] leading-[27px] font-medium">{spec.value}</dd>
                </div>
              ) : null,
            )}
          </dl>
        </section>
      ) : null}

      {body ? (
        <section className="bg-cream px-10 pb-24 lg:pb-32">
          <div className="mx-auto max-w-[820px]">
            <PortableText value={body} locale={locale} />
          </div>
        </section>
      ) : null}

      {doc?.gallery && doc.gallery.length > 0 ? (
        <section className="bg-cream px-10 pb-24 lg:pb-32">
          <ul className="mx-auto grid max-w-[1360px] grid-cols-1 gap-6 sm:grid-cols-2">
            {doc.gallery.map((img, i) =>
              img.url ? (
                <li key={i} className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
                  <Image
                    src={img.url}
                    alt={img.alt?.[locale] ?? `${title} ${i + 1}`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </li>
              ) : null,
            )}
          </ul>
        </section>
      ) : null}

      <InlineCta data={{ text: ctaText, ctaLabel, ctaHref: "/offerte" }} />

      <Footer locale={locale} />
    </>
  );
}

export function generateStaticParams() {
  const content = getHomeContent("nl");
  return content.inCompany.concepts.map((c) => ({ slug: c.slug }));
}
