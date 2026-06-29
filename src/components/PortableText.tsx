import type { ReactNode } from "react";

/**
 * Minimal, dependency-free renderer for Sanity Portable Text.
 * Handles blocks (paragraphs + h2/h3/h4), marks (strong/em/underline/link),
 * and simple lists. Good enough for marketing content; swap for
 * `@portabletext/react` if/when richer rendering is needed.
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

type Props = {
  value: Block[] | undefined | null;
  className?: string;
};

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

export function PortableText({ value, className }: Props) {
  if (!value || value.length === 0) return null;
  const grouped = groupLists(value.filter((b) => b?._type === "block"));

  return (
    <div className={`max-w-prose ${className ?? ""}`}>
      {grouped.map((item, i) => {
        if ("kind" in item) {
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
        const block = item;
        const key = block._key ?? `b-${i}`;
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
      })}
    </div>
  );
}
