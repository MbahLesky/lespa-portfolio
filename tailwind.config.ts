import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "1.5rem",
      },
    },
    extend: {
      colors: {
        background: "var(--color-bg)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        input: "var(--color-border)",
        ring: "var(--color-primary)",
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
        },
        primary: "var(--color-primary)",
        "primary-deep": "var(--color-primary-deep)",
      },
      fontFamily: {
        heading: ["Saira", "sans-serif"],
        body: ["IBM Plex Sans", "sans-serif"],
      },
      fontSize: {
        h1: ["4rem", { lineHeight: "1.1" }],
        h2: ["2rem", { lineHeight: "1.2" }],
        h3: ["1.5rem", { lineHeight: "1.3" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.6" }],
        caption: ["0.875rem", { lineHeight: "1.4" }],
      },
      spacing: {
        30: "7.5rem",
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      backgroundImage: {
        "gradient-light": "var(--gradient-light)",
        "gradient-dark": "var(--gradient-dark)",
      },
    },
  },
  plugins: [],
}

export default config
