import type { SchemaTypeDefinition } from "sanity";
import { localeString } from "./objects/localeString";
import { localeText } from "./objects/localeText";
import { localeBlocks } from "./objects/localeBlocks";
import { bilingualSlug } from "./objects/bilingualSlug";
import { imageWithAlt } from "./objects/imageWithAlt";
import { seo } from "./objects/seo";
import { settings } from "./settings";
import { page } from "./page";

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
];
