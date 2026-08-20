"use client";

export interface TypeSegment {
  text: string;
  /** Applied to this run of characters, typed or not. */
  className?: string;
}

interface TypewriterProps {
  /**
   * The line being typed, split into runs that carry their own styling — so the
   * accent on the role word is there as it is typed, not applied once it
   * finishes.
   */
  to: readonly TypeSegment[];
  /**
   * The line being typed *over*, when one claim is replacing another. Every
   * character past the cursor still comes from here, so the two lines are only
   * ever one string with the cursor as the seam — the line is never blank.
   */
  from?: readonly TypeSegment[];
  /** How many characters of `to` are in place. */
  count: number;
  /** Draw the blinking caret at the cursor. */
  caret?: boolean;
  className?: string;
}

/** Total characters across every segment. */
export const segmentsLength = (segments: readonly TypeSegment[]) =>
  segments.reduce((total, segment) => total + segment.text.length, 0);

/**
 * The run between two character offsets, with each segment's styling kept.
 * Used to take the head of one line and the tail of another and render them as
 * a single sentence.
 */
export const sliceSegments = (
  segments: readonly TypeSegment[],
  start: number,
  end: number,
): TypeSegment[] => {
  const out: TypeSegment[] = [];
  let offset = 0;
  for (const segment of segments) {
    const segmentStart = offset;
    const segmentEnd = offset + segment.text.length;
    offset = segmentEnd;

    const from = Math.max(start, segmentStart);
    const to = Math.min(end, segmentEnd);
    if (to <= from) continue;

    out.push({
      text: segment.text.slice(from - segmentStart, to - segmentStart),
      className: segment.className,
    });
  }
  return out;
};

/** How many leading characters two lines already share. */
export const sharedPrefix = (
  a: readonly TypeSegment[],
  b: readonly TypeSegment[],
) => {
  const textA = a.map((s) => s.text).join("");
  const textB = b.map((s) => s.text).join("");
  const limit = Math.min(textA.length, textB.length);
  let i = 0;
  while (i < limit && textA[i] === textB[i]) i++;
  return i;
};

function Run({ segments }: { segments: TypeSegment[] }) {
  return (
    <>
      {segments.map((segment, index) => (
        <span key={index} className={segment.className}>
          {segment.text}
        </span>
      ))}
    </>
  );
}

/**
 * A line being typed, or being typed over.
 *
 * Typing in: the untyped remainder is rendered with visibility:hidden rather
 * than removed, so it still takes up its space — the line wraps exactly as it
 * will when finished, and nothing below it moves while the text grows.
 * Appending character by character instead would reflow the hero on every
 * keystroke.
 *
 * Replacing: with `from` set, everything past the cursor is still the previous
 * line. One left-to-right pass turns one sentence into the other without ever
 * clearing it, so there is no blank gap in the middle of the swap and the
 * caret never jumps back to the start.
 *
 * Purely visual — this is always paired with a plain, readable copy of the same
 * sentence for assistive technology, and is never the only place the words
 * exist.
 */
export function Typewriter({
  to,
  from,
  count,
  caret = false,
  className,
}: TypewriterProps) {
  const toLength = segmentsLength(to);
  const head = sliceSegments(to, 0, Math.min(count, toLength));

  // Past the cursor: the line being replaced, or the not-yet-typed remainder
  // of this one, held in place so the box never changes size.
  const tail = from
    ? sliceSegments(from, count, segmentsLength(from))
    : sliceSegments(to, count, toLength);

  return (
    <span className={className} aria-hidden="true">
      <Run segments={head} />
      {caret && <span className="caret" />}
      {from ? (
        <>
          {/* The seam fuses the head of one word to the tail of another —
              "Mobesigner" — and a token that long can push the line onto an
              extra row that neither finished sentence needs. A break
              opportunity here can only ever shorten a line, never lengthen
              one, so the half-written line wraps no worse than the whole. */}
          <wbr />
          <Run segments={tail} />
        </>
      ) : (
        tail.length > 0 && (
          <span className="type-rest">
            <Run segments={tail} />
          </span>
        )
      )}
    </span>
  );
}
