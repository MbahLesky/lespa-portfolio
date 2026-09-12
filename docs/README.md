# /docs — what is here

## Sources of truth (Phase 1)

Build from these four, in this order of precedence:

| Document | Covers |
|---|---|
| `core-visual.md` | Colours, typography, spacing, gradients, the pattern system. Every design token derives from this file, and it wins any conflict. |
| `lespa-restructure-structure-and-motion.md` | Page structure, section-by-section layout, motion spec, background imagery rules, per-project colour theming. |
| `lespa-restructure-copy.md` | Final, locked copy for every section. Used verbatim. Where a section renders its copy with decoration or in a particular rhythm, an *"As rendered"* note records it. |
| `lespa-restructure-assets.md` | Asset checklist — what each section needs and what is still outstanding. |

Copy changes start here and then land in `src/content/copy.js`, never the other
way around.

## Phase 2 source material

Case-study content for the dedicated project pages that Phase 1 does not build.
Not yet reflected in the codebase:

`monilog-case-study-final.md` · `diwa-case-study-final.md` · `diwa-audit-block.md` ·
`ronixe-case-study.md` · `qiroke-showcase-final.md` · `pikamgo-case-study.md` ·
`yisi-showcase.md` · `portfolio-project-tier-list.md`

Two per-project brand colours used by Selected Work come from these documents —
Monilog's mint and PikamGo's International Orange. See `src/content/projects.js`.

## Removed

The pre-restructure planning documents — the v1 build prompt, design spec,
interaction spec, structure spec, homepage and About copy decks, and mock content
— described a multi-page site, section flow, copy and hero animation that no
longer exist. They were deleted rather than left to be mistaken for current.
They remain in git history if any of it is ever wanted back.
