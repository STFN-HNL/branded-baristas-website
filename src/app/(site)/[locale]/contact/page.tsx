import Image from "next/image";
import { Footer } from "@/components/blocks/Footer";
import { ContactForm } from "@/components/forms/ContactForm";
import { getContactContent } from "@/content/contact";
import type { Locale } from "@/lib/i18n/routing";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const content = getContactContent(locale);

  return (
    <>
      <section className="relative h-[560px] w-full overflow-hidden">
        <Image
          src={content.hero.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-20 pb-[80px]">
          <span className="text-cream text-[12px] leading-[27px]">{content.hero.eyebrow}</span>
          <h1 className="font-display text-cream mt-4 max-w-[900px] text-[64px] leading-[1.05]">
            {content.hero.title}
          </h1>
          <p className="text-cream mt-6 max-w-[660px] text-[20px] leading-[27px]">
            {content.hero.lead}
          </p>
        </div>
      </section>

      <section className="bg-cream px-10 py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-16 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-20">
          <aside className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <h2 className="font-display text-pine text-[36px] leading-[41.58px]">
                {content.info.title}
              </h2>
              <p className="text-forest text-[18px] leading-[27px]">{content.info.description}</p>
            </div>
            <dl className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <dt className="text-copper text-[12px] leading-[27px]">
                  {content.info.email.label}
                </dt>
                <dd>
                  <a
                    href={`mailto:${content.info.email.value}`}
                    className="text-forest hover:text-copper text-[18px] leading-[27px] transition-colors"
                  >
                    {content.info.email.value}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-copper text-[12px] leading-[27px]">
                  {content.info.phone.label}
                </dt>
                <dd>
                  <a
                    href={`tel:${content.info.phone.value.replace(/[^+\d]/g, "")}`}
                    className="text-forest hover:text-copper text-[18px] leading-[27px] transition-colors"
                  >
                    {content.info.phone.value}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-copper text-[12px] leading-[27px]">
                  {content.info.address.label}
                </dt>
                <dd className="text-forest text-[18px] leading-[27px]">
                  {content.info.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-copper text-[12px] leading-[27px]">
                  {content.info.hours.label}
                </dt>
                <dd className="text-forest text-[18px] leading-[27px]">
                  {content.info.hours.value}
                </dd>
              </div>
            </dl>
          </aside>

          <div className="bg-pine rounded-[20px] px-8 py-10 lg:px-12 lg:py-12">
            <div className="mb-8 flex flex-col gap-3">
              <h2 className="font-display text-cream text-[36px] leading-[41.58px]">
                {content.form.title}
              </h2>
              <p className="text-cream/80 text-[18px] leading-[27px]">{content.form.description}</p>
            </div>
            <ContactForm
              fields={content.form.fields}
              placeholders={content.form.placeholders}
              submitLabel={content.form.submit}
              disclaimer={content.form.disclaimer}
            />
          </div>
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}
