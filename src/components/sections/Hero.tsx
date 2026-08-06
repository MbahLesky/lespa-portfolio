import { Button } from "@/components/shared/Button";
import { Heading } from "@/components/shared/Heading";
import { Text } from "@/components/shared/Text";
import { RoleSwap } from "@/components/sections/RoleSwap";
import { Section } from "@/components/sections/Section";
import { hero } from "@/content/copy";

export function Hero() {
  return (
    <Section
      variant="brand"
      pattern
      spacing="major"
      className="below-nav"
      aria-labelledby="hero-heading"
    >
      <div className="flex max-w-content flex-col gap-8">
        <Text size="sm" className="text-content-secondary">
          {hero.kicker}
        </Text>

        <Heading as="h1" id="hero-heading">
          {/* One clean sentence for assistive technology, in place of the
              two-state headline underneath it. */}
          <span className="sr-only">{hero.screenReaderLine}</span>
          <span aria-hidden="true">
            {hero.headlineLead}
            <br />
            <RoleSwap />
          </span>
        </Heading>

        <Text size="lg" className="max-w-reading text-content-secondary">
          {hero.subtext}
        </Text>

        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" href={hero.primaryCta.href}>
            {hero.primaryCta.label}
          </Button>
          <Button variant="secondary" href={hero.secondaryCta.href}>
            {hero.secondaryCta.label}
          </Button>
        </div>

        <Text size="sm" className="text-content-secondary">
          {hero.trust}
        </Text>
      </div>
    </Section>
  );
}
