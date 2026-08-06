import { Heading } from "@/components/shared/Heading";
import { Section } from "@/components/sections/Section";
import { SectionLabel, Text } from "@/components/shared/Text";
import { proof } from "@/content/copy";

/**
 * No named testimonial exists yet, so this runs the "Currently" variant.
 * In-progress work reads as momentum; an unattributed quote reads as invented
 * and costs more than the space it fills.
 */
export function Proof() {
  return (
    <Section
      variant="warm"
      spacing="standard"
      id="proof"
      data-tint="flat"
      aria-labelledby="proof-heading"
    >
      <div className="flex max-w-reading flex-col gap-4">
        <SectionLabel>{proof.label}</SectionLabel>
        <Heading as="h2" id="proof-heading">
          {proof.heading}
        </Heading>
        <Text size="lg" muted>
          {proof.body}
        </Text>
      </div>
    </Section>
  );
}
