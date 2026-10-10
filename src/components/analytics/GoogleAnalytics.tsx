import Script from "next/script";
import { CONSENT_STORAGE_KEY } from "@/lib/analytics";

/**
 * GA4 loader. No-ops when `NEXT_PUBLIC_GA_ID` is unset, so local development
 * and preview environments never ship a tracker. Uses Next's <Script> with
 * `afterInteractive` so the tag does not block first paint or TTI.
 *
 * Consent mode v2, denied by default. The stored cookie-banner choice is read
 * here, in the consent default itself, so returning visitors who accepted are
 * counted from the first hit — the banner only sends `consent update` when the
 * visitor makes (or changes) a choice.
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          var analyticsGranted = false;
          try {
            analyticsGranted = localStorage.getItem('${CONSENT_STORAGE_KEY}') === 'granted';
          } catch (e) {}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: analyticsGranted ? 'granted' : 'denied',
            wait_for_update: 500
          });
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
