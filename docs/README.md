# /docs — what is current and what is not

## Sources of truth (Phase 1)

Build from these four, in this order of precedence:

| Document | Covers |
|---|---|
| `core-visual.md` | Colours, typography, spacing, gradients, the pattern system. Every design token derives from this file, and it wins any conflict. |
| `lespa-restructure-structure-and-motion.md` | Page structure, section-by-section layout, motion spec, background imagery rules, per-project colour theming. |
| `lespa-restructure-copy.md` | Final, locked copy for every section. Used verbatim. |
| `lespa-restructure-assets.md` | Asset checklist — what each section needs and what is still outstanding. |

## Phase 2 source material

Case-study content for the dedicated project pages that Phase 1 does not build.
Not yet reflected in the codebase:

`monilog-case-study-final.md` · `diwa-case-study-final.md` · `diwa-audit-block.md` ·
`ronixe-case-study.md` · `qiroke-showcase-final.md` · `pikamgo-case-study.md` ·
`yisi-showcase.md` · `portfolio-project-tier-list.md`

Two per-project brand colours used by Selected Work come from these documents —
Monilog's mint and PikamGo's International Orange. See `src/content/projects.js`.

## Superseded

Every other document carries a SUPERSEDED banner. They describe the pre-restructure
multi-page site — its section flow, its copy, its hero animation — none of which
exists in the codebase any more. Kept for history; do not build from them.
