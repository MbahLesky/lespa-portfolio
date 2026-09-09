"use client";

import { useState } from "react";

import { Emphasis } from "@/components/phase1/Emphasis";
import { Reveal } from "@/components/phase1/Reveal";
import { process } from "@/content/phase1";

/**
 * Five steps: the list on one side, the hovered step's detail on the other,
 * with an image beside the text.
 *
 * The detail pane is a single region that swaps content rather than five panes
 * toggling visibility, so there is one thing to read and it is announced as one
 * thing. It rests on the first step instead of empty — a pane that is blank
 * until you hover reads as broken on a touch screen, where hover never happens.
 *
 * Selection follows hover, focus and tap alike, for the same reason as the
 * tracks above.
 */
export function Process() {
  const [active, setActive] = useState(0);
  const step = process.steps[active];

  return (
    <section
      id="process"
      className="section-pad has-pattern"
      aria-labelledby="process-heading"
    >
      <Reveal className="mx-auto w-full max-w-6xl px-6">
        <h2 id="process-heading" className="section-heading">
          Process
        </h2>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          <ol className="process-list">
            {process.steps.map((item, index) => (
              <li key={item.label}>
                <button
                  type="button"
                  className="process-step"
                  data-active={index === active}
                  aria-current={index === active ? "true" : undefined}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                >
                  <span className="process-index">{`0${index + 1}`}</span>
                  <span className="process-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="process-detail" aria-live="polite">
            <div className="process-figure">
              {step.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={step.image} alt="" className="h-full w-full object-cover" />
              ) : (
                // TODO: asset needed — one of the five process hover-reveal
                // images, assets doc §5. Named rather than blank so the slot
                // says what belongs in it.
                <span className="process-figure-empty">
                  {`Image — ${step.label}`}
                </span>
              )}
            </div>
            <p className="process-body">
              <Emphasis text={step.body} phrases={step.emphasis} />
            </p>
          </div>
        </div>

        <p className="process-closing">
          <Emphasis text={process.closing} phrases={process.closingEmphasis} />
        </p>
      </Reveal>
    </section>
  );
}
