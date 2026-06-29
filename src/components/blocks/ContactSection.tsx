import { HomeContactForm } from "@/components/forms/HomeContactForm";
import type { HomeContent } from "@/content/home";

type ContactSectionProps = {
  data: HomeContent["contact"];
};

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 10V17M8 7V7.01M11.5 17V13.5C11.5 12.1 12.6 11 14 11C15.4 11 16.5 12.1 16.5 13.5V17M11.5 11V17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ContactSection({ data }: ContactSectionProps) {
  return (
    <section className="bg-mocha px-5 pt-[100px] pb-[120px] sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-[80px] lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-col gap-5">
            <h2 className="font-display text-cream text-[clamp(2rem,7vw,3.125rem)] leading-[1.1] [overflow-wrap:break-word]">
              {data.title}
            </h2>
            <p className="text-cream/80 max-w-[460px] text-[18px] leading-[27px]">
              {data.description}
            </p>
          </div>
          <dl className="flex flex-col gap-[14px] text-[16px] leading-[24px]">
            <div className="flex items-baseline gap-6">
              <dt className="text-cream/70 w-[110px] shrink-0">{data.labels.office}</dt>
              <dd className="text-cream">{data.office}</dd>
            </div>
            <div className="flex items-baseline gap-6">
              <dt className="text-cream/70 w-[110px] shrink-0">{data.labels.email}</dt>
              <dd className="text-cream">
                <a href={`mailto:${data.email}`} className="underline underline-offset-4">
                  {data.email}
                </a>
              </dd>
            </div>
            <div className="flex items-baseline gap-6">
              <dt className="text-cream/70 w-[110px] shrink-0">{data.labels.phone}</dt>
              <dd className="text-cream">
                <a
                  href={`tel:${data.phone.replace(/\s/g, "")}`}
                  className="underline underline-offset-4"
                >
                  {data.phone}
                </a>
              </dd>
            </div>
          </dl>
          <div className="border-cream/15 border-t" />
          <div className="flex flex-col gap-4">
            <span className="text-cream/70 text-[14px] leading-[20px]">{data.labels.follow}</span>
            <div className="flex items-center gap-4">
              {data.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  aria-label={social.platform}
                  className="border-cream/25 text-cream hover:border-cream flex h-[40px] w-[40px] items-center justify-center rounded-full border transition-colors"
                >
                  {social.platform === "instagram" ? <InstagramIcon /> : <LinkedinIcon />}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-sand rounded-[20px] p-[34px]">
          <HomeContactForm
            labels={data.form.labels}
            placeholders={data.form.placeholders}
            submitLabel={data.form.submitLabel}
            thankYou={data.form.thankYou}
          />
        </div>
      </div>
    </section>
  );
}
