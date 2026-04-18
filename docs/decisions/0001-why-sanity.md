# 0001. Keuze voor Sanity als headless CMS

**Status:** Accepted
**Date:** 2026-04-18

## Context

De bestaande Branded Baristas website draait op WordPress en is uitsluitend in het Nederlands opgezet. De nieuwe site moet tweetalig zijn (Nederlands en Engels), waarbij het marketingteam wekelijks blogposts publiceert zonder technische kennis. Redacteuren moeten content kunnen invoeren, vertalen en publiceren via een toegankelijke editor-interface. Naast de blog bevat de site ook pagina's voor diensten, projecten en een contactformulier — allemaal tweetalig en SEO-relevant.

De requirements voor het CMS zijn samengevat:

- **Tweetaligheid als first-class concern**: NL en EN zijn beide vereist, niet optioneel.
- **Wekelijkse blogpublicatie**: de redactie publiceert elke week nieuwe content, de editor-ervaring is dus kritisch.
- **Geen WordPress-erfenis**: het huidige WordPress-systeem is moeilijk te onderhouden, heeft beperkte API-mogelijkheden en kent nauwelijks i18n-ondersteuning.
- **Integratie met Next.js**: het CMS moet naadloos werken met de Next.js App Router en TypeScript, inclusief type-safe queries.
- **Afbeeldingsbeheer**: productfoto's en evenementfoto's moeten efficiënt worden opgeslagen en getransformeerd (resize, crop, format).

WordPress headless was een optie maar brengt legacy-infrastructuur mee die niet aansluit op de moderne stack.

## Decision

We kiezen voor **Sanity v3** als headless CMS, met de volgende implementatiekeuzes:

- **Embedded Studio** op de route `/studio` binnen de Next.js-applicatie via `sanity.config.ts`. Geen aparte Sanity-deploy nodig.
- **`next-sanity`** voor type-safe GROQ-queries, inclusief automatische TypeScript-type-generatie vanuit het schema (`sanity typegen`).
- **GROQ** als querytaal voor complexe fetches (meerdere locales tegelijk, geneste referenties, filtering op publicatiestatus).
- **`localeString`-patroon** in het schema: elk tekstveld dat vertaald moet worden krijgt de structuur `{ nl: string, en: string }`, met een `both-required`-validatieregel zodat redacteuren niet per ongeluk een vertaling overslaan.
- **Sanity CDN** voor afbeeldingshostin en -transformaties via de `@sanity/image-url` builder. Hierdoor vervalt de noodzaak voor een aparte beeldoptimalisatieservice.

## Consequences

**Positief:**

- Sanity biedt een volwassen en flexibel i18n-patroon. Het `localeString`-veld is breed gedocumenteerd en makkelijk uitbreidbaar. De `both-required`-validatie voorkomt dat content half vertaald live gaat.
- De Studio-interface is sterk in gebruiksvriendelijkheid. Redacteuren kunnen zelfstandig werken met de visuele editor zonder enige technische achtergrond. Dit is doorslaggevend voor de wekelijkse blogcyclus.
- Doordat de Studio embedded is in de Next.js-app, is er geen extra deploy nodig. Lokaal draait de Studio op dezelfde dev-server als de website.
- Sanity's CDN en image pipeline (`fit`, `width`, `format=webp`) worden direct aangesproken via URL-parameters. Dit elimineert de noodzaak voor `next/image` remote-patronen of een externe beeldservice.
- TypeScript-types worden automatisch gegenereerd vanuit het Sanity-schema, wat drift tussen CMS en frontend voorkomt.

**Negatief / aandachtspunten:**

- Schemawijzigingen vereisen een code-deploy. Omdat schema's in TypeScript worden gedefinieerd (code-first), kunnen redacteuren geen nieuwe velden toevoegen zonder een developer. Voor een klein team is dit acceptabel, maar het moet duidelijk gecommuniceerd worden.
- Sanity's gratis tier staat maximaal 3 gebruikers en 10.000 documenten toe. Bij verdere groei van het team of de contentbibliotheek wordt een betaald plan noodzakelijk. Voor de huidige omvang van Branded Baristas (1–3 redacteuren, <500 documenten) is dit ruim voldoende.

**Neutraal:**

- Sanity gebruikt zijn eigen querytaal GROQ in plaats van GraphQL of REST. GROQ is krachtig maar vereist een leercurve. Documentatie is goed, en de `next-sanity` integratie verbergt de meeste complexiteit achter typed helpers.

## Alternatives considered

**Payload CMS** was een serieuze kandidaat vanwege zijn TypeScript-native aanpak en zelfhostingmogelijkheden. Het nadeel is de extra operationele overhead: Payload vereist een eigen database en deployment, en de i18n-ondersteuning was ten tijde van de keuze minder volwassen dan Sanity's ecosysteem. Voor een team van één developer is die extra complexiteit niet gerechtvaardigd.

**MDX (lokale bestanden)** is ideaal voor technische blogs met statische content, maar leent zich slecht voor tweetalige content met wekelijkse updates door een niet-technisch marketingteam. Elke blogpost zou een Pull Request vereisen, wat de publicatiecyclus onnodig vertraagt.

**WordPress headless** (REST API of WPGraphQL) was de meest voor de hand liggende migratiestap, maar brengt dezelfde problemen mee als het huidige systeem: beperkte i18n-opties, verouderde admininterface en een PHP-stack die haaks staat op de moderne Next.js + TypeScript-omgeving. De klant zou bovendien WP-admin moeten blijven gebruiken.

**Contentful** biedt sterke enterprise-functies en goede SDK-ondersteuning, maar is prijzig zodra je meer dan één locale of meer dan 25k records nodig hebt. De editor-UX voor i18n-content is minder intuïtief dan Sanity Studio — redacteuren moeten handmatig tussen locales wisselen in plaats van een geïntegreerde naast-elkaar-weergave.
