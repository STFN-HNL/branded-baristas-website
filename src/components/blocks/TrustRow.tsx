import { getTranslations } from "next-intl/server";

type KpiKey = "events" | "years" | "clients";

const KPI_KEYS: KpiKey[] = ["events", "years", "clients"];

/**
 * Social-proof strip placed directly under the hero.
 *
 * Copy comes from `messages/*.json` under the `trust` namespace. The KPI
 * numbers and testimonial can later be replaced with a Sanity testimonial
 * document — the component keeps its shape stable so the swap is a pure
 * data change.
 */
export async function TrustRow() {
  const t = await getTranslations("trust");

  return (
    <section
      aria-label={t("eyebrow")}
      className="bg-cream border-forest/10 border-y px-10 py-10 lg:py-12"
    >
      <div className="mx-auto flex max-w-[1360px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex flex-col gap-5">
          <span className="text-forest/70 text-[12px] tracking-[0.2em] uppercase">
            {t("eyebrow")}
          </span>
          <dl className="flex flex-wrap items-baseline gap-x-10 gap-y-4">
            {KPI_KEYS.map((key) => (
              <div key={key} className="flex flex-col">
                <dt className="sr-only">{key}</dt>
                <dd className="font-display text-pine text-[28px] leading-[32px]">
                  {t(`kpis.${key}`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="max-w-[480px] lg:text-right">
          <blockquote className="text-forest text-[18px] leading-[26px]">
            <span aria-hidden className="text-copper pr-1">
              “
            </span>
            {t("testimonial.quote")}
            <span aria-hidden className="text-copper pl-1">
              ”
            </span>
          </blockquote>
          <figcaption className="text-forest/70 mt-3 text-[13px] leading-[20px]">
            <span className="text-pine font-medium">{t("testimonial.author")}</span>
            <span aria-hidden className="px-2">
              ·
            </span>
            <span>{t("testimonial.role")}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
