import Image from "next/image";
import { Link } from "@/lib/i18n/routing";
import type { ConceptCard as ConceptCardData } from "@/content/home";

type ConceptCardProps = {
  concept: ConceptCardData;
  href: string;
  readMoreLabel: string;
};

export function ConceptCard({ concept, href, readMoreLabel }: ConceptCardProps) {
  return (
    <article className="group flex flex-col">
      <Link
        href={href}
        className="relative block aspect-[630/304] w-full overflow-hidden rounded-t-[20px]"
        aria-label={`${readMoreLabel}: ${concept.title}`}
      >
        <Image
          src={concept.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="bg-cream relative flex min-h-[229px] flex-col gap-4 rounded-b-[20px] px-[34px] pt-[55px] pr-[105px] pb-[44px]">
        <h3 className="font-display text-pine text-[24px] leading-[33px] tracking-[-0.02em]">
          {concept.title}
        </h3>
        <p className="text-forest text-[16px] leading-[22px]">{concept.description}</p>
        <Link
          href={href}
          aria-label={`${readMoreLabel}: ${concept.title}`}
          className="bg-amber text-ink absolute right-[45px] bottom-[44px] inline-flex h-[55px] w-[55px] items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M4 10h12M11 5l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="sr-only">{readMoreLabel}</span>
        </Link>
      </div>
    </article>
  );
}
