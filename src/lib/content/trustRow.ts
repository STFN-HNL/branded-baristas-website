import { sanityClient } from "@/lib/sanity/client";
import { TRUST_ROW_TESTIMONIAL_QUERY } from "@/lib/sanity/queries/testimonial";
import type { Locale } from "@/lib/i18n/routing";

export type Testimonial = { quote: string; author: string; role: string };

type RawTestimonial = {
  quote: { nl: string; en: string };
  author: string;
  role: { nl: string; en: string };
  company?: string;
};

export async function getTrustRowTestimonial(locale: Locale): Promise<Testimonial | null> {
  const raw = await sanityClient
    .fetch<RawTestimonial | null>(
      TRUST_ROW_TESTIMONIAL_QUERY,
      {},
      { next: { tags: ["testimonial"] } },
    )
    .catch(() => null);

  if (raw) {
    return {
      quote: raw.quote?.[locale] ?? raw.quote?.nl ?? "",
      author: raw.author ?? "",
      role: raw.role?.[locale] ?? raw.role?.nl ?? "",
    };
  }

  return null;
}
