# 0003. Tweetalige URL-strategie

**Status:** Accepted
**Date:** 2026-04-18

## Context

De Branded Baristas website is beschikbaar in twee talen: Nederlands (primair) en Engels (voor internationale klanten en events). De bestaande WordPress-site is uitsluitend in het Nederlands en heeft geen gestructureerde URL-hiërarchie voor meerdere talen.

Bij het ontwerpen van de nieuwe URL-structuur spelen de volgende belangen:

- **SEO-autoriteit per taal**: zoekmachines moeten per taal duidelijk kunnen indexeren. Gemengde of ambigue URL-structuren leiden tot canonicalisatieproblemen.
- **`hreflang`-implementatie**: Google vereist `hreflang`-tags om te signaleren dat twee URL's dezelfde content in verschillende talen bevatten. De URL-structuur moet dit patroon faciliteren.
- **Semantisch correcte slugs**: de Nederlandse slug `/diensten/events/` en de Engelse slug `/services/events/` zijn verschillende URLs maar beschrijven dezelfde pagina. Vertaalde slugs verbeteren de gebruikerservaring en zijn relevanter voor lokale zoekopdrachten.
- **Routeringslogica in Next.js**: `next-intl` is gekozen als i18n-bibliotheek. De URL-strategie moet aansluiten op `next-intl`'s routing-API.
- **Onderhoudbaarheid**: het CMS (Sanity) moet per document een NL- en EN-slug opslaan. De routering moet dit naadloos verwerken zonder custom middleware-spaghetti.

## Decision

We kiezen voor **padgebaseerde locale-prefixen** met `localePrefix: "always"` als routeringstrategie.

**URL-structuur:**

```
Primaire taal: /nl/...
Secundaire taal: /en/...

Voorbeelden:
  /nl/diensten/koffie-concepten
  /en/services/coffee-concepts

  /nl/blog/waarom-specialty-coffee
  /en/blog/why-specialty-coffee

  /nl/contact
  /en/contact
```

De rootroute `/` redirect naar `/nl/` (de standaardlocale). Er is geen URL zonder locale-prefix actief.

**Technische implementatie:**

- `next-intl` v3 met `localePrefix: "always"` in `i18n/routing.ts`. Dit zorgt ervoor dat alle routes altijd een expliciete locale in de URL hebben, inclusief de standaardlocale.
- Sanity-documenten slaan slugs op als `{ nl: string, en: string }`. De GROQ-query selecteert de juiste slug op basis van de actieve locale.
- `hreflang`-tags worden automatisch gegenereerd in de `<head>` via een generieke `AlternateLinks`-component die op elke pagina wordt gerenderd.
- CI bevat een `i18n:check`-script dat bij elke push verifieert of alle vertaalsleutels in `messages/nl.json` en `messages/en.json` gesynchroniseerd zijn. Missende vertalingen falen de build.

## Consequences

**Positief:**

- De URL-structuur is maximaal duidelijk voor zoekmachines. Elke taalversie heeft een eigen, canonieke URL. Er is geen ambiguïteit over welke pagina in welke taal is.
- `hreflang`-implementatie is eenvoudig en systematisch. De `AlternateLinks`-component bouwt de juiste tags op basis van de beschikbare locales en de huidige route.
- `next-intl` verwerkt padgebaseerde prefixen natively. Er is geen custom middleware nodig voor locale-detectie en -redirect.
- Vertalers en redacteuren werken in Sanity met duidelijk gescheiden NL- en EN-slugvelden. Er is geen verwarring over welke slug op welke URL terechtkomt.

**Negatief / aandachtspunten:**

- Het Sanity-schema vereist twee slugvelden per document in plaats van één. Dit is een kleine toevoeging aan de schemaComplexiteit maar noodzakelijk voor de semantisch vertaalde URL's.
- De CI-guardrail (`i18n:check`) moet onderhouden worden naarmate het aantal vertaalsleutels groeit. Bij een grote uitbreiding van de UI kan dit een korte bottleneck vormen als vertalingen niet synchroon worden bijgehouden.
- Bezoekers die rechtstreeks naar `/` navigeren worden altijd doorgestuurd naar `/nl/`. Dit is het gewenste gedrag maar vereist dat de redirect correct geconfigureerd is in `middleware.ts`.

**Neutraal:**

- Alle interne links in de codebase moeten de `Link`-component van `next-intl` gebruiken (niet Next.js' native `Link`), omdat deze automatisch de actieve locale aan de URL toevoegt. Dit is een conventies-kwestie die eenmalig moet worden ingesteld maar geen architectureel risico vormt.

## Alternatives considered

**Subdomein-gebaseerde locales** (`nl.branded-baristas.com` / `en.branded-baristas.com`) zijn een gangbare aanpak bij grote organisaties met afzonderlijke teams per taalregio. Voor Branded Baristas levert dit alleen overhead op: extra DNS-records, aparte TLS-certificaten per subdomein, en complexere CORS-configuratie voor de Sanity Studio. De SEO-winst ten opzichte van padgebaseerde locales is verwaarloosbaar voor sites van deze omvang.

**Queryparameter-locales** (`branded-baristas.com/diensten?lang=en`) zijn een anti-pattern voor SEO. Google behandelt queryparameters als optionele filterparameters, niet als canonieke URL-componenten. Dit betekent dat NL en EN als dezelfde pagina worden gezien, wat de zichtbaarheid in Engelstalige zoekopdrachten ondermijnt. Bovendien werkt `hreflang` slecht met queryparameter-locales.

**Standaardlocale zonder prefix** (`/diensten/` voor NL, `/en/diensten/` voor EN) is een populaire keuze omdat de primaire taal "schonere" URL's krijgt. Het nadeel is canonicalisatie-ambiguïteit: als de standaardlocale ooit verandert (NL wordt EN of omgekeerd), veranderen alle primaire URL's en verlies je opgebouwde linkwaarde. Met `localePrefix: "always"` zijn alle URL's stabiel en onafhankelijk van de volgorde van locales in de configuratie.
