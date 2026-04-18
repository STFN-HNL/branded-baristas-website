# 0004. Redirectstrategie bij migratie van WordPress

**Status:** Accepted
**Date:** 2026-04-18

## Context

De bestaande WordPress-site van Branded Baristas heeft geïndexeerde URL's in Google Search Console. Een subset van deze URL's genereert significante organische traffic — met name:

- `/coffee-concepts/*` (meest bezochte categorie)
- `/offerte-aanvragen` (hoog-conversie contactpagina)
- `/contact`
- Diverse bloguploads en `/wp-content/`-paden

Bij een volledige migratie naar de nieuwe Next.js-site veranderen al deze URL's. Zonder correcte 301-redirects verliest de site de opgebouwde SEO-autoriteit op deze pagina's. Google's documentatie is duidelijk: 301-redirects zijn de enige betrouwbare manier om linkwaarde te behouden bij een URL-wijziging.

De redirectvereisten zijn:

- **Volumetrisch**: tientallen tot honderden URL's moeten geredirect worden. Week 5 van het projectplan voorziet in een volledige export van top-URL's via Google Search Console en een Screaming Frog-crawl van de live WordPress-site.
- **Prioriteit**: redirect moet plaatsvinden vóór enige applicatielogica (i18n-routing, authenticatie, caching) om foutieve 404-respons te voorkomen.
- **Testbaarheid**: redirects moeten unit-testbaar zijn zonder een volledige Next.js-serverinstantie op te starten.
- **Versiebeheer**: redirects moeten reviewbaar zijn in Pull Requests, niet geconfigureerd in externe dashboards.

## Decision

We implementeren een **code-gebaseerde redirectmap** in `src/lib/redirects.ts`, toegepast in `middleware.ts` als 301-redirect vóór de `next-intl`-routing.

**Structuur van `src/lib/redirects.ts`:**

```typescript
export const redirects: Record<string, string> = {
  "/coffee-concepts": "/nl/diensten/koffie-concepten",
  "/coffee-concepts/barista": "/nl/diensten/koffie-concepten/barista",
  "/offerte-aanvragen": "/nl/offerte",
  "/contact": "/nl/contact",
  // ... uitgebreid in Week 5 na Search Console export
};
```

**Volgorde in `middleware.ts`:**

1. Redirectcheck: als het inkomende pad voorkomt in `redirects`, stuur direct een 301-response terug.
2. `next-intl`-middleware: verwerk locale-detectie en routing.
3. Overige middleware (auth, headers, CSP).

Door de redirectcheck als eerste stap te plaatsen, worden WordPress-URL's nooit doorgegeven aan de Next.js-routeringslaag. Dit voorkomt dubbele processing en false-positive 404-errors in logs.

**Uitbreiding in Week 5:**

Op basis van een Google Search Console-export (top 200 URL's op traffic) en een Screaming Frog-crawl van de live site wordt de redirectmap uitgebreid. Het resultaat wordt toegevoegd aan `src/lib/redirects.ts` via een PR met reviewstap.

**Testcoverage:**

- Unitttests in `src/lib/redirects.test.ts` verifiëren dat bekende WordPress-URL's de correcte doelURL's retourneren.
- E2E-tests in `tests/redirects.spec.ts` (Playwright) verifiëren de HTTP 301-statuscode en de `Location`-header voor kritische paden.

## Consequences

**Positief:**

- De redirectmap staat in versiebeheer. Elke wijziging is zichtbaar in een PR, inclusief diffoverzicht. Dit maakt audits en rollbacks eenvoudig.
- Redirects zijn unit- en E2E-testbaar zonder externe afhankelijkheden. De testrunner (Vitest voor units, Playwright voor E2E) dekt beide lagen.
- Er is geen Sanity-query of databaseroundtrip nodig per redirect. De lookup is puur in-memory, wat de performance verwaarloosbaar belast.
- De implementatie is volledig deterministisch: hetzelfde inkomende pad levert altijd hetzelfde resultaat, ongeacht CMS-status of databaseverbinding.

**Negatief / aandachtspunten:**

- Redacteuren en marketeers kunnen geen redirects zelf aanmaken of beheren. Elke nieuwe redirect vereist een code-wijziging en deploy. Voor een klein team met weinig URL-mutaties is dit acceptabel; bij intensief campagnegebruik (veel tijdelijke landingspagina's) kan dit wringen.
- De huidige implementatie gebruikt een plain object (`Record<string, string>`), waardoor lookup O(n) is. Voor de verwachte omvang van <500 redirects is dit geen probleem. Als de map groeit naar duizenden entries, moet dit worden omgezet naar een `Map<string, string>` voor O(1) lookups.

**Neutraal:**

- De redirect-middleware draait op elke request naar de Next.js-server. Bij hoog verkeer is de overhead minimaal (een eenvoudige objectlookup), maar het vergt een bewuste keuze om de lijst niet te laten groeien met redirects die nooit meer nodig zijn. Periodieke opschoning van de redirectmap na zes maanden na lancering is aan te raden.

## Alternatives considered

**Sanity-beheerde redirects** (een `redirects`-collectie in het CMS) bieden de flexibiliteit dat redacteuren zelf redirects kunnen aanmaken. Dit klinkt aantrekkelijk maar introduceert een Sanity-query op elke inkomende request — ook voor bezoekers die nooit op een geredirect pad navigeren. Bovendien voegt het een afhankelijkheid toe aan het kritische pad van de applicatie: als de Sanity-API traag of onbereikbaar is, falen redirects. Voor de huidige omvang en het team is deze complexiteit niet gerechtvaardigd.

**`next.config.ts` redirects-array** is de standaard Next.js-aanpak voor statische redirects. Het nadeel is dat Next.js de volledige configuratie bij elke build evalueert, en dat per-request logica (bijv. wildcard matching met query-preservering) lastiger te implementeren is dan in middleware. Bovendien is de testbaarheid beperkt: er is geen goede manier om `next.config.ts`-redirects in isolatie te testen zonder de volledige Next.js-server op te starten.

**Cloudflare Page Rules of Redirect Rules** zouden de redirects volledig buiten de applicatiecode plaatsen. Dit heeft als voordeel dat ze voor de Next.js-server worden afgehandeld (op Cloudflare's edge), maar als groot nadeel dat ze niet in versiebeheer leven, niet in de PR-flow zichtbaar zijn, en alleen te beheren zijn via het Cloudflare-dashboard. Bij een teamwisseling of disaster recovery is dit een risico. Bovendien heeft Cloudflare's gratis tier limieten op het aantal Page Rules.
