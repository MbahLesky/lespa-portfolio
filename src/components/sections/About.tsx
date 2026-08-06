import { Button } from "@/components/shared/Button";
import { Heading } from "@/components/shared/Heading";
import { RichText } from "@/components/shared/RichText";
import { Section } from "@/components/sections/Section";
import { SectionLabel, Text } from "@/components/shared/Text";
import { about } from "@/content/copy";

/**
 * The human section. Copy is verbatim from the About copy deck.
 *
 * The photo slot reserves its 4:5 box now so dropping the real portrait in
 * later cannot shift the page. Beliefs are a two-column text list with rules
 * above and below — deliberately not cards.
 */
export function About() {
  return (
    <Section
      variant="warm"
      spacing="major"
      id="about"
      data-tint="flat"
      aria-labelledby="about-heading"
    >
      <div className="grid gap-12 md:grid-cols-5 md:gap-16">
        {/* [MOCK] Portrait pending. Dimensions reserved at 4:5.
            self-start matters: a stretched grid item takes the row's height,
            and aspect-ratio would then derive its width from that — the box
            grew to 775px and pushed the text column out of the section. */}
        <div className="surface-raised elevated flex aspect-4-5 w-full items-center justify-center self-start rounded-md md:col-span-2">
          <Text size="sm" muted>
            Portrait — 4:5
          </Text>
        </div>

        <div className="flex flex-col gap-6 md:col-span-3">
          <SectionLabel>{about.label}</SectionLabel>
          <Heading as="h2" id="about-heading">
            {about.heading}
          </Heading>

          {about.opening.map((paragraph) => (
            <Text key={paragraph.slice(0, 24)} muted>
              {paragraph}
            </Text>
          ))}

          <Text muted>
            <RichText highlight={["the mark, the interface, and the code underneath"]}>
              {about.whyAllThree}
            </RichText>
          </Text>

          <div className="belief-list">
            <h3 className="sr-only">{about.beliefsLabel}</h3>
            <dl className="flex flex-col gap-4">
              {about.beliefs.map((belief) => (
                <div
                  key={belief.name}
                  className="belief-row grid gap-1 sm:gap-6"
                >
                  <dt className="font-body text-body-sm text-accent-fg">
                    {belief.name}
                  </dt>
                  <dd>
                    <Text muted as="span">
                      {belief.body}
                    </Text>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <Text muted>
            <RichText highlight={["build on WordPress"]}>{about.wontDo}</RichText>
          </Text>

          {about.beyondWork && <Text muted>{about.beyondWork}</Text>}

          <Text>{about.close}</Text>

          <div className="mt-2 flex flex-wrap items-center gap-4">
            <Button variant="primary" href={about.primaryCta.href}>
              {about.primaryCta.label}
            </Button>
            <Button variant="secondary" href={about.secondaryCta.href}>
              {about.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
