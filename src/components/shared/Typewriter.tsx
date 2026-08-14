"use client";

export interface TypeSegment {
  text: string;
  /** Applied to this run of characters, typed or not. */
  className?: string;
}

interface TypewriterProps {
  /**
   * The line, split into runs that carry their own styling — so the accent on
   * the role word is there as it is typed, not applied once it finishes.
   */
  segments: readonly TypeSegment[];
  /** How many characters of the whole line are currently shown. */
  count: number;
  /** Draw the blinking caret after the last typed character. */
  caret?: boolean;
  className?: string;
}

/** Total characters across every segment. */
export const segmentsLength = (segments: readonly TypeSegment[]) =>
  segments.reduce((total, segment) => total + segment.text.length, 0);

/**
 * A line being typed.
 *
 * The untyped remainder is rendered with visibility:hidden rather than removed,
 * so it still takes up its space: the line wraps exactly as it will when
 * finished, and nothing below it moves while the text grows. Appending
 * character by character instead would reflow the hero on every keystroke.
 *
 * Purely visual — this is always paired with a plain, readable copy of the same
 * sentence for assistive technology, and is never the only place the words
 * exist.
 */
export function Typewriter({
  segments,
  count,
  caret = false,
  className,
}: TypewriterProps) {
  // Where each segment begins in the line as a whole. Derived up front rather
  // than accumulated while rendering, so nothing is mutated mid-render.
  const starts: number[] = [];
  segments.reduce((offset, segment) => {
    starts.push(offset);
    return offset + segment.text.length;
  }, 0);

  // The caret belongs after the last typed character — that is, in the first
  // segment that is not yet complete.
  const caretIn = segments.findIndex(
    (segment, index) => count < starts[index] + segment.text.length,
  );

  return (
    <span className={className} aria-hidden="true">
      {segments.map((segment, index) => {
        const shown = Math.min(
          Math.max(count - starts[index], 0),
          segment.text.length,
        );
        const typed = segment.text.slice(0, shown);
        const rest = segment.text.slice(shown);

        return (
          <span key={index} className={segment.className}>
            {typed}
            {caret && caretIn === index && <span className="caret" />}
            {rest && <span className="type-rest">{rest}</span>}
          </span>
        );
      })}
      {/* Line finished: the caret sits at the very end. */}
      {caret && caretIn === -1 && <span className="caret" />}
    </span>
  );
}
