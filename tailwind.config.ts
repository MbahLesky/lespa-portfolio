import type { Config } from "tailwindcss";

/**
 * LESPA — tailwind.config.ts
 * Every value maps to a CSS variable in globals.css.
 * No hex literals here or in any component.
 */

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light:  "var(--brand-light)",
          DEFAULT:"var(--brand)",
          dark:   "var(--brand-dark)",
          soft:   "var(--brand-soft)",
          muted:  "var(--brand-muted)",
          accent: "var(--brand-accent)",
        },
        background: "var(--background)",
        surface:    "var(--surface)",
        border:     "var(--border)",
        warm:       "var(--accent-warm)",
        content: {
          DEFAULT:   "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },
        action: {
          DEFAULT: "var(--action)",
          hover:   "var(--action-hover)",
          active:  "var(--action-active)",
          fg:      "var(--action-fg)",
        },
      },

      backgroundImage: {
        "gradient-brand-deep": "var(--gradient-brand-deep)",
        "gradient-brand-lift": "var(--gradient-brand-lift)",
        "gradient-surface":    "var(--gradient-surface)",
        "gradient-warm":       "var(--gradient-warm)",
        "pattern":             "var(--pattern-url)",
      },

      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"], // Saira
        body:    ["var(--font-body)", "system-ui", "sans-serif"],    // IBM Plex Sans
      },

      /* [size, { lineHeight, letterSpacing, fontWeight }]
         Letter-spacing decoded from CORE VISUAL percentages:
         -2 → -0.02em · -1 → -0.01em · 2 → 0.02em · 5 → 0.05em      */
      fontSize: {
        h1: ["3rem",    { lineHeight: "1.2",  letterSpacing: "-0.02em", fontWeight: "500" }], // 48
        h2: ["2.5rem",  { lineHeight: "1.2",  letterSpacing: "-0.02em", fontWeight: "600" }], // 40 SemiBold (not ExtraBold)
        h3: ["2rem",    { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "400" }], // 32
        h4: ["1.75rem", { lineHeight: "1.3",  letterSpacing: "-0.01em", fontWeight: "500" }], // 28
        h5: ["1.25rem", { lineHeight: "1.3",  letterSpacing: "-0.01em", fontWeight: "400" }], // 20
        h6: ["1rem",    { lineHeight: "1.4",  letterSpacing: "-0.01em", fontWeight: "500" }], // 16

        "h1-m": ["2.5rem",  { lineHeight: "1.2",  letterSpacing: "-0.02em", fontWeight: "500" }],
        "h2-m": ["2rem",    { lineHeight: "1.2",  letterSpacing: "-0.02em", fontWeight: "600" }],
        "h3-m": ["1.75rem", { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "400" }],
        "h4-m": ["1.5rem",  { lineHeight: "1.3",  letterSpacing: "-0.01em", fontWeight: "500" }],

        /* Body — Regular 400, not Light. Light is too fragile on dark. */
        "body-lg": ["1.125rem", { lineHeight: "1.6", letterSpacing: "0.02em", fontWeight: "400" }],
        "body":    ["1rem",     { lineHeight: "1.6", letterSpacing: "0.02em", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0.05em", fontWeight: "500" }],
        "caption": ["0.75rem",  { lineHeight: "1.5", letterSpacing: "0.05em", fontWeight: "400" }],
      },

      /* 8px grid. 4 is micro-adjustment only. */
      spacing: {
        "1":  "0.25rem",  //   4
        "2":  "0.5rem",   //   8
        "4":  "1rem",     //  16
        "6":  "1.5rem",   //  24
        "8":  "2rem",     //  32
        "10": "2.5rem",   //  40
        "12": "3rem",     //  48
        "16": "4rem",     //  64
        "20": "5rem",     //  80
        "24": "6rem",     //  96
        "30": "7.5rem",   // 120
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
        fast:    "150ms",
        DEFAULT: "250ms",
        slow:    "400ms",
        reveal:  "350ms",
        section: "600ms",
      },

      transitionTimingFunction: {
        out:    "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.65, 0, 0.35, 1)",
      },

      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },

      keyframes: {
        "word-out": {
          "0%":   { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-8px)" },
        },
        "word-in": {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-down": {
          "0%, 100%": { opacity: "0.3", transform: "translateY(0)" },
          "50%":      { opacity: "1",   transform: "translateY(6px)" },
        },
      },

      animation: {
        "word-out":   "word-out 200ms cubic-bezier(0.65, 0, 0.35, 1) forwards",
        "word-in":    "word-in 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-down": "pulse-down 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
