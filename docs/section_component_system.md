# Section Component System

This defines the reusable Section component responsible for:

* Gradient background
* Pattern overlay
* Spacing
* Layout consistency

No section should implement these manually.

---

# 1. Purpose

The Section component ensures:

* Consistent spacing
* Proper background handling (gradient + pattern)
* Clean layering
* No duplicated logic

---

# 2. Responsibilities

Each Section must handle:

* Background (light or dark gradient)
* Pattern overlay (correct asset + 50% opacity)
* Content container
* Vertical spacing

---

# 3. API Design

## Props

```ts
type SectionProps = {
  children: React.ReactNode
  variant?: "light" | "dark"
  size?: "sm" | "md" | "lg"
  className?: string
}
```

---

# 4. Spacing Control

```ts
const spacing = {
  sm: "py-12",
  md: "py-16",
  lg: "py-20",
}
```

Default: `md`

---

# 5. Gradient Mapping

```ts
const gradients = {
  light: "bg-gradient-light",
  dark: "bg-gradient-dark",
}
```

---

# 6. Pattern Mapping

```ts
const patterns = {
  light: "bg-[url('/assets/pattern/pattern-light.svg')]",
  dark: "bg-[url('/assets/pattern/pattern-dark.svg')]",
}
```

---

# 7. Implementation

```tsx
import { cn } from "@/lib/utils"

export function Section({
  children,
  variant = "light",
  size = "md",
  className,
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        gradients[variant],
        spacing[size],
        className
      )}
    >
      {/* Pattern Layer */}
      <div
        className={cn(
          "absolute inset-0 opacity-50 pointer-events-none",
          patterns[variant]
        )}
      />

      {/* Content Layer */}
      <div className="relative z-10 container max-w-[1200px]">
        {children}
      </div>
    </section>
  )
}
```

---

# 8. Usage Examples

## Light Section

```tsx
<Section variant="light">
  <h2>About</h2>
</Section>
```

---

## Dark Section

```tsx
<Section variant="dark">
  <h2>Selected Work</h2>
</Section>
```

---

## Large Section

```tsx
<Section variant="dark" size="lg">
  <Hero />
</Section>
```

---

# 9. Rules

* NEVER apply gradients outside this component
* NEVER manually add pattern in pages
* NEVER override spacing randomly
* ALWAYS use Section for layout blocks

---

# 10. Common Mistakes (Avoid)

❌ Applying pattern directly in page
❌ Using inline background styles
❌ Forgetting z-index layering
❌ Mixing multiple background systems

---

# 11. Extension (Optional Later)

Only extend if needed:

* `noPattern` → for rare cases
* `fullWidth` → for edge-to-edge sections

Do NOT add prematurely.

---

# 12. Mental Model

Section = environment
Components = content

Do not mix responsibilities.

---

This component is the backbone of your layout system.

If this is clean, everything else becomes easier.
