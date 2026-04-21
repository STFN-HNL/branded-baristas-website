import { ConceptCard } from "./ConceptCard";
import type { ConceptCard as ConceptCardData } from "@/content/home";

type ServicesSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  concepts: ConceptCardData[];
  basePath: "/diensten/events/[slug]" | "/diensten/in-company/[slug]";
  readMoreLabel: string;
  columns?: 2 | 3 | 4;
  variant?: "pine" | "sand";
  overlap?: boolean;
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
  overlap = false,
}: ServicesSectionProps) {
  const blockBg = variant === "pine" ? "bg-pine" : "bg-sand";
  const isLight = variant === "pine";
  const titleColor = isLight ? "text-cream" : "text-pine";
  const eyebrowColor = isLight ? "text-cream/80" : "text-forest";
  const bodyColor = isLight ? "text-cream" : "text-forest";

  const gridCols =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  const sectionPadding = overlap ? "pb-[180px]" : "pb-[10px]";

  return (
    <section className={`bg-cream px-10 pt-[10px] ${sectionPadding}`}>
      <div
        className={`${blockBg} relative mx-auto max-w-[1360px] rounded-[20px] px-[40px] pt-[64px] pb-[75px]`}
      >
        <div className="relative z-10 flex flex-col gap-[56px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-[80px]">
            <div className="flex flex-col gap-4">
              <span className={`${eyebrowColor} text-[14px] leading-[27px]`}>{eyebrow}</span>
              <h2
                className={`font-display ${titleColor} text-[58px] leading-[62px] whitespace-pre-line`}
              >
                {title}
              </h2>
            </div>
            <p className={`${bodyColor} text-[20px] leading-[28px] lg:pt-10`}>{description}</p>
          </div>
          <div
            className={`grid grid-cols-1 gap-[30px] ${gridCols} ${overlap ? "-mb-[220px]" : ""}`}
          >
            {concepts.map((concept) => (
              <ConceptCard
                key={concept.slug}
                concept={concept}
                href={{ pathname: basePath, params: { slug: concept.slug } }}
                readMoreLabel={readMoreLabel}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
