import Script from "next/script";

/**
 * GA4 loader. No-ops when `NEXT_PUBLIC_GA_ID` is unset, so local development
 * and preview environments never ship a tracker. Uses Next's <Script> with
 * `afterInteractive` so the tag does not block first paint or TTI.
 *
 * Consent handling is intentionally minimal: we set `anonymize_ip` and rely on
 * a (future) cookie banner to flip `gtag('consent', 'update', ...)`. Until the
 * banner ships, GA4 defaults to the denied-by-default consent model.
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
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
