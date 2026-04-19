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
  variant?: "pine" | "sand";
};

export function ServicesSection({
  eyebrow,
  title,
  description,
  concepts,
  basePath,
  readMoreLabel,
  columns = 3,
  variant = "pine",
}: ServicesSectionProps) {
  const blockBg = variant === "pine" ? "bg-pine" : "bg-sand";
  const tone = variant === "pine" ? "light" : "dark";
  const gridCols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  const gap = columns === 2 ? "gap-5" : "gap-[30px]";

  return (
    <section className="bg-cream px-10 py-[10px]">
      <div
        className={`${blockBg} mx-auto max-w-[1360px] rounded-[20px] px-10 py-20 lg:px-20 lg:py-20`}
      >
        <div className="flex flex-col gap-16">
          <IntroBlock
            eyebrow={eyebrow}
            title={title}
            description={description}
            tone={tone}
            align="split"
          />
          <div className={`grid grid-cols-1 ${gap} ${gridCols}`}>
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
      </div>
    </section>
  );
}
