import { getTranslations } from "next-intl/server";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/contactInfo";
import { env } from "@/lib/env";

const linkClass =
  "border-forest/20 text-forest hover:border-copper hover:text-copper inline-flex w-fit items-center gap-2 rounded-full border px-5 py-2.5 text-[15px] leading-[20px] transition-colors";

/**
 * Low-friction alternatives next to the quote form: call, WhatsApp and — when
 * NEXT_PUBLIC_CAL_URL is configured — a booking link.
 */
export async function DirectContact() {
  const t = await getTranslations("directContact");
  const calUrl = env.NEXT_PUBLIC_CAL_URL;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-display text-pine text-[20px] leading-[27px] tracking-[-0.02em]">
        {t("title")}
      </h3>
      <div className="flex flex-wrap gap-3">
        <a href={`tel:${PHONE_TEL}`} className={linkClass}>
          {t("call")} · {PHONE_DISPLAY}
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {t("whatsapp")}
        </a>
        {calUrl ? (
          <a href={calUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {t("plan")}
          </a>
        ) : null}
      </div>
    </div>
  );
}
