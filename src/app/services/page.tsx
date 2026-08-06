import type { Metadata } from "next";

import { Section } from "@/components/sections/Section";
import { Button } from "@/components/shared/Button";
import { Heading } from "@/components/shared/Heading";
import { SectionLabel, Text } from "@/components/shared/Text";
import { Tag } from "@/components/shared/Tag";
import { methodology, servicesPage, services } from "@/content/copy";

export const metadata: Metadata = {
  title: "Services — Brand, Web, Mobile, Mentorship",
  description:
    "Brand systems, custom-coded websites and mobile apps, and design mentorship. What each includes, how long it takes, and what it costs to start.",
  alternates: { canonical: "/services" },
};

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <Text size="caption" muted className="uppercase">
        {label}
      </Text>
      {children}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main id="main">
      <Section variant="gradient" spacing="major" className="below-nav">
        <div className="flex flex-col gap-4">
          <SectionLabel>{services.label}</SectionLabel>
          <Heading as="h1">{servicesPage.heading}</Heading>
          <Text size="lg" muted className="max-w-reading">
            {servicesPage.intro}
          </Text>
        </div>
      </Section>

      <Section variant="flat" spacing="major">
        <div className="flex flex-col gap-16">
          {servicesPage.offers.map((offer, index) => (
            <article
              key={offer.title}
              className="grid gap-8 border-t border-border pt-12 md:grid-cols-3"
            >
              <div className="flex flex-col gap-4">
                <Heading as="h2" size="h3">
                  {offer.title}
                </Heading>
                <Text muted>{offer.forWho}</Text>
                <div className="flex flex-wrap gap-2">
                  {services.cards[index]?.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 md:col-span-2">
                <Detail label="What it includes">
                  <ul className="flex flex-col gap-2">
                    {offer.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-accent-fg" aria-hidden="true">
                          ·
                        </span>
                        <Text as="span" muted>
                          {item}
                        </Text>
                      </li>
                    ))}
                  </ul>
                </Detail>

                <div className="grid gap-6 sm:grid-cols-3">
                  <Detail label="How long">
                    <Text>{offer.timeline}</Text>
                  </Detail>
                  <Detail label="To start, I need">
                    <Text>{offer.needed}</Text>
                  </Detail>
                  <Detail label="Starting from">
                    <Text>{offer.price}</Text>
                  </Detail>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section variant="raised" spacing="standard" aria-labelledby="process">
        <div className="flex flex-col gap-8">
          <Heading as="h2" size="h3" id="process">
            {methodology.heading}
          </Heading>
          <ol className="grid gap-8 md:grid-cols-4">
            {methodology.phases.map((phase) => (
              <li key={phase.number} className="flex flex-col gap-2">
                <Text size="sm" className="text-accent-fg">
                  {phase.number}
                </Text>
                <Heading as="h3" size="h5">
                  {phase.title}
                </Heading>
                <Text size="sm" muted>
                  {phase.body}
                </Text>
              </li>
            ))}
          </ol>
          <Text muted>{methodology.footerLine}</Text>
        </div>
      </Section>

      <Section variant="warm" spacing="standard" aria-labelledby="working">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Heading as="h2" size="h3" id="working">
              {servicesPage.workingTogether.heading}
            </Heading>
            {servicesPage.workingTogether.body.map((paragraph) => (
              <Text key={paragraph.slice(0, 24)} muted>
                {paragraph}
              </Text>
            ))}
          </div>

          {/* Saying who this isn't for publicly filters bad-fit enquiries
              before they cost anyone time. */}
          <div className="flex flex-col gap-4">
            <Heading as="h2" size="h5">
              {servicesPage.notFor.heading}
            </Heading>
            <ul className="flex flex-col gap-2">
              {servicesPage.notFor.items.map((item) => (
                <li key={item}>
                  <Text muted>{item}</Text>
                </li>
              ))}
            </ul>
            <Button variant="primary" href="/contact" className="mt-4 self-start">
              Start a project
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
