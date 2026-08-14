import { RichText } from "@/components/shared/RichText";
import { Tag } from "@/components/shared/Tag";
import { Text } from "@/components/shared/Text";
import { TokenDisplay } from "@/components/sections/TokenDisplay";
import { tools } from "@/content/copy";

/**
 * The design system, rendered from the tokens the page itself is built on.
 *
 * This used to be a section of the home page, where it was a claim about how I
 * work sitting among other claims. It belongs here instead: inside the case
 * study for my own brand, it is the artefact under discussion rather than an
 * assertion beside one — and the swatches are the live values, so it cannot
 * drift from what the site actually uses.
 */
export function LiveSystem() {
  return (
    <div className="flex flex-col gap-12">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          {tools.stack.map((group) => (
            <div key={group.group} className="flex flex-col gap-4">
              <Text size="caption" muted className="uppercase">
                {group.group}
              </Text>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Text muted>
          <RichText highlight={["design tokens"]}>{tools.systemBody}</RichText>
        </Text>
      </div>

      <TokenDisplay />
    </div>
  );
}
