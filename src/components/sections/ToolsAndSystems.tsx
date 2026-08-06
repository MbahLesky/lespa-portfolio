import { Heading } from "@/components/shared/Heading";
import { RichText } from "@/components/shared/RichText";
import { Section } from "@/components/sections/Section";
import { SectionLabel, Text } from "@/components/shared/Text";
import { Tag } from "@/components/shared/Tag";
import { TokenDisplay } from "@/components/sections/TokenDisplay";
import { tools } from "@/content/copy";

/**
 * Two halves: the stack on the left, the design system rendered live on the
 * right. Showing the real tokens proves the "systems, not one-offs" claim
 * instead of asserting it.
 */
export function ToolsAndSystems() {
  return (
    <Section
      variant="raised"
      spacing="standard"
      id="tools"
      data-tint="raised"
      aria-labelledby="tools-heading"
    >
      <SectionLabel>{tools.label}</SectionLabel>

      <div className="mt-8 grid gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          {tools.stack.map((group) => (
            <div key={group.group} className="flex flex-col gap-4">
              <Text size="caption" muted className="uppercase">
                {group.group}
              </Text>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <Heading as="h2" size="h3" id="tools-heading">
            {tools.systemHeading}
          </Heading>
          <Text muted>
            <RichText highlight={["design tokens"]}>{tools.systemBody}</RichText>
          </Text>
        </div>
      </div>

      <div className="mt-16">
        <TokenDisplay />
      </div>
    </Section>
  );
}
