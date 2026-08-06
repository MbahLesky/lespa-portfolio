import { Highlight } from "@/components/shared/Highlight";

/** The spec's cap: beyond three it reads as a highlighter, not emphasis. */
const MAX_HIGHLIGHTS = 3;

interface RichTextProps {
  children: string;
  /**
   * Phrases to emphasise, matched verbatim inside the copy. Only positioning
   * phrases belong here — never a link, which has to stay visually distinct.
   */
  highlight?: readonly string[];
}

/**
 * Renders copy with selected phrases wrapped in a Highlight.
 *
 * Keeping the copy a single unmodified string means the source still reads as
 * the sentence in the copy deck, rather than being pre-split into fragments
 * that are easy to typo when the wording changes.
 */
export function RichText({ children, highlight = [] }: RichTextProps) {
  const phrases = highlight.slice(0, MAX_HIGHLIGHTS).filter(Boolean);
  if (!phrases.length) return <>{children}</>;

  // Split on all phrases at once so matches cannot overlap or double-wrap.
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = children.split(new RegExp(`(${escaped.join("|")})`, "g"));

  return (
    <>
      {parts.map((part, index) =>
        phrases.includes(part) ? (
          <Highlight key={`${part}-${index}`}>{part}</Highlight>
        ) : (
          part
        ),
      )}
    </>
  );
}
