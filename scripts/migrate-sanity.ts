import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "fs";
import path from "path";

if (!process.env.SANITY_WRITE_TOKEN) {
  throw new Error(
    "SANITY_WRITE_TOKEN is required. Run: pnpm tsx --env-file .env.local scripts/migrate-sanity.ts",
  );
}

const client = createClient({
  projectId: "i3uf28e7",
  dataset: "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

function textToBlocks(strings: string[]) {
  return strings.map((text, i) => ({
    _type: "block",
    _key: `block_${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `span_${i}`, text, marks: [] }],
  }));
}

async function uploadImage(
  publicPath: string,
): Promise<{ _type: "reference"; _ref: string } | null> {
  const fullPath = path.join(process.cwd(), "public", publicPath);
  if (!existsSync(fullPath)) {
    console.warn(`  ⚠ Image not found: ${fullPath}`);
    return null;
  }
  const filename = path.basename(publicPath);
  const asset = await client.assets.upload("image", createReadStream(fullPath), { filename });
  return { _type: "reference", _ref: asset._id };
}

async function upsert(doc: Record<string, unknown>) {
  await client.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0]);
  console.log(`  ✓ ${doc._type} ${doc._id}`);
}

async function migrateFaqItems() {
  console.log("\nMigrating FAQ items…");
  const { getHomeContent } = await import("@/content/home");
  const nlItems = getHomeContent("nl").faq.items;
  const enItems = getHomeContent("en").faq.items;

  for (let i = 0; i < nlItems.length; i++) {
    await upsert({
      _id: `faq-item-${i + 1}`,
      _type: "faqItem",
      question: {
        _type: "localeString",
        nl: nlItems[i].question,
        en: enItems[i]?.question ?? nlItems[i].question,
      },
      answer: {
        _type: "localeText",
        nl: nlItems[i].answer,
        en: enItems[i]?.answer ?? nlItems[i].answer,
      },
      order: i + 1,
    });
  }
}

async function migrateTestimonials() {
  console.log("\nMigrating testimonials…");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const nlMessages = require("../messages/nl.json");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const enMessages = require("../messages/en.json");

  await upsert({
    _id: "testimonial-trust-row",
    _type: "testimonial",
    quote: {
      _type: "localeText",
      nl: nlMessages.trust.testimonial.quote,
      en: enMessages.trust.testimonial.quote,
    },
    author: nlMessages.trust.testimonial.author,
    role: {
      _type: "localeString",
      nl: nlMessages.trust.testimonial.role,
      en: enMessages.trust.testimonial.role,
    },
    company: "Adidas Benelux",
  });
}

async function migrateCases() {
  console.log("\nMigrating case studies…");
  const { getCasesContent } = await import("@/content/cases");
  const nlCases = getCasesContent("nl").items;
  const enCases = getCasesContent("en").items;

  for (const nlCase of nlCases) {
    const enCase = enCases.find((c) => c.slug === nlCase.slug);
    const heroRef = nlCase.image ? await uploadImage(nlCase.image) : null;

    await upsert({
      _id: `case-${nlCase.slug}`,
      _type: "case",
      category: nlCase.category,
      title: { _type: "localeString", nl: nlCase.title, en: enCase?.title ?? nlCase.title },
      slug: {
        nl: { _type: "slug", current: nlCase.slug },
        en: { _type: "slug", current: nlCase.slug },
      },
      client: nlCase.client,
      location: nlCase.location,
      guestCount: parseInt(nlCase.guests.replace(/\D/g, ""), 10) || 0,
      ...(heroRef
        ? {
            hero: {
              _type: "imageWithAlt",
              asset: heroRef,
              alt: { _type: "localeString", nl: nlCase.title, en: enCase?.title ?? nlCase.title },
            },
          }
        : {}),
      story: {
        nl: textToBlocks([nlCase.excerpt]),
        en: textToBlocks([enCase?.excerpt ?? nlCase.excerpt]),
      },
    });
  }
}

async function migrateConcepts() {
  console.log("\nMigrating concepts…");
  const { getHomeContent } = await import("@/content/home");
  const nlHome = getHomeContent("nl");
  const enHome = getHomeContent("en");

  const allNl = [...nlHome.events.concepts, ...nlHome.inCompany.concepts];
  const allEn = [...enHome.events.concepts, ...enHome.inCompany.concepts];
  const isEvents = new Set(nlHome.events.concepts.map((c) => c.slug));

  for (const nlConcept of allNl) {
    const enConcept = allEn.find((c) => c.slug === nlConcept.slug);
    const heroRef = nlConcept.image ? await uploadImage(nlConcept.image) : null;

    await upsert({
      _id: `concept-${nlConcept.slug}`,
      _type: "concept",
      category: isEvents.has(nlConcept.slug) ? "events" : "in-company",
      title: {
        _type: "localeString",
        nl: nlConcept.title,
        en: enConcept?.title ?? nlConcept.title,
      },
      slug: {
        nl: { _type: "slug", current: nlConcept.slug },
        en: { _type: "slug", current: nlConcept.slug },
      },
      shortDescription: {
        _type: "localeText",
        nl: nlConcept.description,
        en: enConcept?.description ?? nlConcept.description,
      },
      ...(heroRef
        ? {
            hero: {
              _type: "imageWithAlt",
              asset: heroRef,
              alt: {
                _type: "localeString",
                nl: nlConcept.title,
                en: enConcept?.title ?? nlConcept.title,
              },
            },
          }
        : {}),
    });
  }
}

async function migrateGuides() {
  console.log("\nMigrating guides…");
  const { getCoffeeCateringGuide } = await import("@/content/guides/coffee-catering");
  const { getBaristaBarSpecsGuide } = await import("@/content/guides/barista-bar-specs");

  const guides = [
    { slug: "koffiecatering", nl: getCoffeeCateringGuide("nl"), en: getCoffeeCateringGuide("en") },
    {
      slug: "barista-bar-specs",
      nl: getBaristaBarSpecsGuide("nl"),
      en: getBaristaBarSpecsGuide("en"),
    },
  ];

  for (const { slug, nl, en } of guides) {
    await upsert({
      _id: `guide-${slug}`,
      _type: "guide",
      title: { _type: "localeString", nl: nl.title, en: en.title },
      slug: {
        nl: { _type: "slug", current: slug },
        en: { _type: "slug", current: slug },
      },
      lead: { _type: "localeText", nl: nl.lead, en: en.lead },
      intro: {
        nl: textToBlocks(nl.intro),
        en: textToBlocks(en.intro),
      },
      sections: nl.sections.map((s, i) => ({
        _type: "object",
        _key: `section_${i}`,
        id: s.id,
        heading: { _type: "localeString", nl: s.heading, en: en.sections[i]?.heading ?? s.heading },
        body: {
          nl: textToBlocks(s.body),
          en: textToBlocks(en.sections[i]?.body ?? s.body),
        },
      })),
      cta: {
        title: { _type: "localeString", nl: nl.cta.title, en: en.cta.title },
        description: { _type: "localeText", nl: nl.cta.description, en: en.cta.description },
        label: { _type: "localeString", nl: nl.cta.label, en: en.cta.label },
      },
      updatedAt: nl.updated,
      readingTimeMinutes: nl.readingTimeMinutes,
    });
  }
}

async function migrateHomePage() {
  console.log("\nMigrating home page singleton…");
  const { getHomeContent } = await import("@/content/home");
  const nl = getHomeContent("nl");
  const en = getHomeContent("en");

  await upsert({
    _id: "singleton-homePage",
    _type: "homePage",
    intro: {
      eyebrow: { _type: "localeString", nl: nl.intro.eyebrow, en: en.intro.eyebrow },
      title: { _type: "localeString", nl: nl.intro.title, en: en.intro.title },
      description: { _type: "localeText", nl: nl.intro.description, en: en.intro.description },
      ctaLabel: { _type: "localeString", nl: nl.intro.ctaLabel, en: en.intro.ctaLabel },
    },
    inlineCta: {
      text: { _type: "localeString", nl: nl.inlineCta.text, en: en.inlineCta.text },
      ctaLabel: { _type: "localeString", nl: nl.inlineCta.ctaLabel, en: en.inlineCta.ctaLabel },
    },
    tagline: {
      title: { _type: "localeString", nl: nl.tagline.title, en: en.tagline.title },
    },
    pillars: {
      // HomeContent uses "subtitle"; Sanity schema uses "eyebrow" — store under eyebrow
      eyebrow: { _type: "localeString", nl: nl.pillars.subtitle, en: en.pillars.subtitle },
      title: { _type: "localeString", nl: nl.pillars.title, en: en.pillars.title },
      items: nl.pillars.items.map((item, i) => ({
        _type: "object",
        _key: `pillar_${i}`,
        icon: item.icon,
        title: {
          _type: "localeString",
          nl: item.title,
          en: en.pillars.items[i]?.title ?? item.title,
        },
        description: {
          _type: "localeText",
          nl: item.description,
          en: en.pillars.items[i]?.description ?? item.description,
        },
      })),
    },
    differentiator: {
      title: { _type: "localeString", nl: nl.differentiator.title, en: en.differentiator.title },
      description: {
        _type: "localeText",
        nl: nl.differentiator.description,
        en: en.differentiator.description,
      },
      features: nl.differentiator.features.map((f, i) => ({
        _type: "object",
        _key: `feature_${i}`,
        title: {
          _type: "localeString",
          nl: f.title,
          en: en.differentiator.features[i]?.title ?? f.title,
        },
        description: {
          _type: "localeText",
          nl: f.description,
          en: en.differentiator.features[i]?.description ?? f.description,
        },
      })),
      quote: { _type: "localeText", nl: nl.differentiator.quote, en: en.differentiator.quote },
      quoteDescription: {
        _type: "localeString",
        nl: nl.differentiator.quoteDescription ?? "",
        en: en.differentiator.quoteDescription ?? "",
      },
      author: nl.differentiator.author,
      authorRole: {
        _type: "localeString",
        nl: nl.differentiator.authorRole,
        en: en.differentiator.authorRole,
      },
    },
    faqSection: {
      title: { _type: "localeString", nl: nl.faq.title, en: en.faq.title },
      description: { _type: "localeText", nl: nl.faq.description, en: en.faq.description },
      ctaLabel: { _type: "localeString", nl: nl.faq.ctaLabel, en: en.faq.ctaLabel },
    },
    contactSection: {
      title: { _type: "localeString", nl: nl.contact.title, en: en.contact.title },
      description: { _type: "localeText", nl: nl.contact.description, en: en.contact.description },
    },
  });
}

async function migrateAboutPage() {
  console.log("\nMigrating about page singleton…");
  const { getAboutContent } = await import("@/content/about");
  const nl = getAboutContent("nl");
  const en = getAboutContent("en");

  await upsert({
    _id: "singleton-aboutPage",
    _type: "aboutPage",
    hero: {
      eyebrow: { _type: "localeString", nl: nl.hero.eyebrow, en: en.hero.eyebrow },
      title: { _type: "localeString", nl: nl.hero.title, en: en.hero.title },
      lead: { _type: "localeText", nl: nl.hero.lead, en: en.hero.lead },
    },
    story: {
      title: { _type: "localeString", nl: nl.story.title, en: en.story.title },
      paragraphs: {
        nl: textToBlocks(nl.story.paragraphs),
        en: textToBlocks(en.story.paragraphs),
      },
    },
    values: {
      eyebrow: { _type: "localeString", nl: nl.values.eyebrow, en: en.values.eyebrow },
      title: { _type: "localeString", nl: nl.values.title, en: en.values.title },
      description: { _type: "localeText", nl: nl.values.description, en: en.values.description },
      items: nl.values.items.map((item, i) => ({
        _type: "object",
        _key: `value_${i}`,
        title: {
          _type: "localeString",
          nl: item.title,
          en: en.values.items[i]?.title ?? item.title,
        },
        description: {
          _type: "localeText",
          nl: item.description,
          en: en.values.items[i]?.description ?? item.description,
        },
      })),
    },
    cta: {
      title: { _type: "localeString", nl: nl.cta.title, en: en.cta.title },
      description: { _type: "localeText", nl: nl.cta.description, en: en.cta.description },
      primaryLabel: { _type: "localeString", nl: nl.cta.primaryLabel, en: en.cta.primaryLabel },
      secondaryLabel: {
        _type: "localeString",
        nl: nl.cta.secondaryLabel,
        en: en.cta.secondaryLabel,
      },
    },
  });
}

async function migrateBrandingPage() {
  console.log("\nMigrating branding page singleton…");
  const { getBrandingContent } = await import("@/content/branding");
  const nl = getBrandingContent("nl");
  const en = getBrandingContent("en");

  await upsert({
    _id: "singleton-brandingPage",
    _type: "brandingPage",
    hero: {
      eyebrow: { _type: "localeString", nl: nl.hero.eyebrow, en: en.hero.eyebrow },
      title: { _type: "localeString", nl: nl.hero.title, en: en.hero.title },
      lead: { _type: "localeText", nl: nl.hero.lead, en: en.hero.lead },
    },
    intro: {
      eyebrow: { _type: "localeString", nl: nl.intro.eyebrow, en: en.intro.eyebrow },
      title: { _type: "localeString", nl: nl.intro.title, en: en.intro.title },
      description: { _type: "localeText", nl: nl.intro.description, en: en.intro.description },
    },
    process: {
      eyebrow: { _type: "localeString", nl: nl.process.eyebrow, en: en.process.eyebrow },
      title: { _type: "localeString", nl: nl.process.title, en: en.process.title },
      description: { _type: "localeText", nl: nl.process.description, en: en.process.description },
      steps: nl.process.steps.map((s, i) => ({
        _type: "object",
        _key: `step_${i}`,
        title: { _type: "localeString", nl: s.title, en: en.process.steps[i]?.title ?? s.title },
        description: {
          _type: "localeText",
          nl: s.description,
          en: en.process.steps[i]?.description ?? s.description,
        },
      })),
    },
    cta: {
      title: { _type: "localeString", nl: nl.cta.title, en: en.cta.title },
      description: { _type: "localeText", nl: nl.cta.description, en: en.cta.description },
      primaryLabel: { _type: "localeString", nl: nl.cta.primaryLabel, en: en.cta.primaryLabel },
      secondaryLabel: {
        _type: "localeString",
        nl: nl.cta.secondaryLabel,
        en: en.cta.secondaryLabel,
      },
    },
  });
}

async function main() {
  console.log("Starting Sanity content migration…");
  await migrateFaqItems();
  await migrateTestimonials();
  await migrateCases();
  await migrateConcepts();
  await migrateGuides();
  await migrateHomePage();
  await migrateAboutPage();
  await migrateBrandingPage();
  console.log("\nMigration complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
