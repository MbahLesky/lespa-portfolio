import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/shared/Heading";
import { SectionLabel, Text } from "@/components/shared/Text";
import { finalCta, site } from "@/content/copy";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell me what you're working on. I reply within two working days. Based in Bamenda, Cameroon, working remotely worldwide.",
  alternates: { canonical: "/contact" },
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

export default function ContactPage() {
  return (
    <main id="main">
      <Section variant="gradient" spacing="major" className="below-nav">
        <div className="flex flex-col gap-4">
          <SectionLabel>Contact</SectionLabel>
          <Heading as="h1">{finalCta.heading}</Heading>
          <Text size="lg" muted className="max-w-reading">
            {finalCta.body}
          </Text>
        </div>
      </Section>

      <Section variant="flat" spacing="major">
        <div className="grid gap-16 lg:grid-cols-2">
          <ContactForm />

          <div className="flex flex-col gap-8">
            <Detail label="Or email directly">
              <CopyEmail email={site.email} />
            </Detail>
            <Detail label="Response time">
              <Text>{site.responseTime}</Text>
            </Detail>
            {/* Maintained by hand. True scarcity reads as professional. */}
            <Detail label="Currently">
              <Text>{site.availability}</Text>
            </Detail>
            <Detail label="Based in">
              <Text>
                {site.location} · {site.timezone} · working remotely
              </Text>
            </Detail>
          </div>
        </div>
      </Section>
    </main>
  );
}
