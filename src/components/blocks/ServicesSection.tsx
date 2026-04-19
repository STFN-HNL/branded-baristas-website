import { IntroBlock } from "./IntroBlock";
import { ConceptCard } from "./ConceptCard";
import type { ConceptCard as ConceptCardData } from "@/content/home";

type ServicesSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  concepts: ConceptCardData[];
  basePath: "/diensten/events" | "/diensten/in-company";
  readMoreLabel: string;
  columns?: 2 | 3;
  background?: "cream" | "oat";
};

export function ServicesSection({
  eyebrow,
  title,
  description,
  concepts,
  basePath,
  readMoreLabel,
  columns = 3,
  background = "cream",
}: ServicesSectionProps) {
  const bg = background === "oat" ? "bg-oat/40" : "bg-cream";
  const gridCols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className={`${bg} px-6 py-24 md:px-12 lg:px-20 lg:py-32`}>
      <div className="mx-auto flex max-w-[1280px] flex-col gap-16">
        <IntroBlock eyebrow={eyebrow} title={title} description={description} />
        <div className={`grid grid-cols-1 gap-10 ${gridCols} lg:gap-12`}>
          {concepts.map((concept) => (
            <ConceptCard
              key={concept.slug}
              concept={concept}
              href={`${basePath}/${concept.slug}`}
              readMoreLabel={readMoreLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
