type Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
};

/**
 * Server component that renders structured data as a single JSON-LD script tag.
 * Pass a single schema object or an array of schemas.
 */
export function JsonLd({ data, id }: Props) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
