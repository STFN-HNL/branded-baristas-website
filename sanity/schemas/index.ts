import type { SchemaTypeDefinition } from "sanity";
import { localeString } from "./objects/localeString";
import { seo } from "./objects/seo";
import { settings } from "./settings";
import { page } from "./page";

export const schemaTypes: SchemaTypeDefinition[] = [localeString, seo, settings, page];
