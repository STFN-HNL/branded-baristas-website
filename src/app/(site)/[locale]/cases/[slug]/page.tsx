import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/blocks/Footer";
import { JsonLd } from "@/components/JsonLd";
import { PortableText, type Block } from "@/components/PortableText";
import { getCaseBySlug } from "@/lib/sanity/queries/case";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/routing";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

// Fallback to ISR every hour so editors who forget the webhook still see updates.
export const revalidate = 3600;

type CaseDoc = {
  _id: string;
  category?: "events" | "in-company";
  title?: Record<string, string>;
  slug?: Record<string, { current: string }>;
  client?: string;
  eventDate?: string;
  location?: string;
  guestCount?: number;
  hero?: { url?: string; alt?: string };
  gallery?: { url?: string; alt?: string }[];
  conceptsUsed?: {
    _id: string;
    title?: Record<string, string>;
    slug?: Record<string, { current: string }>;
    category?: string;
  }[];
  testimonial?: {
    quote?: Record<string, string>;
    author?: string;
    role?: string;
    company?: string;
  };
  story?: Record<string, Block[]>;
  seo?: { title?: Record<string, string>; description?: Record<string, string> };
};

async function loadCase(slug: string, locale: Locale): Promise<CaseDoc | null> {
  try {
    return ((await getCaseBySlug(slug, locale)) as unknown as CaseDoc | null) ?? null;
  } catch (error) {
    console.error("[cases/[slug]] Sanity fetch failed", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const doc = await loadCase(slug, locale);
  const t = await getTranslations({ locale, namespace: "pages.cases" });
  if (!doc) {
    return buildMetadata({
      locale,
      path: `/cases/${slug}`,
      title: t("metaTitle"),
      description: t("metaDescription"),
      noIndex: true,
    });
  }
  const title = doc.seo?.title?.[locale] ?? doc.title?.[locale] ?? doc.client ?? t("metaTitle");
  const description = doc.seo?.description?.[locale] ?? t("metaDescription");
  return buildMetadata({
    locale,
    path: `/cases/${slug}`,
    title: `${title} — Branded Baristas`,
    description,
    image: doc.hero?.url,
    type: "article",
  });
}

export default async function CaseDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const doc = await loadCase(slug, locale);
  if (!doc) notFound();

  const title = doc.title?.[locale] ?? doc.client ?? "";
  const story = doc.story?.[locale];

  const dateFormatted = doc.eventDate
    ? new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "nl-NL", {
        month: "long",
        year: "numeric",
      }).format(new Date(doc.eventDate))
    : null;

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            locale,
            path: `/cases/${slug}`,
            title,
            description: doc.seo?.description?.[locale] ?? "",
            image: doc.hero?.url,
            datePublished: doc.eventDate,
          }),
          breadcrumbSchema(locale, [
            { name: "Home", path: "/" },
            { name: locale === "en" ? "Our work" : "Ons werk", path: "/cases" },
            { name: title, path: `/cases/${slug}` },
          ]),
        ]}
      />

      <section className="relative h-[560px] w-full overflow-hidden">
        {doc.hero?.url ? (
          <Image
            src={doc.hero.url}
            alt={doc.hero.alt ?? title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-10 pb-[80px] lg:px-20">
          {doc.client ? (
            <span className="text-cream text-[12px] leading-[27px] tracking-wider uppercase">
              {doc.client}
            </span>
          ) : null}
          <h1 className="font-display text-cream mt-4 max-w-[900px] text-[48px] leading-[1.05] sm:text-[64px]">
            {title}
          </h1>
          <dl className="text-cream/90 mt-6 flex flex-wrap gap-x-10 gap-y-2 text-[16px] leading-[27px]">
            {dateFormatted ? (
              <div>
                <dt className="sr-only">{locale === "en" ? "Date" : "Datum"}</dt>
                <dd>{dateFormatted}</dd>
              </div>
            ) : null}
            {doc.location ? (
              <div>
                <dt className="sr-only">{locale === "en" ? "Location" : "Locatie"}</dt>
                <dd>{doc.location}</dd>
              </div>
            ) : null}
            {doc.guestCount ? (
              <div>
                <dt className="sr-only">{locale === "en" ? "Guests" : "Gasten"}</dt>
                <dd>
                  {doc.guestCount} {locale === "en" ? "guests" : "gasten"}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </section>

      <section className="bg-cream px-10 py-24 lg:py-32">
        <div className="mx-auto max-w-[820px]">
          <PortableText value={story} />
        </div>
      </section>

      {doc.gallery && doc.gallery.length > 0 ? (
        <section className="bg-cream px-10 pb-24 lg:pb-32">
          <ul className="mx-auto grid max-w-[1360px] grid-cols-1 gap-6 sm:grid-cols-2">
            {doc.gallery.map((img, i) =>
              img.url ? (
                <li key={i} className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
                  <Image
                    src={img.url}
                    alt={img.alt ?? `${title} ${i + 1}`}
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

      {doc.testimonial?.quote?.[locale] ? (
        <section className="bg-cream px-10 pb-24 lg:pb-32">
          <figure className="bg-pine mx-auto max-w-[1360px] rounded-[20px] px-10 py-16 lg:px-20">
            <blockquote className="font-display text-cream max-w-[900px] text-[30px] leading-[1.2] italic lg:text-[40px]">
              “{doc.testimonial.quote[locale]}”
            </blockquote>
            <figcaption className="text-cream/80 mt-6 text-[16px] leading-[27px]">
              {[doc.testimonial.author, doc.testimonial.role, doc.testimonial.company]
                .filter(Boolean)
                .join(" · ")}
            </figcaption>
          </figure>
        </section>
      ) : null}

      <Footer locale={locale} />
    </>
  );
}
