# Core Visual Identity

## 1. Foundation

### Brand Attributes

* Structured
* Intentional
* Calm
* Technical
* Minimal

The system prioritizes clarity over decoration.
Every visual decision must serve structure and readability.

---

## 2. Color System

### Brand Principle

* Green is an **accent**, not a background.
* In dark mode, **dark-accent replaces primary usage**.

---

### Primary Accent (Light Mode)

**Brand Green**
`#0D6D2B`

**Usage:**

* Buttons
* Links
* Focus states
* Highlights
* Key UI actions

---

### Secondary Accent

**Deep Green**
`#075520`

**Usage:**

* Hover states
* Subtle emphasis

---

### Dark Mode Accent (Primary in Dark Mode)

**Dark Accent Green**
`#2FA86A`

**Usage:**

* Replaces primary in dark mode
* Buttons
* Active states
* Highlights

---

### Light Mode Neutrals

Background
`#FAFBF9`

Surface
`#FFFFFF`

Border
`#E4EAE6`

Text Primary
`#1A1F1C`

Text Secondary
`#5E6B63`

---

### Dark Mode Neutrals

Background
`#0E1110`

Surface
`#141A17`

Elevated Surface
`#1A221F`

Border
`#222B27`

Text Primary
`#E7ECE9`

Text Secondary
`#9AA5A0`

---

## 3. Gradient System

### Rules

* Gradients are **structural**, not decorative
* Used only for:

  * Hero
  * Section backgrounds
  * CTA sections

---

### Light Gradient

`#FAFBF9 → #EDE7DB`
Linear

---

### Dark Gradient

`#0E1110 → #141A17`
135°

---

### Restrictions

* No gradients on buttons
* No gradients on small UI elements
* No mixing multiple gradients in one section

---

## 4. Pattern System

### Purpose

Adds subtle depth to gradient backgrounds.

---

### Rules

* Used **only on gradient backgrounds**
* Two variants:

  * Light pattern
  * Dark pattern
* Always uses **surface color**
* Opacity is fixed at **50%**
* Must not reduce text readability

---

### Layering

Gradient
→ Pattern (50% opacity)
→ Content

---

### Restrictions

* No pattern on cards
* No pattern on solid backgrounds
* No pattern on small UI elements

---

## 5. Typography

### Font Families

Headings
**Saira**

Body
**IBM Plex Sans**

---

### Scale

H1
64px / 1.1 / Bold

H2
32px / 1.2 / SemiBold

H3
24px / 1.3 / Medium

Body Large
18px / 1.6 / Regular

Body
16px / 1.6 / Regular

Caption
14px / 1.4 / Regular

---

### Rules

* No random font sizes
* No mixing font families
* No excessive font weights
* Headings may use slight negative tracking
* Body text must remain highly readable

---

## 6. Spacing System

### Base Unit

8px grid system

---

### Allowed Values

4
8
16
24
32
40
48
64
80
120

---

### Rules

* No arbitrary spacing values
* All margins and padding must follow scale
* Consistent vertical rhythm across sections

---

## 7. Layout & Grid

### Container

* Max width: 1200px
* Centered
* Horizontal padding:

  * Mobile: 16px
  * Desktop: 24px

---

### Grid System

Desktop: 12 columns
Tablet: 8 columns
Mobile: 4 columns

---

### Section Spacing

Small
`py-16`

Medium
`py-20`

Large
`py-24`

---

## 8. Iconography

### System

Lucide (outline icons)

---

### Rules

* Outline only
* Consistent stroke
* No filled icons (unless necessary)
* Icons inherit text color

---

## 9. Motion

### Principles

Motion must feel controlled and intentional.

---

### Allowed

* Fade in
* Subtle vertical movement (10–20px)
* Duration: 0.4–0.6s
* Ease-out

---

### Avoid

* Bounce
* Elastic motion
* Over-animation
* Heavy parallax

---

## 10. Visual Rules (Non-Negotiable)

* No primary green backgrounds
* No random shadows
* No glassmorphism
* No noisy textures
* No arbitrary border radius
* No inconsistent spacing
* No visual elements outside the system

---

## 11. Implementation Rules

* All values must map to design tokens
* No hex values inside components
* No inline styles for design
* Dark mode must be token-driven
* Pattern and gradient must be handled at layout level

---

This document is the single source of truth for all visual decisions.
