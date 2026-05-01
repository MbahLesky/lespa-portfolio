# Build Rules

This document defines how the portfolio must be built.

These are **non-negotiable constraints** to ensure consistency, scalability, and quality.

---

# 1. Core Principle

Build systems, not pages.

* Every decision must be reusable
* No one-off styling
* No visual guesswork

If it repeats → systemize it

---

# 2. Tech Stack (Locked)

* Next.js (App Router)
* Tailwind CSS
* Framer Motion
* shadcn/ui

---

# 3. Design System Enforcement

## Rules

* No raw hex values in components
* No inline styles
* No arbitrary spacing (`mt-[23px]`)
* No custom colors outside tokens

Everything must come from:

* Tailwind theme
* Design tokens
* Defined components

---

## Tokens (Required)

Use only:

* Colors → from `theme.colors`
* Typography → from `theme.fontFamily`, `fontSize`
* Spacing → from spacing scale
* Radius, shadows → predefined

---

# 4. Layout Rules

## Container

* Max width: `1200px`
* Centered
* Consistent horizontal padding

---

## Section Spacing

Reduce the default padding.

Use controlled spacing:

* Section padding: `py-16` (default)
* Large sections: `py-20`
* Small sections: `py-12`

No excessive whitespace.

---

## Grid System

* Desktop → 12 columns
* Tablet → 8 columns
* Mobile → 4 columns

Use Tailwind grid only.
No random flex hacks for layout.

---

# 5. Background System

## Rules

* No solid primary color backgrounds
* Use neutral surfaces + gradients
* Use pattern overlay (mandatory)

---

## Pattern Usage

* SVG pattern from assets
* Applied on section backgrounds
* Opacity: **50%**
* Color adapts to theme (light/dark surface)

---

## Gradients

Use only defined gradients:

* Light mode → subtle neutral gradients
* Dark mode → deep layered gradients

Gradients are **structural**, not decorative.

---

# 6. Theming (Light / Dark)

## Rules

* Must support both modes from the start
* No hardcoded colors
* Use semantic tokens

---

## Key Constraint

* **Dark accent = Primary color in dark mode**

---

# 7. Typography Rules

* Max 2 font families
* Clear hierarchy (H1 → H4, Body, Caption)
* No random font sizes
* Use defined scale only

---

## Text Behavior

* Left aligned
* Short paragraphs
* Scannable structure

---

# 8. Component System

Start small. Do not overbuild.

## Required Components

* Button (Primary, Secondary, Ghost)
* Card
* Section wrapper
* Container
* Input fields
* Navbar
* Footer

---

## Rules

* Use shadcn components as base
* Extend, don’t rebuild
* Keep components minimal
* Avoid deep nesting

---

# 9. Component States

Each interactive component must include:

* Default
* Hover
* Active
* Disabled

No missing states.

---

# 10. Animation Rules

Use Framer Motion intentionally.

## Allowed

* Fade
* Slide
* Subtle scale

---

## Not Allowed

* Over-animation
* Distracting motion
* Delays that hurt UX

---

## Principle

Animation supports clarity, not decoration.

---

# 11. Page Structure (One Page)

This is a **single-page portfolio**.

## Sections (Order is fixed)

1. Header
2. Hero
3. About (Mission)
4. Services
5. Selected Work
6. Process
7. Proof (Optional)
8. CTA
9. Contact
10. Footer

---

# 12. Content Integration

* Do not write content in code manually
* Reference `content.md`
* Keep content separate from UI

---

# 13. Performance Rules

* Optimize images
* Use Next.js Image component
* Lazy load sections where possible
* Avoid unnecessary re-renders

---

# 14. File Structure (Keep It Tight)

Avoid bloated folders.

## Structure

```
/app
/components
/lib
/styles
/content
```

---

## Rules

* No unused files
* No duplicate components
* Keep components reusable

---

# 15. Accessibility (Basic)

* Proper semantic HTML
* Button vs link usage correct
* Sufficient contrast
* Keyboard accessible

---

# 16. What NOT to Do

* No over-engineering
* No premature abstraction
* No design-first coding
* No random UI experiments

---

# 17. Mental Model

* Design system → drives UI
* UI → drives layout
* Layout → builds page

Not the other way around.

---

If something feels off, it probably is.

Fix the system, not the symptom.
