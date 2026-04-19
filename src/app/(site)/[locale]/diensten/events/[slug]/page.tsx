import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getHomeContent } from "@/content/home";
import type { Locale } from "@/lib/i18n/routing";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export default async function EventConceptPage({ params }: Props) {
  const { locale, slug } = await params;
  const content = getHomeContent(locale);
  const concept = content.events.concepts.find((c) => c.slug === slug);
  if (!concept) notFound();

  const tCommon = await getTranslations("common");

  return (
    <section className="bg-cream px-6 py-24 md:px-12 lg:px-20 lg:py-32">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="flex flex-col gap-6">
          <span className="text-copper text-sm tracking-[0.15em] uppercase">
            {content.events.eyebrow}
          </span>
          <h1 className="font-display text-ink text-[64px] leading-[1.05]">{concept.title}</h1>
          <p className="text-ink/75 text-[18px] leading-[1.55]">{concept.description}</p>
          <p className="text-ink/60 mt-4 text-[15px] italic">{tCommon("comingSoon")}</p>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
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
  );
}

export function generateStaticParams() {
  const content = getHomeContent("nl");
  return content.events.concepts.map((c) => ({ slug: c.slug }));
}
