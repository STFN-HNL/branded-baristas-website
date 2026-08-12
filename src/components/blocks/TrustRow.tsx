import { getTranslations } from "next-intl/server";

type KpiKey = "quality" | "reach" | "approach";

const KPI_KEYS: KpiKey[] = ["quality", "reach", "approach"];

export async function TrustRow() {
  const t = await getTranslations("trust");

  return (
    <section
      aria-label={t("eyebrow")}
      className="bg-cream border-forest/10 border-y px-5 py-8 sm:px-8 lg:px-10 lg:py-12"
    >
      <div className="mx-auto flex max-w-[1360px] flex-col gap-4 lg:gap-5">
        <span className="text-forest/70 text-[12px] tracking-[0.2em] uppercase">
          {t("eyebrow")}
        </span>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-3 sm:flex sm:flex-wrap sm:items-baseline sm:gap-x-10 sm:gap-y-4">
          {KPI_KEYS.map((key) => (
            <div key={key} className="flex flex-col">
              <dt className="sr-only">{key}</dt>
              <dd
                className="font-display text-pine leading-[1.15]"
                style={{ fontSize: "var(--text-h2)" }}
              >
                {t(`kpis.${key}`)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
