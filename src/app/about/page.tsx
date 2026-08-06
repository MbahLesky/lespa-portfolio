import type { Metadata } from "next";

import { About } from "@/components/sections/About";
import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/shared/Heading";
import { SectionLabel, Text } from "@/components/shared/Text";
import { site } from "@/content/copy";

export const metadata: Metadata = {
  title: "About Lesky — Designer & Developer",
  description:
    "Software engineer and designer in Bamenda, Cameroon. I build brands, websites, and mobile apps — and teach people to run them.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main">
      <Section variant="gradient" spacing="major" className="below-nav">
        <div className="flex flex-col gap-4">
          <SectionLabel>About</SectionLabel>
          <Heading as="h1">
            Design and code, from the same pair of hands.
          </Heading>
          <Text size="lg" muted className="max-w-reading">
            The short version is below. The long version is every project on
            this site.
          </Text>
        </div>
      </Section>

      {/* The homepage section is the canonical About copy; reusing it keeps one
          source of truth rather than a second, drifting version. */}
      <About />

      <Section variant="flat" spacing="standard" aria-labelledby="find-me">
        <div className="flex flex-col gap-6">
          <Heading as="h2" size="h3" id="find-me">
            Where to find me
          </Heading>
          <ul className="flex flex-wrap gap-6">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="link-underline text-body"
                  rel="me noopener noreferrer"
                  target="_blank"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <Text muted>
            All {site.handle} · {site.email}
          </Text>
        </div>
      </Section>
    </main>
  );
}
