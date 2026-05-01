# Layout Structure (One-Page Portfolio)

This document defines the full structure, purpose, and layout behavior of the portfolio.

No section should be added, removed, or modified without updating this file.

---

# 1. Page Structure Overview

Order is fixed:

1. Header (Navbar)
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

# 2. Global Layout Rules

## Section Behavior

All sections must:

* Use gradient backgrounds (light or dark)
* Include pattern overlay (50% opacity)
* Follow spacing system
* Use container for alignment

---

## Section Spacing

Small: `py-16`
Medium: `py-20`
Large: `py-24`

Avoid excessive vertical padding.

---

## Container

* Max width: 1440px
* Centered
* Padding:

  * Mobile: `px-4`
  * Desktop: `px-6`

---

## Layout Types

Only use these patterns:

* Centered (single column)
* Split (2 columns)
* Grid (cards)

No experimental layouts.

---

# 3. Section Breakdown

---

## 3.1 Header (Navbar)

### Purpose

* Navigation
* Orientation
* Access to sections

---

### Content

* Logo (text-based for now)
* Links:

  * About
  * Services
  * Work
  * Contact
* Theme toggle

---

### Layout

* Horizontal flex
* Space between logo and nav
* Sticky (optional)

---

### Background

* Transparent or subtle gradient
* No heavy styling

---

---

## 3.2 Hero

### Purpose

* First impression
* Positioning
* Clear value

---

### Content

* H1 (clear, strong statement)
* Supporting text
* Primary CTA
* Secondary CTA (optional)

---

### Layout

* Centered or slight split
* Vertical stack on mobile
* Max width constrained

---

### Background

* Gradient (light or dark)
* Pattern applied

---

---

## 3.3 About (Mission)

### Purpose

* Explain who you are
* Clarify approach

---

### Content

* Short paragraph (not biography)
* Focus on:

  * Thinking
  * Process
  * Value

---

### Layout

* Centered text block
  OR
* Split (text + visual)

---

### Background

* Opposite of Hero (if Hero is dark → this is light)

---

---

## 3.4 Services

### Purpose

* Show what you offer
* Define scope clearly

---

### Content

3 core services:

* Design
* Development
* Branding (or similar)

Each includes:

* Title
* Short description

---

### Layout

* Grid (3 columns desktop)
* Stack on mobile

---

### Background

* Light gradient

---

---

## 3.5 Selected Work

### Purpose

* Show capability through real work

---

### Content

3 projects:

* Title
* Short description
* Optional tag/category
* CTA (view project)

---

### Layout

* Grid (cards)
* Consistent card structure

---

### Background

* Dark gradient (contrast section)

---

---

## 3.6 Process

### Purpose

* Show how you think and work

---

### Content

3–4 steps:

* Discover
* Design
* Build
* Deliver

Each includes:

* Title
* One-line explanation

---

### Layout

* Horizontal grid
* Or vertical stack (mobile)

---

### Background

* Light gradient

---

---

## 3.7 Proof (Optional)

### Purpose

* Build trust

---

### Content

* 1–2 testimonials
  OR
* Metrics
  OR
* Client logos

---

### Layout

* Centered
* Minimal

---

### Background

* Dark gradient

---

---

## 3.8 CTA (Call to Action)

### Purpose

* Drive conversion

---

### Content

* Strong statement
* One button

---

### Layout

* Centered
* Focused

---

### Background

* Brand gradient (controlled usage)
* Pattern applied

---

---

## 3.9 Contact

### Purpose

* Capture leads

---

### Content

Form fields:

* Name
* Email
* Message

---

### Layout

* Centered form
* Clean spacing

---

### Background

* Light gradient

---

---

## 3.10 Footer

### Purpose

* Close the page
* Provide secondary info

---

### Content

* Name / logo
* Links (optional)
* Socials (optional)
* Copyright

---

### Layout

* Simple horizontal or stacked

---

### Background

* Dark gradient or solid dark surface

---

# 4. Flow Logic (Important)

The page must feel like:

1. Clarity → (Hero)
2. Context → (About)
3. Offer → (Services)
4. Proof of ability → (Work)
5. Trust → (Process + Proof)
6. Conversion → (CTA + Contact)

---

# 5. Restrictions

* No random section order
* No new sections without purpose
* No layout improvisation during coding
* No mixing layout types inside a section
* No breaking spacing system

---

This document defines the structure of the entire portfolio.
All layout decisions must follow this system.
