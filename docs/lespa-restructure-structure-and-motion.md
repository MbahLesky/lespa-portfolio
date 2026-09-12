# Lespa Portfolio Restructure — Structure & Motion
**Status: FINAL — Phase 1 structure and motion locked. Copy doc to follow separately.**

---

## PHASING

| Phase | Scope | Notes |
|---|---|---|
| **1** | Single page. Simple, minimal copy, dark-first. | Build this first. |
| **2** | Multi-page: dedicated project/case-study pages, About page, Mentorship track. | More expensive — comes after Phase 1 ships. |
| **3** | Full motion layer: WebGL/3D mockup reveals, heavier interaction. | Ewan Kerboas / itssharl.ee tier. |

**Mentorship is explicitly deferred to Phase 2+.** Phase 1 is client-work only.

---

## DESIGN REFERENCES — WHAT'S BEING TAKEN FROM WHERE

| Site | Taken | Link |
|---|---|---|
| Ewan Kerboas | Minimalist design, minimal copy, subtle animation, cursor-motion effect | https://ewan-kerboas.fr/ |
| Adham Dannaway | Two-role hero framing (Designer/Coder), About page role-split structure, hero image tone, About copy, Contact page | https://www.adhamdannaway.com/ |
| Brittany Chiang | Minimal dark design, About copy tone | https://brittanychiang.com/ |
| Robb Owen | Intro copy economy, light-mode restraint (copy tone only — we're going dark), About copy, "let's build something" CTA energy | https://robbowen.digital/ |
| Brice Clain | Angle-bracket dev/designer framing, step-sequence below hero (→ Process section) | https://briceclain.com/en/ |
| Tamal Sen | "What I Do" hover-card structure, blended background imagery concept (code-snippet-in-background) | https://tamalsen.dev/ |
| Charles Bruyerre (itssharl.ee) | Hero copy brevity, cursor animation, hover animations, About-as-section (not page), overall minimalism, light/dark mode, **Process section hover-list interaction pattern** (from /work page) | https://itssharl.ee/ |
| Adam Hartwig | Hover animations, one-page precedent (structure only — visual style is dated, not referenced) | https://www.adamhartwig.co.uk/ |
| Monilog (own product) | Page structure & section flow, snap-scroll sections, carousels within sections, nav/scroll-progress indicator, dark theme | https://monilog.vercel.app/ |

---

## PHASE 1 SITEMAP (single page)

Anchor nav, scroll-progress indicator (Monilog pattern). No mentorship link.

### 1. Hero
- Line: **"Hi, I am Lespa."** — typewriter animation, as currently live on the site. **Centered** (not left-aligned).
- Role statement — **typewriter animation** (typed once, not looping/toggling between variants — the "static" note earlier meant no cycling between multiple phrases, not no animation), also **centered**:
  - "A Designer who builds the products too."
  - "A Developer who designs them first."
- Subtext: **pending rewrite** (see note below) — **moves in** (slide/fade), not typed.
- CTAs: **See my work** / **About me**
- Sequence: headline types in → role statement types in → subtext moves in → **then** CTAs and nav animate in.
- Background: brand's **dark neutral gradient** (Dark Background → Dark Surface, #0E1110 → #141A17, per CORE VISUAL).
- Motion: typewriter on headline + role statement. Subtext uses a move-in transition instead. Cursor-follow effect starts here, site-wide from this point on.

### 2. Intro
- 2–3 sentences max. States "design and code are one job" position. Replaces current 3-pillar breakdown.
- Background: abstract SVG pattern system (50% opacity, per CORE VISUAL spec).

### 3. Selected Work
- **6 projects.** Snap-scroll or carousel, one project per view.
- Layout: image/mockup on one side, name + description + tags on the other.
- Links: **live URL only if one exists — no link at all if it doesn't.** No placeholder/Behance fallback.
- Mockup images: swap out current ones for updated versions per project.
- **Project card is a card** (not blended background) — hoverable.
- **Per-project color theming:** each project's title, link, and tags render in that project's own primary brand color (not the site's global green). On hover, the card shadow/glow also uses that project's primary color.

### 4. What I Do
- **3 hoverable tracks**, Tamal Sen-style (hover reveals more detail):
  1. Graphic Design
  2. Web Development
  3. Mobile Development
- Background: abstract pattern system.

### 5. Process
- **5 steps (confirmed)**, itssharl.ee/work-style interaction: step list on one side, hover reveals detail on the other.
  1. **Reach Out**
  2. **Research**
  3. **Define**
  4. **Design/Build**
  5. **Present and Deploy**
- First step models Brice Clain's "outreach" opening step.
- **Image reveal on hover:** each step also reveals an accompanying image beside the detail text on hover (Brice Clain chat-bubble reference — image appears next to the message, not just text).
- **Reach Out specifically:** the reveal is styled as a WhatsApp chatbot conversation, not a generic chat bubble. Uses the sample exchange from the copy doc. Background/styling reference (WhatsApp wallpaper look) to be provided by Lespa before build.

### 6. About (section, not a page in Phase 1)
- Photo included — **photo sits in a card**, not blended into the background.
- **Left side, under photo:** Design Tools list + Development Tools list (labeled chips/tags, no descriptive copy — see copy doc).
- Two-role split carried from hero (Designer / Coder — Adham Dannaway structure).
- Bio: short career-story paragraphs (self-taught path, 2019–2022 timeline, university teaching stint).
- **By Day, Part Designer / By Night, Part Coder** — two short bullet lists (Adham Dannaway split-list structure), not prose blocks.
- **What I don't do** section: AI use boundaries, no page builders/templates, no rushing — a differentiation block, added beyond original scope.
- Background: **literal blended imagery** here — a faded sketch element or real code/wireframe fragment, blended directly into the background (not in a card, not the photo — this sits behind/around it). **Split composition: code image on one side, design/sketch on the other** — mirroring the Designer/Developer split. Must be authentic (real Lespa work), not generic stock like Tamal's.
- The left side is sticky/fixed when scrolling, while the right side scrolls for this section.

### 8. Footer (persistent, site-wide)
- Logo, handle (@iamlespa), social icons (LinkedIn, GitHub, Facebook, X, TikTok, Behance, Dribbble), year (auto-updating), and a "built with" line naming the site's own stack.
- Persistent across the whole page (not confined to About or Contact), following the Brittany Chiang / Brice Clain pattern of always-visible social links.

### 7. Contact
- Keep current form structure, trim surrounding copy.

---

## MOTION SPEC

- **Site-wide:** cursor-follow effect (Ewan Kerboas style).
- **Every section:** subtle scroll-in reveal (move-in on entry).
- **Hero:** typewriter animation on "Hi, I am Lespa" and the role statement (typed once, no looping/toggling between variants), both centered. Subtext moves in (slide/fade) after, not typed. Sequence: headline → role statement → subtext → CTAs/nav animate in last. Background: dark neutral gradient (#0E1110 → #141A17).
- **Work section:** snap-scroll or carousel per project.
- **What I Do:** hover-to-reveal on each card.
- **Process:** hover-to-reveal, list ↔ detail pattern (itssharl.ee/work).
- **Nav:** scroll-progress indicator (Monilog pattern).
- **Site-wide, all sections:** select standout words/phrases within body copy get a hover effect (underline, color shift, or subtle highlight) — reference sites' pattern (e.g. Brice Clain's colored key terms in the outreach chat bubbles). Applied selectively, not to every word — only the words meant to draw the eye.

---

## BACKGROUND IMAGERY RULE

**Core distinction: cards vs. blended-into-background.** These are never the same treatment.

- **Blended (no card, no border, no shadow — reads as part of the background itself):** low-content sections (Hero, Intro, What I Do, Process) use the abstract SVG pattern system. The About section's literal sketch/code fragment is also blended, sitting behind/around the photo — split composition, code on one side and design/sketch on the other.
- **Cards (bordered/elevated, hoverable):** the About photo, and every project image in Selected Work. These are the only two things that should look "placed on top of" the page rather than part of it.

Applied per-section:
1. **Abstract pattern system** (existing CORE VISUAL SVG pattern, 50% opacity, blended) → Hero, Intro, What I Do, Process.
2. **Literal blended imagery** (faded sketch/code/wireframe fragments, Tamal Sen concept but with real Lespa work, not stock, blended) → About section background only, for Phase 1.
3. **Cards** → About photo, Selected Work project images (with per-project primary-color theming — see Selected Work section above).

---

## RESOLVED
- Process steps: confirmed (Reach Out / Research / Define / Design-Build / Present and Deploy)
- 6 projects for the Work section: confirmed
- Updated mockup images for Work section: sourcing/production maintained as planned
- Literal background asset for About section: Lespa to provide
- Any other needed assets: Lespa to provide
- All copy (Hero subtext, Intro, What I Do cards, Process step descriptions, About bio, Contact): Lespa to provide via separate copy document

## OPEN ITEMS
- [ ] Copy document from Lespa — once received, this structure doc and the copy doc together become the full Phase 1 spec
