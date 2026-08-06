import { Section } from "@/components/sections/Section";
import { Button } from "@/components/shared/Button";
import { Heading } from "@/components/shared/Heading";
import { Highlight } from "@/components/shared/Highlight";
import { Reveal } from "@/components/shared/Reveal";
import { SectionLabel, Text } from "@/components/shared/Text";
import { Tag } from "@/components/shared/Tag";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import type { HeadingLevel, SurfaceVariant, TextSize } from "@/types";

/**
 * Development harness for the primitives — every component, variant, and state
 * on one page so regressions are visible at a glance.
 *
 * Deleted before launch; it is not linked from anywhere and is excluded from
 * the sitemap and search indexing.
 */
export const metadata = { robots: { index: false, follow: false } };

const SURFACES: SurfaceVariant[] = [
  "gradient",
  "brand",
  "warm",
  "flat",
  "raised",
];
const HEADINGS: HeadingLevel[] = ["h1", "h2", "h3", "h4", "h5", "h6"];
const TEXT_SIZES: TextSize[] = ["lg", "base", "sm", "caption"];

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <Text size="caption" muted className="uppercase">
        {title}
      </Text>
      {children}
    </div>
  );
}

export default function SystemTest() {
  return (
    <main id="main">
      <Section variant="flat" spacing="standard" className="below-nav">
        <div className="flex items-center justify-between gap-6">
          <Heading as="h1">System test</Heading>
          <ThemeToggle />
        </div>
        <Text muted className="mt-4">
          Every primitive, every variant, every state. Toggle the theme to check
          both. This route is deleted before launch.
        </Text>
      </Section>

      {/* ---------- Typography ---------- */}
      <Section variant="raised" spacing="standard">
        <SectionLabel>Typography</SectionLabel>
        <div className="mt-8 flex flex-col gap-6">
          {HEADINGS.map((level) => (
            <div key={level} className="flex items-baseline gap-6">
              <Text size="caption" muted className="w-8 shrink-0">
                {level}
              </Text>
              <Heading as={level}>Design and code are one job</Heading>
            </div>
          ))}
          {TEXT_SIZES.map((size) => (
            <div key={size} className="flex items-baseline gap-6">
              <Text size="caption" muted className="w-8 shrink-0">
                {size}
              </Text>
              <Text size={size}>
                Systems, not one-offs — rules you can repeat.
              </Text>
            </div>
          ))}
          <div className="flex items-baseline gap-6">
            <Text size="caption" muted className="w-8 shrink-0">
              muted
            </Text>
            <Text muted>Secondary copy sits at the muted token.</Text>
          </div>
        </div>
      </Section>

      {/* ---------- Buttons ---------- */}
      <Section variant="flat" spacing="standard">
        <SectionLabel>Buttons</SectionLabel>
        <div className="mt-8 flex flex-col gap-8">
          <Row title="Variants">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">Start a project</Button>
              <Button variant="secondary">See the work</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </Row>
          <Row title="As links">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" href="/system-test">
                Internal link
              </Button>
              <Button variant="secondary" href="mailto:hello@example.com">
                External link
              </Button>
            </div>
          </Row>
          <Row title="Disabled">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" disabled>
                Disabled
              </Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
            </div>
          </Row>
          <Row title="Text link with underline draw">
            <a href="/system-test" className="link-underline text-body">
              See how I work
            </a>
          </Row>
        </div>
      </Section>

      {/* ---------- Tags ---------- */}
      <Section variant="raised" spacing="standard">
        <SectionLabel>Tags</SectionLabel>
        <div className="mt-8 flex flex-wrap gap-2">
          {["Brand", "UI", "Development", "Design Tokens", "WCAG AA"].map(
            (tag) => (
              <Tag key={tag}>{tag}</Tag>
            ),
          )}
        </div>
      </Section>

      {/* ---------- Highlight ---------- */}
      <Section variant="flat" spacing="standard">
        <SectionLabel>Highlight</SectionLabel>
        <div className="mt-8 flex max-w-reading flex-col gap-6">
          <Text size="lg">
            I <Highlight>design the brand</Highlight>, build the product, and{" "}
            <Highlight>teach you to run it</Highlight>.
          </Text>
          <Heading as="h3">
            Every site is <Highlight underline>custom-coded</Highlight>.
          </Heading>
          <Text size="sm" muted>
            Hover on a pointer device. On touch these paint once on scroll and
            persist.
          </Text>
        </div>
      </Section>

      {/* ---------- Reveal ---------- */}
      <Section variant="raised" spacing="standard">
        <SectionLabel>Reveal</SectionLabel>
        <Reveal className="mt-8">
          <Text>
            This block fades up 16px once, at 15% into the viewport, and never
            re-animates on the way back.
          </Text>
        </Reveal>
        <Reveal stagger className="mt-8 flex flex-col gap-4">
          <Text muted>Staggered child one</Text>
          <Text muted>Staggered child two</Text>
          <Text muted>Staggered child three</Text>
          <Text muted>Staggered child four</Text>
        </Reveal>
      </Section>

      {/* ---------- Surfaces ---------- */}
      {SURFACES.map((variant) => (
        <Section key={variant} variant={variant} spacing="standard">
          <SectionLabel>{variant}</SectionLabel>
          <Heading as="h3" className="mt-4">
            Surface: {variant}
          </Heading>
          <Text muted className="mt-4 max-w-reading">
            Body copy on the {variant} surface, with a secondary tone beneath it
            to check both text tokens resolve.
          </Text>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Tag>Tag</Tag>
          </div>
        </Section>
      ))}

      {/* ---------- Patterned surfaces ---------- */}
      {(["gradient", "brand", "warm"] as const).map((variant) => (
        <Section key={variant} variant={variant} pattern spacing="standard">
          <SectionLabel>{variant} + pattern</SectionLabel>
          <Heading as="h3" className="mt-4">
            Pattern sits at 50% between gradient and content
          </Heading>
          <Text muted className="mt-4 max-w-reading">
            Content must stay fully legible over the pattern. Cards, inputs, and
            small components never receive it.
          </Text>
        </Section>
      ))}

      {/* ---------- Spacing scale ---------- */}
      <Section variant="flat" spacing="major">
        <SectionLabel>Spacing — major</SectionLabel>
        <Text muted className="mt-4">
          120px desktop / 80px mobile. The section above uses standard: 96 / 64.
        </Text>
      </Section>
    </main>
  );
}
