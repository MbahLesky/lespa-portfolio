/**
 * Marks a few phrases inside a paragraph so they take the inline hover
 * treatment — the standout-words rule in the structure doc.
 *
 * Selective by construction: the phrases are named per string in the content
 * file, so nothing gets emphasised by accident and headings never do. Anything
 * not listed renders as ordinary text.
 *
 * The marked runs are still plain text to a screen reader; the effect is a
 * hover affordance for the eye, not information.
 */
export function Emphasis({ text, phrases = [], className }) {
  if (!phrases.length) return <span className={className}>{text}</span>;

  // One pass, splitting on whichever phrase appears next, so overlapping or
  // repeated phrases cannot double-wrap the same characters.
  const parts = [];
  let rest = text;
  let key = 0;

  while (rest.length) {
    const next = phrases
      .map((phrase) => ({ phrase, at: rest.indexOf(phrase) }))
      .filter((hit) => hit.at !== -1)
      .sort((a, b) => a.at - b.at)[0];

    if (!next) {
      parts.push(rest);
      break;
    }

    if (next.at > 0) parts.push(rest.slice(0, next.at));
    parts.push(
      <span key={key++} className="emphasis">
        {next.phrase}
      </span>,
    );
    rest = rest.slice(next.at + next.phrase.length);
  }

  return <span className={className}>{parts}</span>;
}
