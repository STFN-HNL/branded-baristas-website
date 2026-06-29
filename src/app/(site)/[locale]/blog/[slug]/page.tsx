import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/blocks/Footer";
import { JsonLd } from "@/components/JsonLd";
import { PortableText, type Block } from "@/components/PortableText";
import { getPostBySlug } from "@/lib/sanity/queries/post";
import { getBlogContent } from "@/content/blog";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/routing";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export const revalidate = 3600;

type PostDoc = {
  _id: string;
  title?: Record<string, string>;
  slug?: Record<string, { current: string }>;
  publishedAt?: string;
  excerpt?: Record<string, string>;
  body?: Record<string, Block[]>;
  coverImage?: { url?: string; alt?: string };
  author?: {
    name?: string;
    role?: Record<string, string>;
    bio?: Record<string, string>;
    avatar?: string;
  };
  category?: { title?: Record<string, string>; slug?: Record<string, { current: string }> };
  seo?: { title?: Record<string, string>; description?: Record<string, string> };
};

async function loadPost(slug: string, locale: Locale): Promise<PostDoc | null> {
  try {
    return ((await getPostBySlug(slug, locale)) as unknown as PostDoc | null) ?? null;
  } catch (error) {
    console.error("[blog/[slug]] Sanity fetch failed", error);
    return null;
  }
}

function fallbackFromHardcoded(slug: string, locale: Locale): PostDoc | null {
  const post = getBlogContent(locale).posts.find((p) => p.slug === slug);
  if (!post) return null;
  return {
    _id: post.slug,
    title: { [locale]: post.title },
    publishedAt: post.date,
    excerpt: { [locale]: post.excerpt },
    coverImage: { url: post.image, alt: post.title },
    author: { name: post.author },
    category: { title: { [locale]: post.category } },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "pages.blog" });
  const doc = (await loadPost(slug, locale)) ?? fallbackFromHardcoded(slug, locale);
  if (!doc) {
    return buildMetadata({
      locale,
      path: `/blog/${slug}`,
      title: t("metaTitle"),
      description: t("metaDescription"),
      noIndex: true,
    });
  }
  const title = doc.seo?.title?.[locale] ?? doc.title?.[locale] ?? t("metaTitle");
  const description =
    doc.seo?.description?.[locale] ?? doc.excerpt?.[locale] ?? t("metaDescription");
  return buildMetadata({
    locale,
    path: `/blog/${slug}`,
    title: `${title} — Branded Baristas`,
    description,
    image: doc.coverImage?.url,
    type: "article",
    publishedTime: doc.publishedAt,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const doc = (await loadPost(slug, locale)) ?? fallbackFromHardcoded(slug, locale);
  if (!doc) notFound();

  const title = doc.title?.[locale] ?? "";
  const category = doc.category?.title?.[locale];
  const body = doc.body?.[locale];
  const datePretty = doc.publishedAt
    ? new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "nl-NL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(doc.publishedAt))
    : null;

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            locale,
            path: `/blog/${slug}`,
            title,
            description: doc.seo?.description?.[locale] ?? doc.excerpt?.[locale] ?? "",
            image: doc.coverImage?.url,
            datePublished: doc.publishedAt,
            authorName: doc.author?.name,
          }),
          breadcrumbSchema(locale, [
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: title, path: `/blog/${slug}` },
          ]),
        ]}
      />

      <section className="bg-cream px-10 pt-40 pb-10">
        <div className="mx-auto flex max-w-[820px] flex-col gap-5">
          <div className="text-forest/70 flex flex-wrap items-center gap-3 text-[12px] leading-[27px]">
            {category ? <span className="text-copper">{category}</span> : null}
            {category && datePretty ? <span className="text-forest/40">·</span> : null}
            {datePretty ? <span>{datePretty}</span> : null}
          </div>
          <h1 className="font-display text-pine text-[44px] leading-[1.1] sm:text-[56px]">
            {title}
          </h1>
          {doc.excerpt?.[locale] ? (
            <p className="text-forest text-[20px] leading-[27px]">{doc.excerpt[locale]}</p>
          ) : null}
        </div>
      </section>

      {doc.coverImage?.url ? (
        <section className="bg-cream px-10 pb-10">
          <div className="relative mx-auto aspect-[3/2] max-w-[1100px] overflow-hidden rounded-[20px]">
            <Image
              src={doc.coverImage.url}
              alt={doc.coverImage.alt ?? title}
              fill
              priority
              sizes="(min-width: 1100px) 1100px, 100vw"
              className="object-cover"
            />
          </div>
        </section>
      ) : null}

      <section className="bg-cream px-10 py-16">
        <div className="mx-auto max-w-[820px]">
          <PortableText value={body} />
        </div>
      </section>

      {doc.author?.name ? (
        <section className="bg-cream px-10 pb-24 lg:pb-32">
          <div className="border-forest/15 mx-auto flex max-w-[820px] items-center gap-5 border-t pt-10">
            {doc.author.avatar ? (
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={doc.author.avatar}
                  alt={doc.author.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div>
              <p className="text-pine text-[16px] leading-[22px] font-medium">{doc.author.name}</p>
              {doc.author.role?.[locale] ? (
                <p className="text-forest/70 text-[14px] leading-[20px]">
                  {doc.author.role[locale]}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <Footer locale={locale} />
    </>
  );
}

export function generateStaticParams() {
  const posts = getBlogContent("nl").posts;
  return posts.map((p) => ({ slug: p.slug }));
}
