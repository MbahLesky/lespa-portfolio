import { EmphasizedText } from "@/components/shared/EmphasizedText";
import { PatternBackdrop } from "@/components/shared/PatternBackdrop";
import { Reveal } from "@/components/shared/Reveal";
import { intro } from "@/content/copy";

/**
 * Intro — the "design and code are one job" position, in three sentences.
 *
 * Blended background: the abstract pattern over the dark gradient. No card, no
 * border, no shadow (structure doc, BACKGROUND IMAGERY RULE).
 */
export function Intro() {
  return (
    <section id="intro" className="relative overflow-hidden py-24 md:py-30">
      <PatternBackdrop />

      <div className="relative mx-auto max-w-content px-6 md:px-8">
        <Reveal>
          <p className="max-w-reading text-balance text-h4-m text-content md:text-h4">
            <EmphasizedText text={intro.body} emphasis={intro.emphasis} />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
