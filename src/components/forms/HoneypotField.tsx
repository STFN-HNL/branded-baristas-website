import { HONEYPOT_FIELD } from "@/lib/leadGuard";

/**
 * Off-screen spam trap. Positioned out of view rather than `display: none`
 * (which many bots skip), hidden from assistive tech and the tab order, and
 * named so browser autofill never recognises it.
 */
export function HoneypotField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden"
    >
      <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}
