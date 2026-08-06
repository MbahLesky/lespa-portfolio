import Link from "next/link";

import { Container } from "@/components/layout/Container";

/**
 * A small conversational prompt between sections, so the page asks more than
 * once without saving every request for the end.
 *
 * Styled as a text link at Body S, never a button — these are invitations, not
 * demands. Maximum three on the page.
 */
export function MicroCta({ href, label }: { href: string; label: string }) {
  return (
    <div className="surface-flat">
      <Container>
        <div className="flex justify-center py-8">
          <Link href={href} className="link-underline text-body-sm">
            {label} →
          </Link>
        </div>
      </Container>
    </div>
  );
}
