import { Heading } from "@/components/shared/Heading";
import { Section } from "@/components/sections/Section";
import { SectionLabel, Text } from "@/components/shared/Text";
import { methodology } from "@/content/copy";

/**
 * Vertical timeline with a rail down the left. The `Output:` line on each phase
 * is the important part — it turns process theatre into deliverables.
 *
 * Stacks on mobile with no horizontal scroll.
 */
export function Methodology() {
  return (
    <Section
      variant="gradient"
      pattern
      spacing="standard"
      aria-labelledby="methodology-heading"
    >
      <div className="flex flex-col gap-4">
        <SectionLabel>{methodology.label}</SectionLabel>
        <Heading as="h2" id="methodology-heading">
          {methodology.heading}
        </Heading>
        <Text muted className="max-w-reading">
          {methodology.subline}
        </Text>
      </div>

      <ol className="mt-12 flex flex-col">
        {methodology.phases.map((phase, index) => (
          <li
            key={phase.number}
            className={
              // The rail is a left border on every item but the last, so the
              // line stops at the final phase instead of running past it.
              index < methodology.phases.length - 1
                ? "methodology-phase border-l border-border"
                : "methodology-phase"
            }
          >
            <span className="methodology-number font-heading text-h5 text-accent-fg">
              {phase.number}
            </span>
            <div className="flex flex-col gap-2 pb-12 pl-8">
              <Heading as="h3" size="h4">
                {phase.title}
              </Heading>
              <Text muted>{phase.body}</Text>
              <Text size="sm" className="text-accent-fg">
                Output: {phase.output}
              </Text>
            </div>
          </li>
        ))}
      </ol>

      <Text muted className="mt-4">
        {methodology.footerLine}
      </Text>
    </Section>
  );
}
