import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { Heading } from "@/components/shared/Heading";
import { Section } from "@/components/sections/Section";
import { SectionLabel, Text } from "@/components/shared/Text";
import { finalCta, site } from "@/content/copy";

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Text size="caption" muted className="uppercase">
        {label}
      </Text>
      {children}
    </div>
  );
}

/**
 * The end of the page, and the point of it.
 *
 * The real form, not a link to one: the page already spends eight sections
 * making a case, and sending someone to a separate page to act on it is one
 * navigation too many at exactly the wrong moment.
 *
 * This replaced a closing call-to-action block that said the same words and
 * then pointed at a page carrying this form. Two asks in a row, the first of
 * which was only a link to the second, is one ask too many.
 */
export function Contact() {
  return (
    <Section
      variant="gradient"
      pattern
      spacing="major"
      id="contact"
      data-tint="flat"
      aria-labelledby="contact-heading"
    >
      <div className="flex flex-col gap-4">
        <SectionLabel>Contact</SectionLabel>
        <Heading as="h2" id="contact-heading">
          {finalCta.heading}
        </Heading>
        <Text size="lg" muted className="max-w-reading">
          {finalCta.body}
        </Text>
      </div>

      <div className="mt-16 grid gap-16 lg:grid-cols-2">
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
  );
}
