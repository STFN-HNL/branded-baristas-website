import { getTranslations } from "next-intl/server";
import { getTrustRowTestimonial } from "@/lib/content/trustRow";
import type { Locale } from "@/lib/i18n/routing";

type KpiKey = "events" | "years" | "clients";

const KPI_KEYS: KpiKey[] = ["events", "years", "clients"];

export async function TrustRow({ locale }: { locale: Locale }) {
  const [t, sanityTestimonial] = await Promise.all([
    getTranslations("trust"),
    getTrustRowTestimonial(locale),
  ]);

  const quote = sanityTestimonial?.quote ?? t("testimonial.quote");
  const author = sanityTestimonial?.author ?? t("testimonial.author");
  const role = sanityTestimonial?.role ?? t("testimonial.role");

  return (
    <section
      aria-label={t("eyebrow")}
      className="bg-cream border-forest/10 border-y px-5 py-8 sm:px-8 lg:px-10 lg:py-12"
    >
      <div className="mx-auto flex max-w-[1360px] flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex flex-col gap-4 lg:gap-5">
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

        <figure className="lg:max-w-[480px] lg:text-right">
          <blockquote
            className="text-forest leading-[1.55]"
            style={{ fontSize: "var(--text-body)" }}
          >
            <span aria-hidden className="text-copper pr-1">
              &ldquo;
            </span>
            {quote}
            <span aria-hidden className="text-copper pl-1">
              &rdquo;
            </span>
          </blockquote>
          <figcaption className="text-forest/70 mt-3 text-[13px] leading-[20px]">
            <span className="text-pine font-medium">{author}</span>
            <span aria-hidden className="px-2">
              ·
            </span>
            <span>{role}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
