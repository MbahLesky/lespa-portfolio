/**
 * The abstract SVG pattern, blended into the section background.
 *
 * CORE VISUAL §Pattern System: only over a gradient background, always at 50%
 * opacity, and never on a solid surface or a card. It carries no border and no
 * shadow — it reads as part of the page, not as something placed on top of it.
 *
 * Layer order is gradient → pattern → content, so this sits behind the content
 * and is masked at the edges so it never competes with text.
 */
export function PatternBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-dark-surface"
    >
      <div className="pattern-overlay absolute inset-0" />
    </div>
  );
}
