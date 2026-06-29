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
    <section className={`bg-cream px-3 pt-[10px] sm:px-5 lg:px-10 ${sectionPadding}`}>
      <div
        className={`${blockBg} relative mx-auto max-w-[1360px] rounded-[20px] px-5 pt-10 pb-12 sm:px-8 lg:px-[40px] lg:pt-[64px] lg:pb-[75px]`}
      >
        <div className="relative z-10 flex flex-col gap-10 lg:gap-[56px]">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-[80px]">
            <div className="flex flex-col gap-3 lg:gap-4">
              <span className={`${eyebrowColor} text-[13px] leading-[27px] lg:text-[14px]`}>
                {eyebrow}
              </span>
              <h2
                className={`font-display ${titleColor} leading-[1.1] whitespace-pre-line`}
                style={{ fontSize: "var(--text-display)" }}
              >
                {title}
              </h2>
            </div>
            <p
              className={`${bodyColor} leading-[1.6] lg:pt-10`}
              style={{ fontSize: "var(--text-body)" }}
            >
              {description}
            </p>
          </div>
          <div
            className={`grid grid-cols-1 gap-5 ${gridCols} lg:gap-[30px] ${overlap ? "-mb-[220px]" : ""}`}
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
