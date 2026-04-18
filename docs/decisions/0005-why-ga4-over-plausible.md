# 0005. Keuze voor GA4 boven Plausible

**Status:** Accepted
**Date:** 2026-04-18

## Context

Na lancering van de nieuwe site is inzicht in bezoekersgedrag noodzakelijk om marketingbeslissingen te onderbouwen. De analyticsoplossing moet minimaal het volgende bieden:

- **Lanceringstracking**: paginaweergaven, sessies, bouncepercentage, en toplandingspagina's bij lancering.
- **Conversietracking**: het bijhouden van contactformulierinzendingen en offerteaanvragen als doelen.
- **Compatibiliteit met Google Ads**: Stefan's roadmap (F2-kwartaal) bevat betaalde Google Ads-campagnes voor events en catering. Conversiedata moet beschikbaar zijn voor biedstrategieën en doelgroepopbouw in Google Ads.
- **AVG-compliance**: de site serveert bezoekers uit de EU. Elke cookieplaatsende analyticsoplossing vereist een toestemmingsbanner conform de AVG en de ePrivacy-richtlijn.

De keuze staat primair tussen **Google Analytics 4 (GA4)** en **Plausible Analytics**.

## Decision

We kiezen voor **GA4**, geïmplementeerd via **Google Tag Manager (GTM)**, in combinatie met een **cookieconsentbanner** die GTM-tags pas activeert na expliciete toestemming van de bezoeker.

**Implementatiedetails:**

- GTM-container wordt geladen via `<Script strategy="afterInteractive">` in de Next.js `layout.tsx`. De container zelf bevat de GA4-configuratietag en eventtags.
- De cookieconsentbanner (geïmplementeerd met een lichtgewicht bibliotheek conform AVG) blokkeert GTM-activatie totdat de bezoeker toestemming geeft. GTM's Consent Mode v2 wordt geconfigureerd zodat Google geen data verwerkt vóór toestemming.
- **IP-anonimisering** is standaard ingeschakeld in GA4 (niet uitschakelbaar in de EU per Google's eigen beleid sinds 2023).
- Geen `user_id` of andere gebruikersidentificerende parameters worden doorgegeven. Alle eventparameters zijn anoniem (paginatitel, eventnaam, formuliernaam).
- De bestaande **Google Search Console**-property is gekoppeld aan GA4. Dit levert gecombineerde inzichten in organische zoekprestaties en sitegedrag.

**GTM-tags:**

1. GA4 Configuration Tag — triggert op alle pagina's na consent.
2. GA4 Event Tag: `form_submit` — triggert op inzending van contactformulier en offerteformulier.
3. GA4 Event Tag: `page_view` — standaard bij SPA-navigatie via History Change trigger.

## Consequences

**Positief:**

- GA4 is de enige gratis analyticsoplossing met native koppeling aan Google Ads. Conversies geregistreerd in GA4 kunnen direct worden geïmporteerd in Google Ads als conversiedoelen, en bezoekerssegmenten kunnen worden gebruikt als remarketingdoelgroepen. Dit is essentieel voor de geplande paid-ads campagnes.
- GA4 is gratis, ook bij hoog bezoekvolume. Er is geen maandelijkse kostenpost.
- De koppeling met Google Search Console is direct beschikbaar na verificatie. Organische zoekdata en sitegedragdata worden gecombineerd in één rapportageomgeving.
- GTM biedt flexibiliteit om later extra tags toe te voegen (bijv. LinkedIn Insight Tag, Facebook Pixel) zonder code-deploy.

**Negatief / aandachtspunten:**

- AVG vereist expliciete toestemming vóór het plaatsen van analytische cookies. De cookieconsentbanner is verplicht en beïnvloedt de gebruikerservaring. Bezoekers die weigeren worden niet getrackt — afhankelijk van het acceptatiepercentage kan dit leiden tot een significant gat in de data (branchegemiddelde: 60–80% acceptatie op niet-intrusieve banners).
- GA4 laadt een extern JavaScript-bestand (~17 KB gzip) dat de client-side performance beïnvloedt. Dit wordt gemitigeerd door `strategy="afterInteractive"` (laadt pas na hydration) en het feit dat Cloudflare de assets cachet.
- GA4 verwerkt persoonsgegevens (ook geanonimiseerd) en vereist vermelding in het privacybeleid van de site. IP-anonimisering is ingeschakeld, maar het gebruik van Google-servers voor dataverwerking moet transparant worden gecommuniceerd aan bezoekers.
- GTM voegt een indirectielaag toe: analyticsgedrag is geconfigureerd in een extern dashboard (GTM), niet in de codebase. Wijzigingen in GTM zijn niet zichtbaar in versiebeheer.

**Neutraal:**

- GA4's datamodel (events-gebaseerd in plaats van sessies-gebaseerd zoals Universal Analytics) vereist een leercurve voor rapportage. De meeste standaardrapporten zijn echter bruikbaar zonder diepgaande configuratie.

## Alternatives considered

**Plausible Analytics** is een sterk alternatief met uitstekende UX: een overzichtelijk dashboard, geen cookievereiste (en dus geen toestemmingsbanner nodig), en volledig AVG-compliant zonder dataverwerking buiten de EU. De grootste beperking is de afwezigheid van Google Ads-integratie. Plausible ondersteunt geen conversie-import naar Google Ads en geen doelgroepopbouw voor remarketing. Omdat Google Ads expliciet op de F2-roadmap staat, is Plausible onvoldoende voor de middellange termijn. Bovendien kost Plausible €9–€19 per maand, terwijl GA4 gratis is. De keuze voor GA4 is dus zowel functioneel als financieel gemotiveerd.

**Matomo self-hosted** biedt maximale controle over data en volledige AVG-compliance zonder externe dataverwerking. De operationele overhead (eigen server, database, updates) is echter onevenredig groot voor een marketing-website. Stefan's principes zijn gericht op minimale ops-overhead; een self-hosted analyticsdienst past daar niet bij.

**Umami** is een lichtgewicht, open-source analyticsoplossing met een cloud-optie. Het dashboard is eenvoudig en er is geen cookievereiste. Net als Plausible ontbreekt echter de Google Ads-integratie volledig. Umami is nog relatief immatuur en heeft minder ecosysteemondersteuning dan GA4 of Plausible.

**Geen analytics bij lancering** was tijdelijk overwogen om de lanceringsscope te verkleinen. Dit is verworpen omdat lanceringstracking essentieel is voor het vaststellen van een baseline. Zonder data bij lancering is het onmogelijk om de effectiviteit van de site objectief te beoordelen of de ROI van toekomstige Google Ads-campagnes te meten.
