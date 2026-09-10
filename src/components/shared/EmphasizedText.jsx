/**
 * Body copy with selected standout phrases made hoverable.
 *
 * Structure doc, MOTION SPEC: "select standout words/phrases within body copy
 * get a hover effect … Applied selectively, not to every word". Headings are
 * deliberately excluded — this is for inline body text only.
 *
 * The copy is always rendered from `text`, so the locked wording cannot drift:
 * phrases are matched as exact substrings and wrapped in place. A phrase that
 * does not appear is skipped rather than inserted.
 */
export function EmphasizedText({ text, emphasis = [], className = "" }) {
  return <span className={className}>{splitOnPhrases(text, emphasis)}</span>;
}

function splitOnPhrases(text, phrases) {
  // Longest first, so a phrase contained inside another still matches the
  // broader one rather than splitting it in half.
  const ordered = [...phrases]
    .filter((phrase) => phrase && text.includes(phrase))
    .sort((a, b) => b.length - a.length);

  let segments = [text];

  for (const phrase of ordered) {
    segments = segments.flatMap((segment) => {
      if (typeof segment !== "string" || !segment.includes(phrase)) return [segment];

      const parts = segment.split(phrase);
      return parts.flatMap((part, index) =>
        index === 0 ? [part] : [{ emphasis: phrase }, part],
      );
    });
  }

  return segments.map((segment, index) =>
    typeof segment === "string" ? (
      segment
    ) : (
      <em key={`${segment.emphasis}-${index}`} className="emphasis not-italic">
        {segment.emphasis}
      </em>
    ),
  );
}
