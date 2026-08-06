import { Section } from "@/components/sections/Section";
import { Button } from "@/components/shared/Button";
import { Heading } from "@/components/shared/Heading";
import { Text } from "@/components/shared/Text";
import { errors } from "@/content/copy";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main">
      <Section variant="brand" pattern spacing="major" className="below-nav">
        <div className="flex max-w-reading flex-col gap-6">
          <Heading as="h1">{errors.notFound.heading}</Heading>
          <Text size="lg" className="text-content-secondary">
            {errors.notFound.body}
          </Text>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" href="/projects">
              See the work
            </Button>
            <Button variant="secondary" href="/">
              Go home
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
