import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Minimal, dependency-free renderer for Sanity Portable Text.
 * Handles blocks (paragraphs + h2/h3/h4), marks (strong/em/underline/link),
 * simple lists, and a small set of custom block objects (image with caption,
 * callout, CTA). Swap for `@portabletext/react` if/when richer rendering is
 * needed.
 */

type Span = {
  _key?: string;
  _type: "span";
  text: string;
  marks?: string[];
};

type MarkDef = {
  _key: string;
  _type: string;
  href?: string;
};

export type Block = {
  _key?: string;
  _type: "block";
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  listItem?: "bullet" | "number";
  level?: number;
  children?: Span[];
  markDefs?: MarkDef[];
};

/** A locale-narrowed string coming from a localeString/localeText field. */
type LocaleField = string | Record<string, string> | undefined;

type ImageBlock = {
  _key?: string;
  _type: "imageWithAlt";
  asset?: { url?: string };
  url?: string;
  alt?: LocaleField;
  caption?: LocaleField;
};

type CalloutBlock = {
  _key?: string;
  _type: "callout";
  tone?: "info" | "accent" | "highlight";
  title?: LocaleField;
  text?: LocaleField;
};

type CtaBlock = {
  _key?: string;
  _type: "ctaBlock";
  heading?: LocaleField;
  text?: LocaleField;
  label?: LocaleField;
  href?: string;
};

export type PortableBlock = Block | ImageBlock | CalloutBlock | CtaBlock;

type Locale = "nl" | "en";

type Props = {
  value: PortableBlock[] | undefined | null;
  /** Active locale, used to resolve any bilingual fields on custom blocks. */
  locale?: Locale;
  className?: string;
};

/** Resolve a localeString/localeText value, which may already be narrowed to a string. */
function localeValue(field: LocaleField, locale: Locale): string | undefined {
  if (field == null) return undefined;
  if (typeof field === "string") return field;
  return field[locale] ?? field.nl ?? field.en;
}

function renderSpan(span: Span, markDefs: MarkDef[] = [], keyPrefix: string): ReactNode {
  let node: ReactNode = span.text;
  const marks = span.marks ?? [];
  for (const mark of marks) {
    if (mark === "strong") node = <strong key={`${keyPrefix}-s`}>{node}</strong>;
    else if (mark === "em") node = <em key={`${keyPrefix}-e`}>{node}</em>;
    else if (mark === "underline") node = <u key={`${keyPrefix}-u`}>{node}</u>;
    else if (mark === "code") node = <code key={`${keyPrefix}-c`}>{node}</code>;
    else {
      const def = markDefs.find((m) => m._key === mark);
      if (def?._type === "link" && def.href) {
        node = (
          <a
            key={`${keyPrefix}-l`}
            href={def.href}
            rel="noopener"
            className="text-copper hover:underline"
            target={def.href.startsWith("http") ? "_blank" : undefined}
          >
            {node}
          </a>
        );
      }
    }
  }
  return node;
}

function groupLists(
  blocks: Block[],
): (Block | { _type: "list"; level: number; kind: "bullet" | "number"; items: Block[] })[] {
  const out: (
    | Block
    | { _type: "list"; level: number; kind: "bullet" | "number"; items: Block[] }
  )[] = [];
  let buffer: Block[] = [];
  let currentKind: "bullet" | "number" | null = null;
  const flush = () => {
    if (buffer.length > 0 && currentKind) {
      out.push({ _type: "list", kind: currentKind, level: buffer[0].level ?? 1, items: buffer });
    }
    buffer = [];
    currentKind = null;
  };
  for (const block of blocks) {
    if (block.listItem === "bullet" || block.listItem === "number") {
      if (currentKind !== block.listItem) flush();
      currentKind = block.listItem;
      buffer.push(block);
    } else {
      flush();
      out.push(block);
    }
  }
  flush();
  return out;
}

function renderTextBlock(block: Block, key: string): ReactNode {
  const children = (block.children ?? []).map((span, k) =>
    renderSpan(span, block.markDefs, `${key}-${k}`),
  );
  switch (block.style) {
    case "h1":
      return (
        <h1
          key={key}
          className="font-display text-pine mt-12 mb-6 leading-[1.1]"
          style={{ fontSize: "var(--text-display)" }}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          key={key}
          className="font-display text-pine mt-10 mb-5 leading-[1.15]"
          style={{ fontSize: "var(--text-h2)" }}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={key}
          className="font-display text-pine mt-8 mb-4 leading-[1.25]"
          style={{ fontSize: "var(--text-h3)" }}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4
          key={key}
          className="font-display text-pine mt-6 mb-3 leading-[1.3]"
          style={{ fontSize: "var(--text-h4)" }}
        >
          {children}
        </h4>
      );
    case "blockquote":
      return (
        <blockquote
          key={key}
          className="border-copper text-forest my-6 border-l-4 pl-5 text-[20px] leading-[1.45] italic"
        >
          {children}
        </blockquote>
      );
    default:
      return (
        <p key={key} className="text-forest mb-5 text-[18px] leading-[1.55]">
          {children}
        </p>
      );
  }
}

const CALLOUT_TONES: Record<
  NonNullable<CalloutBlock["tone"]>,
  { container: string; title: string; text: string }
> = {
  info: { container: "bg-pine/8 border-pine", title: "text-pine", text: "text-forest" },
  accent: { container: "bg-copper/10 border-copper", title: "text-copper", text: "text-forest" },
  highlight: { container: "bg-amber/15 border-amber", title: "text-mocha", text: "text-forest" },
};

function renderImage(block: ImageBlock, key: string, locale: Locale): ReactNode {
  const url = block.asset?.url ?? block.url;
  if (!url) return null;
  const alt = localeValue(block.alt, locale) ?? "";
  const caption = localeValue(block.caption, locale);
  return (
    <figure key={key} className="my-8">
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[20px]">
        <Image
          src={url}
          alt={alt}
          fill
          sizes="(min-width: 820px) 820px, 100vw"
          className="object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="text-forest/60 mt-3 text-[14px] leading-[20px] italic">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function renderCallout(block: CalloutBlock, key: string, locale: Locale): ReactNode {
  const text = localeValue(block.text, locale);
  if (!text) return null;
  const title = localeValue(block.title, locale);
  const tone = CALLOUT_TONES[block.tone ?? "info"];
  return (
    <div key={key} className={`my-8 rounded-[20px] border-l-4 px-6 py-5 ${tone.container}`}>
      {title ? (
        <p className={`font-display mb-1 text-[18px] leading-[1.3] ${tone.title}`}>{title}</p>
      ) : null}
      <p className={`text-[17px] leading-[1.5] ${tone.text}`}>{text}</p>
    </div>
  );
}

function renderCta(block: CtaBlock, key: string, locale: Locale): ReactNode {
  const heading = localeValue(block.heading, locale);
  const label = localeValue(block.label, locale);
  const href = block.href;
  if (!heading || !label || !href) return null;
  const text = localeValue(block.text, locale);
  const isExternal = href.startsWith("http");
  const buttonClass =
    "bg-amber text-ink mt-5 inline-flex w-fit items-center rounded-full px-6 py-3 text-[16px] font-medium hover:opacity-90";

  return (
    <div key={key} className="bg-pine my-10 flex flex-col rounded-[20px] px-6 py-8 sm:px-8">
      <p className="font-display text-cream text-[24px] leading-[1.2]">{heading}</p>
      {text ? <p className="text-cream/80 mt-2 text-[17px] leading-[1.5]">{text}</p> : null}
      {isExternal ? (
        <a href={href} rel="noopener" target="_blank" className={buttonClass}>
          {label}
        </a>
      ) : (
        <Link href={`/${locale}${href}`} className={buttonClass}>
          {label}
        </Link>
      )}
    </div>
  );
}

export function PortableText({ value, locale = "nl", className }: Props) {
  if (!value || value.length === 0) return null;

  // Group consecutive list items only among standard text blocks; custom
  // blocks (images, callouts, CTAs) pass through inline at their position.
  const sequence: (
    | PortableBlock
    | { _type: "list"; level: number; kind: "bullet" | "number"; items: Block[] }
  )[] = [];
  let textRun: Block[] = [];
  const flushTextRun = () => {
    if (textRun.length > 0) {
      sequence.push(...groupLists(textRun));
      textRun = [];
    }
  };
  for (const node of value) {
    if (node._type === "block") {
      textRun.push(node);
    } else {
      flushTextRun();
      sequence.push(node);
    }
  }
  flushTextRun();

  return (
    <div className={`max-w-prose ${className ?? ""}`}>
      {sequence.map((item, i) => {
        if (item._type === "list") {
          const Tag = item.kind === "bullet" ? "ul" : "ol";
          return (
            <Tag
              key={`list-${i}`}
              className={`mb-6 pl-6 ${item.kind === "bullet" ? "list-disc" : "list-decimal"}`}
            >
              {item.items.map((block, j) => (
                <li key={block._key ?? j} className="mb-2">
                  {(block.children ?? []).map((span, k) =>
                    renderSpan(span, block.markDefs, `${i}-${j}-${k}`),
                  )}
                </li>
              ))}
            </Tag>
          );
        }
        const key = item._key ?? `b-${i}`;
        switch (item._type) {
          case "block":
            return renderTextBlock(item, key);
          case "imageWithAlt":
            return renderImage(item, key, locale);
          case "callout":
            return renderCallout(item, key, locale);
          case "ctaBlock":
            return renderCta(item, key, locale);
          default:
            return null;
        }
      })}
    </div>
  );
}
