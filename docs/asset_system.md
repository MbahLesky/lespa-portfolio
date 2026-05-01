# Asset System

This document defines how all brand assets are structured and used in the project.

All assets must follow this system. No random imports or scattered files.

---

# 1. Folder Structure

```id="a1x9k2"
/public/assets/
  ├── logo/
  │   ├── wordmark-light.svg
  │   ├── wordmark-dark.svg
  │
  ├── icon/
  │   ├── icon-light.svg
  │   ├── icon-dark.svg
  │
  ├── cursor/   
  │   ├── cursor-light.svg   
  │   ├── cursor-dark.svg  
  │
  ├── pattern/
  │   ├── pattern-light.svg
  │   └── pattern-dark.svg
```

---

# 2. Naming Rules

* Use lowercase
* Use hyphens (`-`)
* No spaces
* No version numbers (`final-v2.svg` ❌)

---

# 3. Logo System

## Wordmark

Used for:

* Navbar
* Footer

---

## Rules

* Light version → used on dark backgrounds
* Dark version → used on light backgrounds

---

## Usage Example

```tsx
<Image src="/assets/logo/wordmark-light.svg" alt="Logo" />
```

---

# 4. Icon / Symbol

## Purpose

* Favicon
* Small UI placements
* Brand mark

---

## Rules

* Must be readable at small sizes
* Must work in both themes

---

# 5. Custom Cursor

## Asset

```id="c9l0pz"
/assets/cursor/cursor.svg
```

---

## Rules

* Keep it simple (no detail-heavy SVG)
* Should not affect usability
* Optional enhancement — must degrade gracefully

---

## Implementation (Global CSS)

```css
body {
  cursor: url('/assets/cursor/cursor-light.svg'), auto;
}
```

---

# 6. Pattern System

## Assets

```id="p4d8rs"
/assets/pattern/pattern-light.svg
/assets/pattern/pattern-dark.svg
```

---

## Rules

* Pattern uses **surface color**
* Opacity: **50%**
* Used ONLY on gradient backgrounds

---

## Implementation Pattern

```tsx
<div className="relative bg-gradient-dark">
  <div className="absolute inset-0 opacity-50 bg-[url('/assets/pattern/pattern-dark.svg')]" />
  <div className="relative z-10">
    Content
  </div>
</div>
```

---

# 7. Theme Awareness

Assets must adapt to theme:

| Asset Type | Light Mode    | Dark Mode     |
| ---------- | ------------- | ------------- |
| Logo       | Dark version  | Light version |
| Icon       | Dark version  | Light version |
| Pattern    | Light pattern | Dark pattern  |

---

# 8. Optimization Rules

* Use SVG wherever possible
* Keep file size low
* Remove unnecessary metadata
* Ensure clean viewBox

---

# 9. Access Strategy

Do NOT import assets manually everywhere.

Create a helper if needed:

```ts
export const assets = {
  logo: {
    light: "/assets/logo/wordmark-light.svg",
    dark: "/assets/logo/wordmark-dark.svg",
  },
  pattern: {
    light: "/assets/pattern/pattern-light.svg",
    dark: "/assets/pattern/pattern-dark.svg",
  },
};
```

---

# 10. Non-Negotiables

* No inline SVG dumping in components (unless necessary)
* No duplicate assets
* No inconsistent naming
* No mixing raster formats (png/jpg) unless required

---

Assets are part of the system, not decoration.

If an asset doesn’t fit the system, it doesn’t get used.
