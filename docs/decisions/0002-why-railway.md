# 0002. Keuze voor Railway als hostingplatform

**Status:** Accepted
**Date:** 2026-04-18

## Context

De Branded Baristas website is een Next.js App Router-applicatie met server-side rendering, API routes, en een embedded Sanity Studio. Het hostingplatform moet de volgende eisen ondersteunen:

- **Containergebaseerde deployments**: de applicatie gebruikt een multi-stage Dockerfile voor reproduceerbare builds.
- **Preview environments**: elke Pull Request krijgt een eigen preview-URL zodat design en content gereviewed kunnen worden vóór productie.
- **Minimale operationele overhead**: het project wordt beheerd door één developer (Stefan). Complexe infra-configuraties zijn een kostenpost.
- **CDN-integratie**: statische assets en HTML moeten via een CDN worden geserveerd voor lage latency in Nederland en internationaal.
- **Aansluiting op de bestaande stack**: Stefan gebruikt Railway al voor andere projecten (Heinrich Co., Risemind), wat consistentie en hergebruik van kennis oplevert.

De applicatie is geen hoog-verkeer workload — verwacht wordt een paar duizend bezoekers per maand bij lancering, met piekbelasting tijdens evenementcampagnes.

## Decision

We kiezen voor **Railway** als primair hostingplatform, gecombineerd met **Cloudflare** als CDN en DNS-beheerder.

De deploymentarchitectuur is als volgt:

- **Docker multi-stage build**: de `Dockerfile` bevat een `deps`-stage voor npm-installatie, een `builder`-stage voor de Next.js-build, en een slanke `runner`-stage die alleen de gecompileerde output bevat. Dit minimaliseert de image-grootte en verbetert buildsecurity (geen dev-dependencies in productie).
- **Railway service**: de container wordt gerund als een Railway-service. Environment variables worden geconfigureerd via het Railway-dashboard en zijn toegankelijk als `process.env.*` in de applicatie.
- **Cloudflare proxy**: het domein `branded-baristas.com` wijst via Cloudflare naar de Railway-service. Cloudflare verzorgt TLS-terminatie, caching van statische assets, en bescherming tegen DDoS.
- **Sanity image CDN**: afbeeldingen worden niet via Railway geserveerd maar rechtstreeks via Sanity's eigen CDN. Railway wordt dus niet belast met image delivery.

Preview environments worden automatisch aangemaakt bij elke PR via Railway's GitHub-integratie.

## Consequences

**Positief:**

- Railway sluit aan op de bestaande stack van Stefan. Er is geen nieuwe vendor-relatie nodig, geen nieuwe dashboard te leren, en bestaande Railway-kennis is direct toepasbaar.
- PR preview environments werken out of the box na koppeling met GitHub. Dit versnelt de review-cyclus voor design, content en functionaliteit.
- De containergebaseerde aanpak geeft volledige controle over de build- en runtime-omgeving. Er zijn geen implicit platform constraints (zoals bij Vercel's Edge Runtime) die Next.js-functionaliteit kunnen beperken.
- Railway's dashboard is eenvoudig en overzichtelijk, wat de operationele overhead laag houdt.

**Negatief / aandachtspunten:**

- Railway heeft geen native image CDN. Dit is gemitigeerd door Cloudflare (voor statische assets) en Sanity's image pipeline (voor CMS-afbeeldingen). Next.js `<Image>` componenten gebruiken de Sanity CDN-URL direct, niet de Railway-origin.
- Auto-scaling is minder verfijnd dan bij Vercel. Bij plotselinge piekbelasting moet handmatig het aantal replicas worden bijgesteld of moeten Railway's auto-scaling triggers worden geconfigureerd. Voor de verwachte schaal van Branded Baristas is dit geen acuut probleem.
- De `Dockerfile` vereist onderhoud bij upgrades van Node.js of Next.js. Dit is een klein maar reëel onderhoudspunt.

**Neutraal:**

- Railway rekent op basis van daadwerkelijk gebruik (CPU + geheugen + network). Voor een site met laag-tot-matig verkeer is dit goedkoper dan een vaste prijs, maar minder voorspelbaar bij piekbelasting. Cloudflare caching dempt dit effect aanzienlijk.

## Alternatives considered

**Vercel** is de meest voor de hand liggende keuze voor Next.js-projecten en heeft uitstekende DX, inclusief instant preview environments en geoptimaliseerde Edge-caching voor Next.js-specifieke functies. Het is echter een extra vendor naast Railway. Stefan's doelstelling is het minimaliseren van het aantal platforms, niet het maximaliseren van DX-features. Vercel's gratis tier heeft bovendien strikte limieten op serverless function execution time, wat bij complexe server actions of data-fetching tot problemen kan leiden.

**Fly.io** biedt meer infrastructuurknoppen dan Railway (eigen Anycast-netwerk, volume mounts, multi-region) maar heeft een complexer dashboard en een steilere leercurve. Voor een single-developer project zonder multi-region vereisten weegt de extra flexibiliteit niet op tegen de overhead.

**AWS of Google Cloud Platform** bieden maximale controle en schaalbaarheid maar vereisen significante investeringen in infrastructuurconfiguratie (VPC, IAM, load balancers, container orchestration). Voor een marketing-website van een klein cateringbedrijf is dit disproportioneel.

**Netlify** is vergelijkbaar met Vercel voor statische sites maar heeft minder volwassen ondersteuning voor Next.js App Router en server-side rendering. De Edge Functions-implementatie wijkt af van de standaard Node.js runtime, wat compatibiliteitsproblemen kan geven.
