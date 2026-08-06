import { Button } from "@/components/shared/Button";
import { Heading } from "@/components/shared/Heading";
import { Section } from "@/components/sections/Section";
import { Text } from "@/components/shared/Text";
import { finalCta } from "@/content/copy";

/**
 * Closes on the same treatment the hero opened with, so the page bookends
 * itself. One of the few approved centred layouts.
 */
export function FinalCta() {
  return (
    <Section
      variant="gradient"
      pattern
      spacing="major"
      id="contact-cta"
      data-tint="flat"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto flex max-w-reading flex-col items-center gap-6 text-center">
        <Heading as="h2" id="cta-heading">
          {finalCta.heading}
        </Heading>
        <Text size="lg" className="text-content-secondary">
          {finalCta.body}
        </Text>
        <Button variant="primary" href={finalCta.cta.href} className="mt-2">
          {finalCta.cta.label}
        </Button>
      </div>
    </Section>
  );
}
