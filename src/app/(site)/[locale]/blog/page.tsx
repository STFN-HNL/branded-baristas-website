import Image from "next/image";
import { Footer } from "@/components/blocks/Footer";
import { Link } from "@/lib/i18n/routing";
import { getBlogContent } from "@/content/blog";
import type { BlogPost } from "@/content/blog";
import type { Locale } from "@/lib/i18n/routing";

type Props = {
  params: Promise<{ locale: Locale }>;
};

function formatDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function PostCard({
  post,
  locale,
  readingTimeSuffix,
  readMoreLabel,
}: {
  post: BlogPost;
  locale: Locale;
  readingTimeSuffix: string;
  readMoreLabel: string;
}) {
  return (
    <article className="flex flex-col">
      <Link
        href={`/blog/${post.slug}`}
        className="group relative block aspect-[420/280] w-full overflow-hidden rounded-t-[20px]"
      >
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="bg-cream flex flex-1 flex-col gap-3 rounded-b-[20px] px-8 py-6">
        <div className="flex items-center gap-3 text-[12px] leading-[27px]">
          <span className="text-copper">{post.category}</span>
          <span className="text-forest/40">·</span>
          <span className="text-forest/60">{formatDate(post.date, locale)}</span>
          <span className="text-forest/40">·</span>
          <span className="text-forest/60">
            {post.readingTime} {readingTimeSuffix}
          </span>
        </div>
        <h3 className="font-display text-pine text-[24px] leading-[33px] tracking-[-0.02em]">
          {post.title}
        </h3>
        <p className="text-forest flex-1 text-[16px] leading-[21.5px]">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="text-copper mt-1 inline-flex items-center gap-2 text-[16px] leading-[20.8px]"
        >
          {readMoreLabel}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const content = getBlogContent(locale);
  const featured = content.posts.find((p) => p.featured);
  const rest = content.posts.filter((p) => !p.featured);

  return (
    <>
      <section className="relative h-[560px] w-full overflow-hidden">
        <Image
          src={content.hero.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-20 pb-[80px]">
          <span className="text-cream text-[12px] leading-[27px]">{content.hero.eyebrow}</span>
          <h1 className="font-display text-cream mt-4 max-w-[900px] text-[64px] leading-[1.05]">
            {content.hero.title}
          </h1>
          <p className="text-cream mt-6 max-w-[660px] text-[20px] leading-[27px]">
            {content.hero.lead}
          </p>
        </div>
      </section>

      {featured && (
        <section className="bg-cream px-10 pt-24 lg:pt-32">
          <div className="mx-auto max-w-[1360px]">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[20px]">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center gap-4">
                <span className="text-copper text-[12px] leading-[27px]">
                  {content.featuredLabel}
                </span>
                <div className="flex flex-wrap items-center gap-3 text-[12px] leading-[27px]">
                  <span className="text-forest/80">{featured.category}</span>
                  <span className="text-forest/40">·</span>
                  <span className="text-forest/60">{formatDate(featured.date, locale)}</span>
                  <span className="text-forest/40">·</span>
                  <span className="text-forest/60">
                    {featured.readingTime} {content.readingTimeSuffix}
                  </span>
                </div>
                <h2 className="font-display text-pine text-[50px] leading-[55px]">
                  {featured.title}
                </h2>
                <p className="text-forest text-[20px] leading-[27px]">{featured.excerpt}</p>
                <span className="text-copper mt-2 inline-flex items-center gap-2 text-[16px] leading-[20.8px]">
                  {content.readMoreLabel}
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="bg-cream px-10 py-24 lg:py-32">
        <div className="mx-auto max-w-[1360px]">
          <ul className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <li key={post.slug}>
                <PostCard
                  post={post}
                  locale={locale}
                  readingTimeSuffix={content.readingTimeSuffix}
                  readMoreLabel={content.readMoreLabel}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream px-10 pb-24 lg:pb-32">
        <div className="bg-pine mx-auto flex max-w-[1360px] flex-col gap-6 rounded-[20px] px-[40px] py-[58px]">
          <h2 className="font-display text-cream max-w-[800px] text-[40px] leading-[44px]">
            {content.newsletter.title}
          </h2>
          <p className="text-cream/80 max-w-[700px] text-[18px] leading-[27px]">
            {content.newsletter.description}
          </p>
          <form className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="email"
              name="email"
              required
              placeholder={content.newsletter.placeholder}
              className="bg-cream text-ink placeholder:text-ink/40 w-full rounded-[12px] px-4 py-3 text-[16px] leading-[21.5px] focus:outline-none sm:w-[360px]"
            />
            <button
              type="submit"
              className="rounded-pill bg-copper text-cream hover:bg-copper/90 inline-flex items-center justify-center px-8 py-4 text-[16px] leading-[20.8px] transition-colors"
            >
              {content.newsletter.submit}
            </button>
          </form>
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}
