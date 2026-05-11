import { cn } from "@/lib/utils"

type SectionProps = {
  children: React.ReactNode
  variant?: "light" | "dark" | "white" | "black"
  size?: "sm" | "md" | "lg"
  className?: string
}

const spacing = {
  sm: "py-12",
  md: "py-16",
  lg: "py-20",
}

const gradients = {
  light: "bg-gradient-light",
  dark: "bg-gradient-dark",
  white: "bg-section-white",
  black: "bg-section-black",
}

const patterns = {
  light: "bg-pattern-light",
  dark: "bg-pattern-dark",
  white: "bg-pattern-light",
  black: "bg-pattern-dark",
}

const themes = {
  light: "theme-light",
  dark: "theme-dark",
  white: "theme-light",
  black: "theme-dark",
}

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
        themes[variant],
        gradients[variant],
        spacing[size],
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-50",
          patterns[variant]
        )}
      />
      <div className="container relative z-10 max-w-[1200px]">{children}</div>
    </section>
  )
}
