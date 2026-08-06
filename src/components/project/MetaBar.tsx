import { Text } from "@/components/shared/Text";
import { Container } from "@/components/layout/Container";
import type { Project } from "@/types";

/**
 * Client · Role · Timeline · Stack · Year, sticky under the nav.
 *
 * Collapses to a single scrollable line on mobile rather than wrapping into a
 * block that would eat the viewport it is pinned to.
 */
export function MetaBar({ project }: { project: Project }) {
  const fields = [
    { label: "Client", value: project.client },
    { label: "Role", value: project.role.join(", ") },
    { label: "Timeline", value: project.timeline },
    { label: "Stack", value: project.stack.join(", ") },
    { label: "Year", value: project.year },
  ];

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
