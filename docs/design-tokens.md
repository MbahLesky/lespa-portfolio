# Design Tokens Mapping

This document defines how the Core Visual Identity maps directly to Tailwind and implementation.

No visual value should be used in code unless it is defined here.

---

# 1. Token Strategy

All design values are implemented as:

* CSS Variables → defined in `globals.css`
* Tailwind Tokens → mapped in `tailwind.config.ts`
* Utility Classes → used in components

---

# 2. Color Tokens

## 2.1 CSS Variables

### Light Mode (:root)

```css
:root {
  --color-bg: #FAFBF9;
  --color-surface: #FFFFFF;
  --color-border: #E4EAE6;

  --color-text-primary: #1A1F1C;
  --color-text-secondary: #5E6B63;

  --color-primary: #0D6D2B;
  --color-primary-deep: #075520;
}
```

---

### Dark Mode (.dark)

```css
.dark {
  --color-bg: #0E1110;
  --color-surface: #141A17;
  --color-surface-elevated: #1A221F;
  --color-border: #222B27;

  --color-text-primary: #E7ECE9;
  --color-text-secondary: #9AA5A0;

  --color-primary: #2FA86A; /* replaces brand green */
}
```

---

## 2.2 Tailwind Mapping

```ts
colors: {
  background: "var(--color-bg)",
  surface: "var(--color-surface)",
  border: "var(--color-border)",

  text: {
    primary: "var(--color-text-primary)",
    secondary: "var(--color-text-secondary)",
  },

  primary: "var(--color-primary)",
  "primary-deep": "var(--color-primary-deep)",
}
```

---

## 2.3 Usage Rules

Correct:

```tsx
bg-background
text-text-primary
border-border
bg-primary
```

Wrong:

```tsx
bg-[#0D6D2B]
text-white
```

---

# 3. Typography Tokens

## 3.1 Font Families

```ts
fontFamily: {
  heading: ["Saira", "sans-serif"],
  body: ["IBM Plex Sans", "sans-serif"],
}
```

---

## 3.2 Font Sizes

```ts
fontSize: {
  h1: ["4rem", { lineHeight: "1.1" }],
  h2: ["2rem", { lineHeight: "1.2" }],
  h3: ["1.5rem", { lineHeight: "1.3" }],

  "body-lg": ["1.125rem", { lineHeight: "1.6" }],
  body: ["1rem", { lineHeight: "1.6" }],
  caption: ["0.875rem", { lineHeight: "1.4" }],
}
```

---

## 3.3 Usage

```tsx
<h1 className="font-heading text-h1">...</h1>
<p className="font-body text-body">...</p>
```

---

# 4. Spacing Tokens

## 4.1 Scale (8px grid)

| Token | Value |
| ----- | ----- |
| 1     | 4px   |
| 2     | 8px   |
| 4     | 16px  |
| 6     | 24px  |
| 8     | 32px  |
| 10    | 40px  |
| 12    | 48px  |
| 16    | 64px  |
| 20    | 80px  |
| 30    | 120px |

---

## 4.2 Tailwind Usage

```tsx
p-6     // 24px
py-16   // 64px
gap-8   // 32px
```

---

## 4.3 Rules

* No arbitrary values (`p-[22px]` ❌)
* Always use scale values
* Maintain consistent vertical rhythm

---

# 5. Container & Layout Tokens

## 5.1 Container

```ts
container: {
  center: true,
  padding: {
    DEFAULT: "1rem",   // 16px
    md: "1.5rem",      // 24px
  },
}
```

---

## 5.2 Max Width

```tsx
max-w-[1200px]
```

---

## 5.3 Grid

* Desktop → 12 columns
* Tablet → 8 columns
* Mobile → 4 columns

---

# 6. Gradient Tokens

## 6.1 Light Gradient

```css
--gradient-light: linear-gradient(
  to bottom,
  #FAFBF9,
  #EDE7DB
);
```

---

## 6.2 Dark Gradient

```css
--gradient-dark: linear-gradient(
  135deg,
  #0E1110,
  #141A17
);
```

---

## 6.3 Tailwind Utility

```ts
backgroundImage: {
  "gradient-light": "var(--gradient-light)",
  "gradient-dark": "var(--gradient-dark)",
}
```

---

## 6.4 Usage

```tsx
bg-gradient-light
bg-gradient-dark
```

---

# 7. Pattern Tokens

## 7.1 Assets

```
/public/assets/pattern-light.svg
/public/assets/pattern-dark.svg
```

---

## 7.2 Utility Classes

```css
.bg-pattern-light {
  background-image: url('/assets/pattern-light.svg');
  opacity: 0.5;
}

.bg-pattern-dark {
  background-image: url('/assets/pattern-dark.svg');
  opacity: 0.5;
}
```

---

## 7.3 Implementation Rule

Pattern must NOT be applied directly on content container.

Correct structure:

```tsx
<div className="relative bg-gradient-dark">
  <div className="absolute inset-0 bg-pattern-dark opacity-50" />
  <div className="relative z-10">
    Content
  </div>
</div>
```

---

# 8. Border Radius

```ts
borderRadius: {
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
}
```

---

# 9. Motion Tokens

Used with Framer Motion:

* Duration: 0.4–0.6s
* Ease: easeOut
* Translate Y: 10–20px

---

# 10. Component Mapping Rules

## Buttons

```tsx
bg-primary text-white
hover:bg-primary-deep
```

---

## Cards

```tsx
bg-surface border border-border
```

---

## Sections

```tsx
bg-gradient-light
bg-gradient-dark
```

---

# 11. Non-Negotiables

* No hex values in JSX
* No inline styles for colors or spacing
* No arbitrary Tailwind values
* No visual values outside this mapping
* Dark mode must rely only on variables

---

This document ensures that design decisions translate directly into consistent, enforceable code.
