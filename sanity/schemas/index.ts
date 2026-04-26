import type { SchemaTypeDefinition } from "sanity";
import { localeString } from "./objects/localeString";
import { localeText } from "./objects/localeText";
import { localeBlocks } from "./objects/localeBlocks";
import { bilingualSlug } from "./objects/bilingualSlug";
import { imageWithAlt } from "./objects/imageWithAlt";
import { seo } from "./objects/seo";
import { settings } from "./settings";
import { page } from "./page";
import { author } from "./author";
import { category } from "./category";
import { testimonial } from "./testimonial";
import { brandingOption } from "./brandingOption";
import { pricingTier } from "./pricingTier";
import { concept } from "./concept";
import { caseStudy } from "./case";
import { post } from "./post";
import { faqItem } from "./faqItem";
import { guide } from "./guide";
import { homePage } from "./homePage";
import { aboutPage } from "./aboutPage";
import { brandingPage } from "./brandingPage";

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  localeString,
  localeText,
  localeBlocks,
  bilingualSlug,
  imageWithAlt,
  seo,
  // documents
  settings,
  page,
  author,
  category,
  testimonial,
  brandingOption,
  pricingTier,
  concept,
  caseStudy,
  post,
  faqItem,
  guide,
  homePage,
  aboutPage,
  brandingPage,
];
