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
    <article className="flex flex-col gap-6">
      <Link
        href={href}
        className="group bg-ink/5 relative block aspect-[4/5] w-full overflow-hidden rounded-lg"
      >
        <Image
          src={concept.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-col gap-3">
        <h3 className="font-display text-ink text-[28px] leading-[1.1]">{concept.title}</h3>
        <p className="text-ink/75 text-[16px] leading-[1.55]">{concept.description}</p>
        <Link
          href={href}
          className="text-copper mt-2 inline-flex items-center gap-2 text-[15px] underline-offset-4 hover:underline"
        >
          {readMoreLabel}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
