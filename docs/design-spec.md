# Lespa Portfolio — Design Spec v2
**Supersedes v1 where they differ. All decisions incorporated.**

---

## PART 1 — TYPOGRAPHY (RESOLVED)

Your two docs conflict. Resolutions below, with reasoning.

### The stack
```
Nicomedia       Wordmark only. Never in UI, body, or marketing copy.
Saira           All headings. Expression + structure.
IBM Plex Sans   All body, UI, labels. Clarity + system thinking.
```
Two fonts in use, one for identity. Matches your notes' "1–2 fonts" rule.

### Heading scale — Saira

| Level | Size | Weight | Tracking | Line height |
|---|---|---|---|---|
| H1 | 48px | Medium 500 | -0.02em | 1.2 |
| H2 | 40px | **SemiBold 600** ⚠️ | -0.02em | 1.2 |
| H3 | 32px | Regular 400 | -0.02em | 1.25 |
| H4 | 28px | Medium 500 | -0.01em | 1.3 |
| H5 | 20px | Regular 400 | -0.01em | 1.3 |
| H6 | 16px | Medium 500 | -0.01em | 1.4 |

**⚠️ H2 changed from ExtraBold to SemiBold.** Your Typeface doc: *"Avoid ExtraBold — it breaks the calm, confident tone."* ExtraBold at 40px next to a Medium 48px H1 also creates an inverted hierarchy — the H2 shouts louder than the H1. SemiBold keeps the weight contrast without the shout.

### Body scale — IBM Plex Sans

| Level | Size | Weight | Tracking | Line height |
|---|---|---|---|---|
| Large | 18px | **Regular 400** ⚠️ | 0.02em | 27px (1.6) |
| Regular | 16px | **Regular 400** ⚠️ | 0.02em | 24px (1.6) |
| Small | 14px | Medium 500 | 0.05em | 21px (1.5) |
| Caption | 12px | Regular 400 | 0.05em | 18px (1.5) |

**⚠️ Body changed from Light to Regular.** Your Typeface doc: *"Avoid Light — too fragile on dark themes."* This site is dark-first, which makes Light 16px a real legibility problem — thin strokes on dark backgrounds visually erode. Regular is the correct call for a dark UI.

**If you want the lighter feel back:** use Light for large display copy only — pull quotes, the hero subtext, anything 24px+. Never for reading text.

### Letter-spacing decode
Your CORE VISUAL numbers are percentages, not pixels:
```
-2  →  -0.02em     matches Typeface doc "H1–H3: -0.02em"  ✓
-1  →  -0.01em     matches "H4–H6: -0.01em"               ✓
 2  →   0.02em     slight positive tracking for body
 5  →   0.05em     matches "Buttons/Labels: 0.05em"       ✓
```
Both documents agree once read this way. No conflict.

### Mobile
Drop every heading one step. Body stays 16px. Never below 14px.
```
H1 48 → 40    H2 40 → 32    H3 32 → 28    H4 28 → 24
```

### Dark-theme rules
- Never pure white. Body is `#E7ECE9`.
- Headings may be brighter than body, but not `#FFFFFF`.
- Add 5% to line height in dark sections.

---

## PART 2 — COLOR & GRADIENTS (RESOLVED)

### Palette in use
```
BRAND
  Primary Light    #0F8A36    hover, emphasis
  Primary          #0D6D2B    CTAs, active states, accents  — LIGHT MODE ONLY as text
  Primary Dark     #075520    pressed states, gradient depth
  Primary Soft     #E6F2EB    tint backgrounds
  Primary Muted    #9BBFA9    disabled

DARK (primary theme)
  Background       #0E1110
  Surface          #141A17
  Text Primary     #E7ECE9
  Text Muted       #9AA5A0
  Accent           #2FA86A    ← the green you use on dark. Not #0D6D2B.

LIGHT
  Background       #FAFBF9
  Surface          #FFFFFF
  Border           #E4EAE6
  Text Primary     #1A1F1C
  Text Secondary   #5E6B63

SECONDARY
  Warm Sand        #EDE7DB    editorial breaks only
```

**Critical rule:** `#0D6D2B` fails contrast as text on `#0E1110`. On dark surfaces, green text and green icons are always `#2FA86A`. `#0D6D2B` on dark is only ever a *fill* behind white text (buttons), never a foreground colour.

### The gradient conflict — resolved

Your two docs disagree:
- Personal Brand doc: `#0D6D2B → #2FA86A`
- CORE VISUAL.docx: Primary → Primary Dark, i.e. `#0D6D2B → #075520`

**Resolution — use both, at different scales:**

```
Gradient / Brand Deep          #0D6D2B → #075520   135°
  Large surfaces: hero, final CTA, case study heroes.
  Stays dark, keeps content readable, doesn't compete with the work.

Gradient / Brand Lift          #0D6D2B → #2FA86A   135°
  Small accents only: button fills, dividers, progress bar,
  active indicators, icon backgrounds.
  Bright enough to signal, small enough not to dominate.
```

**Why this split:** a bright green gradient across a full hero would violate your own rule that green is never a large background fill and never competes with content. Deep for surfaces, lift for signals.

### The other three gradients (unchanged from CORE VISUAL)
```
Gradient / Dark Background     #0E1110 → #141A17   135°   default sections
Gradient / Light Background    #FAFBF9 → #FFFFFF   135°   light sections
Gradient / Accent Background   #FAFBF9 → #EDE7DB   135°   warm editorial breaks
```

### Pattern overlay
```
Gradient background
  → Pattern SVG at 50% opacity
    → Content

Light mode: pattern-light.svg, colour #FFFFFF
Dark mode:  pattern-dark.svg,  colour #141A17
```
Gradient backgrounds only. Never on cards, inputs, or small components.

### Section colour map — the scroll rhythm
```
1  Hero              Brand Deep gradient + pattern
2  Approach          Dark Background gradient
3  Selected Work     #0E1110 flat  ← flat so the work images carry it
4  Skills & Services Dark Background gradient
5  Tools & Systems   #141A17 surface
6  Methodology       Dark Background gradient + pattern
7  Proof             Accent Background (Warm Sand)
8  About             Accent Background (Warm Sand)
9  Final CTA         Brand Deep gradient + pattern
10 Footer            #0E1110 flat
```
Hero and CTA share treatment — the page bookends itself. The two warm sections form one human block in the lower third.

---

## PART 3 — HERO: THE ROLE SWAP

Your notes: *"Graphic cancels and web displays and the other way around."* Here's how to build it without weakening your positioning.

### Structure
```
Kicker      Lespa (Mbah Lesky)

H1          I'm a [Graphic Designer]
            who builds the products too.
                  ↑ this word swaps

Subtext     Brand systems, custom-coded websites and mobile apps —
            and I teach you how to run what I build.

CTAs        [ See the work ]   [ Start a project ]

Trust       Bamenda, Cameroon · Remote worldwide · @iamlespa
```

### The swap
Two states, alternating:
```
State A    "I'm a Graphic Designer who builds the products too."
State B    "I'm a Web Developer who designs them first."
```

**Both halves stay true in either state.** That's what stops the swap from making you look indecisive — each version is a complete, confident claim, and together they say "I do both" more convincingly than a static line could.

**Motion**
- Swapping word only. The rest of the H1 never moves.
- Old word: fade out + `translateY(-8px)`, 200ms ease-in
- New word: fade in + `translateY(8px) → 0`, 250ms ease-out
- 100ms gap between them
- Hold each state 3.5s
- Container width is fixed to the longer word — **no layout shift.** This is the detail that separates a good implementation from a janky one.
- Swapping word is `#2FA86A`, everything else `#E7ECE9`
- Stops after 4 cycles, resting on State A. Infinite loops become irritating on a page people spend two minutes on.
- `prefers-reduced-motion`: no swap, static State A.

**Accessibility:** the swapping word needs `aria-live="off"` and a visually-hidden static line stating the full role, so screen readers get one clean sentence instead of a stuttering one.

**Teaching sits in the subtext.** Per your instruction — it's the third thing you do, not the headline.

---

## PART 4 — SECTION LINEUP (FINAL)

You asked about Skills & Services and Tools & Systems. Both go in — your own notes list them as 2 of the 6 must-haves, and Tools & Systems is where you prove the "systems" claim.

```
1   Hero                    Role swap, CTAs
2   Approach                Why design + code is one job
3   Selected Work           5 projects, hover-reveal
4   Skills & Services       What you offer
5   Tools & Systems         What you build with + your design system
6   Methodology             Your process, expanded
7   Proof                   Testimonials / current work
8   About                   The human section
9   Final CTA               Conversion
10  Footer
```

### 4 — Skills & Services
Three cards. Minimal text per your instruction — headline, one line, three tags.

```
Brand Systems
Identity, palette, type, and the rules that hold them together.
[Logo Design] [Design Tokens] [Brand Guidelines]

Web & Mobile Development
Custom-coded. Next.js on the web, Flutter on mobile.
[React] [TypeScript] [Flutter] [REST APIs]

Design Mentorship
One-on-one and small-group teaching for designers who want systems.
[Design Systems] [Code Review] [Portfolio Critique]
```

Tags are the "technical terms" you asked for — they signal competence without a paragraph explaining it.

### 5 — Tools & Systems
Two halves. This is one of your strongest differentiators.

**Left — the stack.** Icon grid, no descriptions.
```
Design    Figma · Illustrator · Photoshop
Build     Next.js · React · TypeScript · Tailwind · Flutter · Dart
Ship      Vercel · Git · Supabase
```

**Right — the system, live.**
```
H3         I don't hand over files. I hand over systems.
Body       One line: every project ships with tokens, a type
           scale, spacing rules, and documentation.
```
Then render your actual system inline: the colour swatches with hex values, the type ramp at real sizes, the 8px spacing scale as visual bars. **Rendered from your real CSS variables, not screenshots.**

This is the section that proves the claim instead of asserting it. Almost nobody does it, and it costs you an afternoon because the tokens already exist.

### 6 — Methodology
Your notes: *"METHODOLOGY → Method to solve a Problem → Conversion."* Expanded from the four-step strip into a proper section.

```
Section label    Methodology
H2               How a project actually runs.
Sub-line         Same four phases every time. You always know
                 where we are.

01  Discover     Stakeholder interviews, competitive audit,
                 user research. You get a written brief before
                 anything gets designed.
                 Output: Project brief, user personas

02  Define       Information architecture, user flows,
                 wireframes. Structure gets approved before
                 visuals exist.
                 Output: Sitemap, wireframes, content plan

03  Design       Design system first, screens second. Component
                 library, tokens, responsive specs.
                 Output: Figma library, prototype, design tokens

04  Build        Custom code, component-driven, tested on real
                 devices. Accessibility checked, not assumed.
                 Output: Live product, documentation, handover

Footer line      Typical project: 3–6 weeks. I don't take rush jobs.
```

**Interaction:** vertical timeline on desktop, left rail with a green line that fills as you scroll. Each phase reveals on entry. On mobile it stacks — no horizontal scroll.

The `Output:` lines are the important bit. They turn process theatre into deliverables.

---

## PART 5 — PROJECT PAGES: WHAT GOES IN THEM

You asked: case study, design process, problem, before/after, story, or just mockups?

**Answer: a story-led case study with before/after built in. Not just mockups.**

Reasoning: mockup-only galleries show taste but not judgment — anyone can produce a pretty screen. What gets you hired is evidence you can *think*. Your own notes say it twice: *"show decision making"* and *"demonstrate how you solved problems for previous clients."*

But your notes also flag *"showcases will replace case studies"* as a 2026 trend, and there's truth in it — nobody reads 3,000 words. So the format below is a **visual-led case study**: story structure, image-heavy, tight copy.

### Two project tiers

**Tier 1 — Full case study** (your 3 strongest: the lead project, Pikamgo, Diwa)
Full page, 800–1,200 words, before/after, decisions.

**Tier 2 — Showcase** (Qiroke, Ronixe, Monilog)
Visual page. Hero, 4–6 images, 100 words of context, meta bar. No deep narrative.

Mixing tiers is fine and honest — not every project warrants a full write-up, and pretending otherwise dilutes the strong ones.

### Tier 1 page structure

```
─────────────────────────────────────────────
01  HERO
    Full-bleed image, 70vh
    Project name (H1) + one-line outcome
    Scroll cue

02  META BAR                      ← sticky under nav
    Client · Role · Timeline · Stack · Year
    Collapses to one line on mobile

03  THE PROBLEM                   ~80 words
    What was broken. Open with tension, not
    a company description.
    Optional: pull quote from the client
    describing the problem in their words

04  BEFORE                        ← your before/after
    Screenshot of what existed
    2–3 annotated callouts marking failures
    If nothing existed: show the competitor
    landscape or the paper process instead

05  WHAT I DID                    ~50 words
    Exact scope. What you did vs. collaborators.

06  RESEARCH & CONSTRAINTS        ~80 words
    What you learned. Budget, technical,
    cultural constraints.
    Artefacts: sketches, flows, wireframes

07  KEY DECISIONS                 ← the hiring section
    3–4 rows, expandable:
      Chose  →  Rejected  →  Why
    e.g. "Saira for headings / rejected Inter /
    needed technical character without coldness"
    This is where your notes' "explain why this
    typeface, why this colour" lives.

08  THE SYSTEM                    ~40 words
    Tokens, components, type scale you built.
    Visual, not described.

09  AFTER                         ← the payoff
    Final screens in quality mockups.
    Varied environments — hand, desktop, print,
    flat UI. Never five identical laptop shots.
    Optional: 20s muted screen recording,
    poster frame, plays on hover/tap

10  BEFORE ↔ AFTER SLIDER
    Draggable divider on the primary screen.
    Single most persuasive element on the page.
    Mobile: drag works, plus a tap-to-toggle.

11  OUTCOMES                      ~60 words
    Numbers if you have them. Qualitative if not:
    "the client updates the site themselves now"
    is a real outcome.
    Client quote with name, role, photo.

12  WHAT I'D DO DIFFERENTLY       ~40 words
    Optional. Self-awareness reads as seniority.

13  NEXT PROJECT                  ← full-bleed, mandatory
─────────────────────────────────────────────
```

**Total: 800–1,200 words across 13 blocks.** Roughly 70 words per block — that's your "don't overuse text" constraint enforced structurally.

**Technical terms to work in naturally:** design tokens, component library, information architecture, user flows, WCAG AA, responsive breakpoints, state management, API integration, atomic components, progressive enhancement. Sprinkled, not stacked.

### The next-project mechanic
Per your instruction — nobody dead-ends.

```
Behaviour
  Full-bleed block at the bottom of every case study
  Next project's hero image, dimmed to 40%
  On hover: brightens to 80%, image scales 1.02
  Text: "Next project" (small) + project name (H2)
  Entire block is the link

Sequencing
  Fixed order, cycles: 1 → 2 → 3 → 4 → 5 → 1
  Never repeat the project just viewed

Enhancement
  Small "2 of 5" indicator — tells people how much
  is left, which increases the odds they continue

Sticky variant (optional)
  At 80% scroll, a slim bar slides up from the
  bottom: "Next: [Project] →". Dismissible.
  Persistent invitation without blocking the outcome
  section.
```

---

## PART 6 — SELECTED WORK SECTION (HOMEPAGE)

```
Section label    Selected Work
H2               Five projects. Real clients, real constraints.
Sub-line         Brand, interface, and code — usually all three.
```

**Layout — asymmetric bento**
```
┌───────────────────────────┐
│   Project 01  (featured)  │   16:9, spans full width
└───────────────────────────┘
┌─────────────┬─────────────┐
│  Project 02 │  Project 03 │   4:3 each
└─────────────┴─────────────┘
┌─────────────┬─────────────┐
│  Project 04 │  Project 05 │   4:3 each
└─────────────┴─────────────┘
```
One asymmetry, then rhythm. Not five different sizes — with five projects that reads as arbitrary rather than composed.

**Card anatomy**
```
Image        default: final output
             hover:   crossfade to wireframe/sketch (350ms)
Tags         [Brand] [UI] [Development]  — Caption, muted
Title        Saira Medium 24px → #2FA86A on hover
Outcome      One line. What changed, not what it was.
Arrow        → shifts 4px right on hover
```

**Mobile:** single column. Hover-reveal becomes a `Final / Sketch` pill toggle in the card corner.

---

## PART 7 — TEXT HIGHLIGHT ON HOVER

Subtle, on important phrases only. Your instruction, and the restraint is the right call.

```css
.highlight {
  background-image: linear-gradient(#2FA86A33, #2FA86A33);
  background-size: 0% 100%;
  background-position: 0 88%;
  background-repeat: no-repeat;
  transition: background-size 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
.highlight:hover { background-size: 100% 100%; }
```

A soft green wash sweeps left-to-right behind the phrase. No colour change on the text itself.

**Rules**
- **Maximum 3 per section.** Beyond that it's a highlighter, not emphasis.
- Only on phrases that carry your positioning: *design the brand, build the product, teach you to run it, custom-coded, not WordPress, systems you can maintain.*
- Never on links — highlight and link must look different.
- Mobile: fires on scroll-into-view instead of hover, once, then stays.
- `prefers-reduced-motion`: appears instantly, no sweep.

**Variant for headings:** underline draw instead of wash — 2px `#2FA86A`, sweeps left-to-right over 400ms, sits 4px below the baseline.

---

## PART 8 — CAROUSEL-LIKE SECTION FLOW

Your notes: *"design like a carousel."* Done properly this feels composed; done badly it's scroll-jacking, which is the single most complained-about pattern on the web.

**Do this:**

**1. Section snap — soft**
```css
.section {
  scroll-snap-align: start;
  scroll-snap-stop: normal;   /* never "always" */
}
main { scroll-snap-type: y proximity; }   /* proximity, not mandatory */
```
`proximity` nudges toward alignment without trapping. `mandatory` hijacks scrolling and people hate it. **Do not use `mandatory`.**

**2. Cross-section colour transition**
Backgrounds interpolate over 600ms as sections change, rather than cutting. The page feels like one continuous surface that shifts mood — the carousel feeling, without stealing scroll control.

**3. Section-entry choreography**
Per section, one sequence at 60ms stagger:
```
Label     fade + rise 12px    0ms
Heading   fade + rise 16px    60ms
Body      fade + rise 16px    120ms
Content   fade + rise 20px    180ms
```
Total under 500ms. Fires once.

**4. Progress rail**
Fixed right edge, desktop only. Small dots, one per section. Fills green as you pass. Clickable. Fades out after 2s idle. Gives the carousel's sense of position without the constraint.

**5. Horizontal carousel — one place only**
The Tools & Systems logo strip can scroll horizontally on mobile. That's a genuine carousel where one belongs. Everything else stays vertical.

**Never:** full-page scroll-jacking, forced one-section-per-wheel, disabled scrollbar, blocked keyboard navigation.

---

## PART 9 — MICRO & MACRO INTERACTIONS

### Macro — guide the journey
```
Hero scroll cue          Thin vertical line, 24px, pulses
                         downward. Fades permanently after
                         first scroll.

Progress rail            Section dots, right edge (Part 8)

Reading progress         2px bar, top, Brand Lift gradient.
                         Case study pages only.

Nav auto-hide            Hides on scroll down, returns on
                         scroll up. Full screen to the work.

Micro-CTAs               Between sections, max 3 total:
                         after Work    "Want something like this? →"
                         after Method  "Curious what yours would look like? →"
                         after About   "Still reading? Let's talk. →"
                         Body S, muted, text links not buttons.

Sticky next-project      Slim bar at 80% scroll on case studies
```

### Micro — reward the detail
```
Buttons        Press: scale 0.98, 100ms. Release: back, 150ms.
Cards          Hover: image crossfade + title to green + arrow
               shifts 4px. No lift, no shadow.
Links          Underline draws left→right, 200ms
Form fields    Focus: border to #2FA86A, label rises and
               shrinks to Caption, 200ms
Form submit    Button → spinner → checkmark → "Message sent."
               Never leave a submitted form looking idle.
Copy email     Click to copy, label swaps to "Copied ✓"
               for 2s
Image load     Blur-up from a 20px placeholder, 300ms
Icon buttons   Rotate 15° on hover, 150ms
Numbers        Count up when scrolled into view, 800ms
               (Methodology 01–04, any stats)
Tags           Border brightens on hover. Not clickable in v1 —
               don't imply filtering that doesn't exist.
```

**The discipline:** every interaction is under 400ms, none blocks input, none is required to understand the page. Turn all of it off and the site still works. That's the test.

---

## PART 10 — SOUND

You want it. It's your brand — here's how to do it without it becoming the thing people remember for the wrong reason.

**My one reservation, stated once:** unexpected audio is among the most disliked patterns on the web, and your brand doc says *"quietly confident — you don't shout."* Some risk is unavoidable here. The mitigations below reduce it to near zero.

### Non-negotiable rules

1. **Default OFF.** Muted on first load, always. Browsers block audio before user gesture anyway, so autoplay-on isn't even technically available.
2. **Visible toggle.** Small speaker icon in the nav, always reachable. Not buried.
3. **Choice persists.** `localStorage`. Never ask twice.
4. **Never on mobile.** People browse in public and on shared connections. Detect touch, disable.
5. **Respect `prefers-reduced-motion`** — treat it as a signal for reduced sensory load generally.

### The sound set — five sounds, no more

| Trigger | Sound | Volume | Length |
|---|---|---|---|
| Button hover | Soft tick | 8% | 40ms |
| Button click | Muted thud | 12% | 80ms |
| Card hover | Faint air | 6% | 120ms |
| Page transition | Low whoosh | 10% | 200ms |
| Form success | Two-note rise | 15% | 300ms |

**Character:** organic and dry. Wooden ticks, soft paper, low woody knocks. Never digital beeps, never synth blips, never anything with a musical pitch you'd notice twice.

**Technical**
- Preload all five on toggle-on, not page load
- Web Audio API, not `<audio>` — lower latency
- Debounce hover sounds at 80ms so fast mouse movement doesn't machine-gun
- Hard cap: one sound at a time. Later sound cancels earlier.
- Total payload under 40KB
- Never during scroll

**The self-test:** turn sound on, use the site for two minutes, and see whether you reach for the toggle. If you do, they're too loud or too frequent. Halve the volume and cut the card-hover sound first.

---

## PART 11 — TEXT DISCIPLINE

Your instruction: don't overuse text, work in technical terms.

### Word budgets — hard caps
```
Hero                 H1 12 words · subtext 25 words
Approach             H2 8 · body 40 · three points 20 each
Selected Work        H2 8 · sub-line 15 · per card 12
Skills & Services    per card 15 + tags
Tools & Systems      H3 10 · body 25
Methodology          per phase 30 + output line
Proof                quote as given
About                185 total (already written)
Final CTA            H2 5 · body 35
```

**Homepage total: under 700 words.** If a section runs over, cut — don't shrink the type.

### Technical vocabulary
Use where it's accurate. It signals competence to technical readers and costs nothing with non-technical ones as long as the sentence still parses without it.

```
Design    design tokens · component library · type scale ·
          8pt grid · visual hierarchy · information architecture
Dev       Next.js · TypeScript · Flutter · state management ·
          REST APIs · server components · responsive breakpoints
Craft     WCAG AA · progressive enhancement · atomic components ·
          semantic markup · Core Web Vitals
```

**Rule: one technical term per sentence, maximum.** Two is jargon. Your notes say *"try throwing some technical terms in text"* — throwing, not burying.

---

## PART 12 — REVISED BUILD ORDER

**Stage 1 — Static, real, deployed**
All sections, all content, responsive, accessible. Zero animation. Ship it.

**Stage 2 — Type & colour resolved**
Apply Part 1 and Part 2 decisions. Self-hosted fonts, tokens, gradients, pattern layering. Verify every contrast pair.

**Stage 3 — Motion foundation**
Motion tokens. Scroll reveals. Hover states. Page transitions. Section colour interpolation.

**Stage 4 — Signature interactions**
Role swap. Hover-reveal cards. Text highlight. Before/after slider.

**Stage 5 — Flow**
Progress rail. Soft snap. Nav auto-hide. Micro-CTAs. Next-project blocks.

**Stage 6 — Sound**
Last. Off by default. Test on real people before you consider it done.

**Stage 7 — Measure**
Analytics. Watch case study completion rate and whether anyone touches the sketch toggle. Iterate on data.

---

## OPEN ITEMS

- [ ] Confirm SemiBold H2 over ExtraBold
- [ ] Confirm Regular body over Light
- [ ] Confirm the two-gradient split (Deep for surfaces, Lift for accents)
- [ ] Verify `#2FA86A` on `#0E1110` passes WCAG AA at 16px
- [ ] Decide the lead project — determines case study #1
- [ ] Non-work line for the About section
- [ ] Photo
- [ ] Do you have before-state screenshots for any project? Determines whether the before/after slider is viable.
