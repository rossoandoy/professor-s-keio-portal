import { Fragment } from "react";

const OKUBO_RE = /(Okubo)/gi;

/**
 * Highlight "Okubo" (case-insensitive) in an author string by wrapping it in <strong>.
 */
export function boldOkubo(authors: string): React.ReactNode {
  const parts = authors.split(OKUBO_RE);
  if (parts.length === 1) return authors;

  return parts.map((part, index) =>
    /^okubo$/i.test(part) ? (
      <strong key={`${part}-${index}`} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      <Fragment key={`${part}-${index}`}>{part}</Fragment>
    )
  );
}
