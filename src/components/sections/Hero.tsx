import { Button } from "@/components/shared/Button";
import { Heading } from "@/components/shared/Heading";
import { MediaFallback, ProjectImage } from "@/components/shared/ProjectImage";
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
  /** Last in, so the copy is readable before the eye is pulled right. */
  media: "620ms",
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
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="hero-block relative lg:col-span-8">
          {/* The brand's vertical green rule, drawn down the left of the block. */}
          <span
            className="hero-rule enter-rule bg-gradient-brand-lift"
            style={step(STEP.rule)}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8">
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
                  {/* The intro flies a stand-in onto this exact box, so it is
                      revealed by the handover rather than by its own entrance. */}
                  <span data-intro-target="title" style={step(STEP.lineOne)}>
                    {hero.headlineLead}
                  </span>
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

        {/* Reserved at its final size, so dropping the real file in cannot
            shift the page. Renders a labelled frame until then rather than a
            broken image. */}
        <div className="enter lg:col-span-4" style={step(STEP.media)}>
          <div className="hero-media elevated relative w-full overflow-hidden rounded-md">
            {hero.image.src ? (
              <ProjectImage
                src={hero.image.src}
                alt={hero.image.alt}
                name={hero.image.label}
                sizes="(min-width: 1024px) 32vw, 100vw"
                priority
              />
            ) : (
              <MediaFallback
                name={`${hero.image.label} — ${hero.image.ratio}`}
              />
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
