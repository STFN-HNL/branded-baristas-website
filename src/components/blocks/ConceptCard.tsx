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
    <article className="flex flex-col">
      <Link
        href={href}
        className="group relative block aspect-[630/304] w-full overflow-hidden rounded-t-[20px]"
      >
        <Image
          src={concept.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="bg-cream flex flex-col gap-3 rounded-b-[20px] px-8 py-6">
        <h3 className="font-display text-pine text-[24px] leading-[33px] tracking-[-0.02em]">
          {concept.title}
        </h3>
        <p className="text-forest text-[16px] leading-[21.5px]">{concept.description}</p>
        <Link
          href={href}
          className="text-copper mt-1 inline-flex items-center gap-2 text-[16px] leading-[20.8px] underline-offset-4 hover:underline"
        >
          {readMoreLabel}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
