AI AGENT EXECUTION COMMAND

You are a senior frontend systems engineer operating inside an existing Next.js
App Router project with Framer Motion already installed.

Your objective is to modify the existing Hero role-swap typewriter animation.
Do not explain. Execute.

CONTEXT

The Hero section currently displays:
"I am Lespa" followed by a role-swap typewriter alternating between
"Graphic Designer" and "Web Developer."

Current behavior (to be replaced):
1. Type "Graphic Designer" forward, character by character.
2. Pause.
3. Delete all characters back to empty.
4. Type "Web Developer" forward, character by character.
5. Repeat, alternating.

This produces a visible "clear to blank" gap between words. That gap must
be removed.

PHASE 1 — REPLACE THE TYPEWRITER TRANSITION

Implement a direct in-place replacement transition instead of the
type → pause → delete-all → type cycle.

Requirements:

1. When transitioning from word A to word B, do NOT erase to an empty
   string first. The transition must read as "typing over" the current
   word, not clearing it.

2. Compute the shared prefix length between word A and word B.
   - Characters within the shared prefix remain untouched — no animation.
   - Characters after the shared prefix animate out (word A's remainder)
     and animate in (word B's remainder), left to right, character by
     character, immediately following one another with no full-word
     pause in between.

3. If word B is longer than word A, the extra trailing characters type
   in normally after the replacement sequence completes.
   If word B is shorter than word A, the extra trailing characters from
   word A are removed as part of the same left-to-right pass — not as a
   separate delete phase.

4. The cursor (if present) stays adjacent to the actively animating
   character at all times — it does not jump to position 0.

5. Timing: character replacement speed should match the existing type
   speed already defined in the component (do not introduce a new
   arbitrary duration — reuse the existing token/variable).

6. Implementation approach: use Framer Motion's AnimatePresence at the
   per-character level (each character position is its own animated
   node keyed by its index + word), OR a controlled state machine that
   swaps characters index-by-index. Either is acceptable — the visual
   result (no full clear, left-to-right in-place replace) is the
   requirement, not the implementation detail.

7. Do not change font, size, color, or any other Hero styling. Only the
   transition mechanic changes.

PHASE 2 — SEQUENCE SECONDARY HERO ELEMENTS AFTER THE TYPEWRITER

Currently, other Hero elements (subtext, CTAs, supporting visual
elements) appear at or near the same time as the typewriter starts.

Requirements:

1. The role-swap typewriter ("I am Lespa" + Graphic Designer / Web
   Developer) must complete its first full type-in (i.e., the first
   word fully typed, before any transition to the second word) before
   any other Hero element begins entering.

2. After that first full type-in completes, wait a few seconds
   (use a named delay constant, e.g. `SECONDARY_REVEAL_DELAY`, default
   value 2000–3000ms — do not hardcode a magic number inline) before
   triggering the entrance animation for the remaining Hero elements
   (subtext, CTAs, supporting graphic).

3. The role-swap typewriter continues its normal alternating cycle
   uninterrupted while the secondary elements enter — the two animations
   run independently once triggered; the delay only gates the start of
   the secondary reveal, not the typewriter's ongoing loop.

4. Secondary elements should use the existing entrance animation style
   already defined elsewhere in the project (fade + slight upward
   translate, matching the motion wrapper utility already in use) —
   do not invent a new animation style for this.

OUTPUT REQUIREMENTS

Return:
- The modified Hero component file(s) only.
- No explanation.
- No TODOs.
- No pseudo-code.
- Fully compiling code.

CONSTRAINTS

- No hardcoded hex colors or arbitrary spacing — reuse existing design
  tokens per CORE VISUAL.
- No new dependencies — Framer Motion (already installed) is sufficient
  for both phases.
- If a conflict exists between this prompt and existing Hero styling
  tokens, the existing tokens win; only the animation mechanics and
  sequencing described above should change.
