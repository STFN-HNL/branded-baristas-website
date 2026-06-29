import Image from "next/image";
import type { ComponentProps } from "react";
import { Link } from "@/lib/i18n/routing";
import type { ConceptCard as ConceptCardData } from "@/content/home";

type ConceptCardProps = {
  concept: ConceptCardData;
  href: ComponentProps<typeof Link>["href"];
  readMoreLabel: string;
};

export function ConceptCard({ concept, href, readMoreLabel }: ConceptCardProps) {
  return (
    <article className="group flex flex-col">
      <Link
        href={href}
        className="focus-visible:ring-copper relative block aspect-[4/3] w-full overflow-hidden rounded-t-[20px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:aspect-[306/260]"
        aria-label={`${readMoreLabel}: ${concept.title}`}
      >
        <Image
          src={concept.image}
          alt={concept.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="bg-cream relative flex min-h-[180px] flex-col gap-3 rounded-b-[20px] px-5 pt-5 pr-14 pb-6 lg:min-h-[210px] lg:gap-[18px] lg:px-[26px] lg:pt-[26px] lg:pr-[70px] lg:pb-[30px]">
        <h3
          className="font-display text-pine leading-[1.25] tracking-[-0.02em]"
          style={{ fontSize: "var(--text-h3)" }}
        >
          {concept.title}
        </h3>
        <p className="text-forest/80 text-[14px] leading-[20px]">{concept.description}</p>
        <Link
          href={href}
          aria-label={`${readMoreLabel}: ${concept.title}`}
          className="bg-amber text-ink focus-visible:ring-copper absolute right-[14px] bottom-[14px] inline-flex h-[44px] w-[44px] items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:right-[18px] lg:bottom-[18px] lg:h-[48px] lg:w-[48px]"
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
              d="M10 4v12M4 10h12"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
          <span className="sr-only">{readMoreLabel}</span>
        </Link>
      </div>
    </article>
  );
}
