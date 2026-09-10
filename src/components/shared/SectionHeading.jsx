import { Reveal } from "@/components/shared/Reveal";

/**
 * A section's eyebrow label and heading.
 *
 * The label is the section name; the heading is whatever that section leads
 * with. Headings never get the standout-word hover treatment — that is for
 * inline body copy only (structure doc, MOTION SPEC).
 */
export function SectionHeading({ label, heading, className = "" }) {
  return (
    <Reveal className={`flex flex-col gap-4 ${className}`}>
      <p className="text-caption uppercase tracking-eyebrow text-accent">{label}</p>
      {heading ? (
        <h2 className="max-w-reading text-h2-m text-content md:text-h2">{heading}</h2>
      ) : null}
    </Reveal>
  );
}
