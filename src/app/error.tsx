"use client";

import { useEffect } from "react";

import { Section } from "@/components/sections/Section";
import { Button } from "@/components/shared/Button";
import { Heading } from "@/components/shared/Heading";
import { Text } from "@/components/shared/Text";
import { errors, site } from "@/content/copy";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // The digest is the only handle on the server-side cause once this reaches
    // a real user, so it belongs in the log.
    console.error("Unhandled error", error.digest ?? error);
  }, [error]);

  return (
    <main id="main">
      <Section variant="gradient" pattern spacing="major" className="below-nav">
        <div className="flex max-w-reading flex-col gap-6">
          <Heading as="h1">{errors.serverError.heading}</Heading>
          <Text size="lg" className="text-content-secondary">
            {errors.serverError.body}
          </Text>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" onClick={reset}>
              Try again
            </Button>
            <Button variant="secondary" href={`mailto:${site.email}`}>
              Email me
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
