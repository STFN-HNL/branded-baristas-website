import { sanityClient } from "@/lib/sanity/client";
import { FAQ_ITEMS_QUERY } from "@/lib/sanity/queries/faqItems";
import type { Locale } from "@/lib/i18n/routing";

export type FaqItem = { question: string; answer: string };

type RawFaqItem = {
  question: { nl: string; en: string };
  answer: { nl: string; en: string };
};

export async function getFaqItems(locale: Locale): Promise<FaqItem[]> {
  const raw = await sanityClient
    .fetch<RawFaqItem[]>(FAQ_ITEMS_QUERY, {}, { next: { tags: ["faqItem"] } })
    .catch(() => null);

  if (raw && raw.length > 0) {
    return raw.map((item) => ({
      question: item.question?.[locale] ?? item.question?.nl ?? "",
      answer: item.answer?.[locale] ?? item.answer?.nl ?? "",
    }));
  }

  const { getHomeContent } = await import("@/content/home");
  return getHomeContent(locale).faq.items;
}
