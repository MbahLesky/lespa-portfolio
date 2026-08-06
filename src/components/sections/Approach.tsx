import { Heading } from "@/components/shared/Heading";
import { RichText } from "@/components/shared/RichText";
import { Section } from "@/components/sections/Section";
import { SectionLabel, Text } from "@/components/shared/Text";
import { approach } from "@/content/copy";

export function Approach() {
  return (
    <Section
      variant="gradient"
      spacing="standard"
      id="approach"
      data-tint="flat"
      aria-labelledby="approach-heading"
    >
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col gap-6">
          <SectionLabel>{approach.label}</SectionLabel>
          <Heading as="h2" id="approach-heading">
            {approach.heading}
          </Heading>
          <Text muted className="max-w-reading">
            <RichText highlight={["I handle the whole chain"]}>
              {approach.body}
            </RichText>
          </Text>
        </div>

        <ul className="flex flex-col gap-8">
          {approach.points.map((point) => (
            <li key={point.heading} className="flex flex-col gap-2">
              <Heading as="h3" size="h5">
                {point.heading}
              </Heading>
              <Text muted>{point.body}</Text>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
