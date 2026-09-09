import type { Config } from "tailwindcss";

/**
 * LESPA — tailwind.config.ts
 *
 * Build configuration, kept from the previous project. Every value maps to a
 * CSS variable declared in src/app/globals.css — no hex literals here and none
 * in any component.
 *
 * Phase 1 is dark only, so there is one palette and no `dark:` variants to
 * write. `darkMode: "class"` and the `.dark` class on <html> stay, so a later
 * light-mode phase has somewhere to land.
 */

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "var(--brand-light)",
          DEFAULT: "var(--brand)",
          dark: "var(--brand-dark)",
          soft: "var(--brand-soft)",
          muted: "var(--brand-muted)",
        },
        background: "var(--background)",
        surface: "var(--surface)",
        border: "var(--border)",
        accent: "var(--accent)",
        warm: "var(--color-accent-warm)",
        content: {
          DEFAULT: "var(--text-primary)",
          muted: "var(--text-muted)",
        },
        /* Per-project brand colour, set as a custom property on each work
           panel. A colour that changes per project cannot be a fixed token, so
           the token points at the property instead. */
        project: "var(--project)",
      },

      backgroundImage: {
        "gradient-dark": "var(--gradient-dark)",
        pattern: "var(--pattern-url)",
      },

      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"], // Saira
        body: ["var(--font-body)", "system-ui", "sans-serif"], // IBM Plex Sans
      },

      /* [size, { lineHeight, letterSpacing, fontWeight }]
         Letter-spacing decoded from the token doc's percentages:
         -2 → -0.02em · -1 → -0.01em · 2 → 0.02em · 5 → 0.05em      */
      fontSize: {
        h1: ["3rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "500" }], // 48
        h2: ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }], // 40
        h3: ["2rem", { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "400" }], // 32
        h4: ["1.75rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "500" }], // 28
        h5: ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "400" }], // 20
        h6: ["1rem", { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "500" }], // 16

        "body-lg": ["1.125rem", { lineHeight: "1.6", letterSpacing: "0.02em", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.6", letterSpacing: "0.02em", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0.05em", fontWeight: "500" }],
        caption: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.05em", fontWeight: "400" }],
      },

      maxWidth: {
        content: "var(--content-max)",
        reading: "var(--reading-max)",
      },

      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
      },

      transitionDuration: {
        fast: "150ms",
        DEFAULT: "250ms",
        slow: "400ms",
        section: "600ms",
      },

      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.65, 0, 0.35, 1)",
      },

      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
