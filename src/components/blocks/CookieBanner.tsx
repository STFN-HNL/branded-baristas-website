"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";

const STORAGE_KEY = "cookie_consent";

function updateConsent(value: "granted" | "denied") {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    (window.gtag as (...args: unknown[]) => void)("consent", "update", {
      analytics_storage: value,
    });
  }
}

export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "granted") {
      updateConsent("granted");
    } else if (!stored) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "granted");
    updateConsent("granted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("text")}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-pine/10 bg-cream px-6 py-5 shadow-lg sm:px-10"
    >
      <div className="mx-auto flex max-w-[1360px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-forest text-[14px] leading-[21px]">
          {t("text")}{" "}
          <Link
            href="/privacy"
            className="text-copper underline underline-offset-2 hover:text-copper/80"
          >
            {t("privacyLabel")}
          </Link>
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={decline}
            className="text-forest/70 hover:text-forest text-[14px] leading-[21px] underline underline-offset-2"
          >
            {t("decline")}
          </button>
          <button
            onClick={accept}
            className="bg-pine text-cream hover:bg-pine/90 rounded-full px-6 py-2.5 text-[14px] leading-[21px] transition-colors"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
