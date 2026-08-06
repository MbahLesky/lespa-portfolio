import { Heading } from "@/components/shared/Heading";
import { Text } from "@/components/shared/Text";
import type { Decision } from "@/content/case-studies";

/**
 * Chose → Rejected → Why, as expandable rows.
 *
 * Built on native <details>, so it is keyboard operable, findable by in-page
 * search, and fully readable with JavaScript disabled — none of which a custom
 * disclosure would give for free.
 */
export function KeyDecisions({ decisions }: { decisions: Decision[] }) {
  return (
    <div className="flex flex-col gap-2">
      {decisions.map((decision) => (
        <details key={decision.chose} className="decision">
          <summary className="decision-summary">
            <span className="flex flex-col gap-1">
              <Text size="caption" muted as="span" className="uppercase">
                Chose
              </Text>
              <Text as="span">{decision.chose}</Text>
            </span>
            <span className="decision-marker" aria-hidden="true" />
          </summary>

          <div className="decision-body flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Text size="caption" muted as="span" className="uppercase">
                Rejected
              </Text>
              <Text as="span" muted>
                {decision.rejected}
              </Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="caption" muted as="span" className="uppercase">
                Why
              </Text>
              <Text as="span" muted>
                {decision.why}
              </Text>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

export function KeyDecisionsBlock({ decisions }: { decisions: Decision[] }) {
  return (
    <section className="flex flex-col gap-6" aria-labelledby="decisions-heading">
      <Heading as="h2" size="h3" id="decisions-heading">
        Key decisions
      </Heading>
      <KeyDecisions decisions={decisions} />
    </section>
  );
}
