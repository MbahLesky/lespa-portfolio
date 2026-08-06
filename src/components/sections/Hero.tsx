import { Button } from "@/components/shared/Button";
import { Heading } from "@/components/shared/Heading";
import { Text } from "@/components/shared/Text";
import { RoleSwap } from "@/components/sections/RoleSwap";
import { Section } from "@/components/sections/Section";
import { hero } from "@/content/copy";

/**
 * Entrance choreography. Each element carries its own step off a shared delay,
 * so the sequence holds its order whether or not the loading screen ran.
 *
 * The headline lines rise out from behind their own edge rather than fading —
 * a clip reveal reads as typeset, where a fade reads as a slideshow.
 */
const STEP = {
  rule: "240ms",
  kicker: "0ms",
  lineOne: "90ms",
  lineTwo: "200ms",
  subtext: "380ms",
  actions: "470ms",
  trust: "560ms",
} as const;

function step(value: string) {
  return { "--enter-step": value } as React.CSSProperties;
}

export function Hero() {
  return (
    <Section
      variant="gradient"
      pattern
      spacing="major"
      reveal={false}
      id="hero"
      data-tint="flat"
      className="below-nav"
      aria-labelledby="hero-heading"
    >
      <div className="hero-block relative">
        {/* The brand's vertical green rule, drawn down the left of the block. */}
        <span
          className="hero-rule enter-rule bg-gradient-brand-lift"
          style={step(STEP.rule)}
          aria-hidden="true"
        />

        <div className="flex max-w-content flex-col gap-8">
          <Text
            size="sm"
            className="enter text-content-secondary"
            style={step(STEP.kicker)}
          >
            {hero.kicker}
          </Text>

          <Heading as="h1" id="hero-heading">
            {/* One clean sentence for assistive technology, in place of the
                two-state headline underneath it. */}
            <span className="sr-only">{hero.screenReaderLine}</span>
            <span aria-hidden="true">
              <span className="enter-line">
                <span style={step(STEP.lineOne)}>{hero.headlineLead}</span>
              </span>
              <span className="enter-line">
                <span style={step(STEP.lineTwo)}>
                  <RoleSwap />
                </span>
              </span>
            </span>
          </Heading>

          <Text
            size="lg"
            className="enter max-w-reading text-content-secondary"
            style={step(STEP.subtext)}
          >
            {hero.subtext}
          </Text>

          <div
            className="enter flex flex-wrap items-center gap-4"
            style={step(STEP.actions)}
          >
            <Button variant="primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Button>
            <Button variant="secondary" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </Button>
          </div>

          <Text
            size="sm"
            className="enter text-content-secondary"
            style={step(STEP.trust)}
          >
            {hero.trust}
          </Text>
        </div>
      </div>
    </Section>
  );
}
