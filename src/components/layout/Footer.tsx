import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { SoundToggle } from "@/components/shared/SoundToggle";
import { Text } from "@/components/shared/Text";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Wordmark } from "@/components/shared/Wordmark";
import { footer, nav, site } from "@/content/copy";

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <Text size="caption" muted as="div" className="uppercase">
      {children}
    </Text>
  );
}

export function Footer() {
  return (
    <footer className="surface-flat border-t border-border">
      <Container>
        <div className="section-standard flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <Wordmark height={32} />
            <Text muted>
              {footer.tagline}
              <br />
              {footer.location}
            </Text>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div className="flex flex-col gap-4">
              <ColumnHeading>Navigate</ColumnHeading>
              <ul className="flex flex-col gap-2">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link-underline text-body-sm">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <ColumnHeading>Connect</ColumnHeading>
              <ul className="flex flex-col gap-2">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="link-underline text-body-sm"
                      rel="me noopener noreferrer"
                      target="_blank"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Text size="caption" muted>
                All {site.handle}
              </Text>
            </div>

            <div className="flex flex-col gap-4">
              <ColumnHeading>Contact</ColumnHeading>
              {/* Plain-text address as well as the form — some people won't use one. */}
              <a
                href={`mailto:${site.email}`}
                className="link-underline text-body-sm"
              >
                {site.email}
              </a>
              <Text size="caption" muted>
                Response: 2 days
              </Text>
            </div>
          </div>

          <div className="flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-1">
              <Text size="caption" muted>
                {footer.copyright}
              </Text>
              <Text size="caption" muted>
                {footer.colophon}
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <SoundToggle />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
