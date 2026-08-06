import { hero } from "@/content/copy";

/**
 * Line two of the hero headline.
 *
 * Static in this phase — the alternation is Phase 6. Both states are rendered
 * now regardless, stacked into a single CSS grid cell so the container is
 * already sized to the wider of the two. The swap therefore cannot introduce
 * layout shift when it is switched on later.
 *
 * Both states are hidden from assistive technology; the hero supplies one clean
 * sentence instead, so a screen reader never hears a stuttering headline.
 */
export function RoleSwap() {
  return (
    <span className="role-swap" aria-hidden="true">
      {hero.roles.map((role, index) => (
        // The role carries the accent role and the copy around it drops to the
        // secondary tone, so the swapping words are the brightest thing on the
        // line. On Brand Deep that reads as white against 72% white — green on
        // green would fail contrast outright.
        <span
          key={role.word}
          className="role-swap-state text-content-secondary"
          data-current={index === 0 ? "true" : undefined}
        >
          {role.before}{" "}
          <span className="text-accent-fg">{role.word}</span> {role.after}
        </span>
      ))}
    </span>
  );
}
