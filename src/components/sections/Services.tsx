import Link from "next/link";

import { Heading } from "@/components/shared/Heading";
import { Section } from "@/components/sections/Section";
import { SectionLabel, Text } from "@/components/shared/Text";
import { Tag } from "@/components/shared/Tag";
import { services } from "@/content/copy";

export function Services() {
  return (
    <Section
      variant="gradient"
      spacing="standard"
      id="services"
      data-tint="flat"
      aria-labelledby="services-heading"
    >
      <div className="flex flex-col gap-4">
        <SectionLabel>{services.label}</SectionLabel>
        <Heading as="h2" id="services-heading">
          {services.heading}
        </Heading>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {services.cards.map((card) => (
          <div
            key={card.title}
            className="surface-raised elevated flex flex-col gap-4 rounded-md p-8"
          >
            <Heading as="h3" size="h5">
              {card.title}
            </Heading>
            <Text muted>{card.body}</Text>
            {/* Tags signal competence without a paragraph explaining it. */}
            <div className="mt-2 flex flex-wrap gap-2">
              {card.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Link href={services.cta.href} className="link-underline text-body">
          {services.cta.label} →
        </Link>
      </div>
    </Section>
  );
}
