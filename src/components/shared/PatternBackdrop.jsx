/**
 * The abstract SVG pattern, blended into the section background.
 *
 * CORE VISUAL §Pattern System: only over a gradient background, always at 50%
 * opacity, and never on a solid surface or a card. It carries no border and no
 * shadow — it reads as part of the page, not as something placed on top of it.
 *
 * The gradient it sits on is painted once on <body> for the whole page, so this
 * contributes only the pattern layer — gradient → pattern → content still holds.
 */
export function PatternBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="pattern-overlay absolute inset-0" />
    </div>
  );
}
