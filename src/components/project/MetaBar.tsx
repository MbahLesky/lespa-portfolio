import { Text } from "@/components/shared/Text";
import { Container } from "@/components/layout/Container";
import type { Project } from "@/types";

/**
 * The project's facts, sticky under the nav.
 *
 * Rows come from the project itself rather than a fixed set, because they
 * genuinely differ: one ships a stack and a set of platforms, another a sector
 * and a market. An empty "Timeline" on a project that never had one reads worse
 * than no row at all.
 *
 * Collapses to a single scrollable line on mobile rather than wrapping into a
 * block that would eat the viewport it is pinned to.
 */
export function MetaBar({ project }: { project: Project }) {
  const fields = project.meta;

  return (
    <div className="meta-bar surface-raised border-b border-border">
      <Container>
        <dl className="meta-bar-list">
          {fields.map((field) => (
            <div key={field.label} className="meta-bar-item">
              <dt>
                <Text size="caption" muted as="span" className="uppercase">
                  {field.label}
                </Text>
              </dt>
              <dd>
                <Text size="sm" as="span">
                  {field.value}
                </Text>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}
