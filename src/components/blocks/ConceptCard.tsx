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
        className="focus-visible:ring-copper relative block aspect-[306/260] w-full overflow-hidden rounded-t-[20px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
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
      <div className="bg-cream relative flex min-h-[210px] flex-col gap-[18px] rounded-b-[20px] px-[26px] pt-[26px] pr-[70px] pb-[30px]">
        <h3 className="font-display text-pine text-[22px] leading-[28px] tracking-[-0.02em]">
          {concept.title}
        </h3>
        <p className="text-forest/80 text-[14px] leading-[20px]">{concept.description}</p>
        <Link
          href={href}
          aria-label={`${readMoreLabel}: ${concept.title}`}
          className="bg-amber text-ink focus-visible:ring-copper absolute right-[18px] bottom-[18px] inline-flex h-[48px] w-[48px] items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
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
