# Section Scroll Reveal Animations & Header Logo Refinement

A visual polish update that introduces subtle, performant fade-and-slide scroll reveal transitions across all portfolio sections using Tailwind transitions and IntersectionObserver, while resizing the header brand mark to a sleek, compact 20px height.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The implementation aligns with the preferences confirmed in the interactive clarification:
> - **Motion Profile**: Subtle slide-up (`translate-y-6` to `translate-y-0`) paired with an opacity fade (`opacity-0` to `opacity-100`) triggered once per section upon entering the viewport (settling smoothly with `duration-700 ease-out`).
> - **Header Wordmark Sizing**: Reduced from `h-7` (28px) down to `h-5` (20px), creating a sleeker horizontal presence that leaves more breathing room for top navigation links and CTAs.
> - **Accessibility**: Fully respects `prefers-reduced-motion`—users with motion sensitivity immediately receive full opacity with zero translation offsets.

---

### 1. Overview & Core Concept

- **What It Does**: As visitors explore Mbah Lesky's portfolio, each content section (`Hero`, `Intro`, `SelectedWork`, `WhatIDo`, `Process`, `About`, `Contact`) gracefully glides into place with a subtle vertical lift and opacity transition. The header wordmark is reduced to a compact 20px height, giving the sticky navigation a more refined, editorial feel.
- **Target Audience & Context**: Prospective design and engineering clients, agency recruiters, and collaborators reviewing works on desktop and mobile viewports.
- **Key Value**: Replaces abrupt static content presentation with an intentional, rhythmic reading pace while maintaining instant DOM access and zero layout shifting.

---

### 2. User Experience & Visual Design

- **Section Reveal Choreography**:
  - Initial State: `opacity-0 translate-y-6` with GPU-composited Tailwind transition classes (`transition-all duration-700 ease-out will-change-[opacity,transform]`).
  - Active Revealed State: `opacity-100 translate-y-0`.
  - Trigger Point: Intersecting at `15%` viewport threshold (`rootMargin: "0px 0px -10% 0px"`), ensuring sections activate smoothly right before or as they enter the viewer's focal field.
  - One-Time Trigger: Once revealed, the observer unobserves the element so content remains solid and stable during upward and downward re-scrolling.
- **Header Top-Bar Presence**:
  - The SVG wordmark in `SiteHeader.jsx` shifts to `h-5` (20px height) with `w-auto` aspect-ratio lock.
  - Maintains strict compliance with Next.js image dimensions (`width={66} height={20}`) and style overrides (`style={{ width: "auto", height: "auto" }}`).
  - Preserves vertical alignment with the navigation links and the contact CTA button.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Tailwind Transitions + Lightweight IntersectionObserver vs Heavy Scroll Libraries**
  - *Chosen Approach*: A dedicated, lightweight `RevealSection` wrapper component that monitors viewport intersection and toggles Tailwind CSS transition classes (`opacity-0 translate-y-6` -> `opacity-100 translate-y-0`).
  - *Why*: Delivers 60fps compositor-only animations without bundle overhead, complex scroll-timeline listeners, or hydration mismatch risks.
  - *Alternatives Considered*: Framer Motion `whileInView` across every section was considered, but pure Tailwind CSS transition classes keep the runtime lightweight, avoid React re-render churn during continuous scrolling, and fulfill the explicit requirement for Tailwind transitions.

- **Decision 2: Preserving Immediate Hero Availability**
  - *Chosen Approach*: The `Hero` section renders visibly immediately (`opacity-100 translate-y-0`) without waiting for a scroll event, ensuring above-the-fold content has zero latency.
  - *Why*: Adheres to the frontend constitution's zero-latency content availability rule for first viewport paint.

---

### 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────────┐
│                        SiteHeader                            │
│    [ Lespa Wordmark: h-5 / 20px ] ─── [ Nav ] ─── [ CTA ]    │
└──────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                          HomeShell                           │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Hero (Immediate display, interactive typewriter intro)  │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ RevealSection: Intro                                   │  │
│  │ [ opacity-0 translate-y-6 ──(inView)──> opacity-100 ]   │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ RevealSection: SelectedWork                            │  │
│  │ [ opacity-0 translate-y-6 ──(inView)──> opacity-100 ]   │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ RevealSection: WhatIDo                                 │  │
│  │ [ opacity-0 translate-y-6 ──(inView)──> opacity-100 ]   │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ RevealSection: Process                                 │  │
│  │ [ opacity-0 translate-y-6 ──(inView)──> opacity-100 ]   │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ RevealSection: About                                   │  │
│  │ [ opacity-0 translate-y-6 ──(inView)──> opacity-100 ]   │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ RevealSection: Contact                                 │  │
│  │ [ opacity-0 translate-y-6 ──(inView)──> opacity-100 ]   │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

- **Implementation Steps**:
  1. Create `src/components/shared/RevealSection.jsx`:
     - Uses `useRef` and standard `IntersectionObserver`.
     - Checks `useReducedMotion()`. If reduced motion is preferred, renders without translation and immediately at full opacity.
     - When intersecting, sets `isVisible = true` and disconnects the observer.
     - Applies Tailwind classes: `transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`.
  2. Integrate `RevealSection` in `src/components/HomeShell.jsx` around each exploratory section below the hero (`Intro`, `SelectedWork`, `WhatIDo`, `Process`, `About`, `Contact`).
  3. Update `src/components/layout/SiteHeader.jsx`:
     - Adjust logo image class from `h-7 w-auto` to `h-5 w-auto`.
     - Update dimensions to `width={66} height={20}` while maintaining `style={{ width: "auto", height: "auto" }}`.
  4. Verify with linter (`lint_applet`), compilation, and dev server response checks.
