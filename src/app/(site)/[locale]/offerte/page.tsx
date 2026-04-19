import { Footer } from "@/components/blocks/Footer";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { getHomeContent } from "@/content/home";
import { getQuoteContent } from "@/content/quote";
import type { Locale } from "@/lib/i18n/routing";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function QuotePage({ params }: Props) {
  const { locale } = await params;
  const content = getQuoteContent(locale);
  const home = getHomeContent(locale);

  const concepts = [
    ...home.events.concepts.map((c) => ({ value: c.slug, label: c.title })),
    ...home.inCompany.concepts.map((c) => ({ value: c.slug, label: c.title })),
  ];

  return (
    <>
      <section className="bg-pine px-10 pt-[180px] pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1360px]">
          <span className="text-cream text-[12px] leading-[27px]">{content.hero.eyebrow}</span>
          <h1 className="font-display text-cream mt-4 max-w-[900px] text-[64px] leading-[1.05]">
            {content.hero.title}
          </h1>
          <p className="text-cream/80 mt-6 max-w-[660px] text-[20px] leading-[27px]">
            {content.hero.lead}
          </p>
        </div>
      </section>

      <section className="bg-cream px-10 py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20">
          <aside className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-pine text-[36px] leading-[41.58px]">
                {content.intro.title}
              </h2>
              <p className="text-forest text-[18px] leading-[27px]">
                {content.intro.description}
              </p>
            </div>
            <ol className="flex flex-col gap-6">
              {content.intro.steps.map((step) => (
                <li key={step.number} className="flex gap-5">
                  <span className="font-display text-copper text-[28px] leading-[33px]">
                    {step.number}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-pine text-[20px] leading-[27px] tracking-[-0.02em]">
                      {step.title}
                    </h3>
                    <p className="text-forest text-[16px] leading-[21.5px]">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>

          <div className="bg-pine rounded-[20px] px-8 py-10 lg:px-12 lg:py-12">
            <div className="mb-10 flex flex-col gap-3">
              <h2 className="font-display text-cream text-[36px] leading-[41.58px]">
                {content.form.title}
              </h2>
              <p className="text-cream/80 text-[18px] leading-[27px]">
                {content.form.description}
              </p>
            </div>
            <QuoteForm form={content.form} concepts={concepts} />
          </div>
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}
