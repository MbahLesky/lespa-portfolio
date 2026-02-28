import type { Config } from "tailwindcss";

export default {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    'var(--font-ibm)',
                    'system-ui',
                    'sans-serif'
                ],
                heading: [
                    'var(--font-saira)',
                    'system-ui',
                    'sans-serif'
                ]
            },
            colors: {
                primaryLight: 'var(--color-primary-light)',
                primary: 'var(--color-primary)',
                primaryDark: 'var(--color-primary-dark)',
                primarySoft: 'var(--color-primary-soft)',
                primaryMuted: 'var(--color-primary-muted)',
                background: 'var(--color-background)',
                surface: 'var(--color-surface)',
                border: 'var(--color-border)',
                textPrimary: 'var(--color-text-primary)',
                textSecondary: 'var(--color-text-secondary)',
                textMuted: 'var(--color-text-muted)',
                accentSecondary: 'var(--color-accent-secondary)',
            },
            fontSize: {
                h1: '48px',
                h2: '40px',
                h3: '32px',
                h4: '28px',
                h5: '20px',
                h6: '16px',
                'body-large': '18px',
                body: '16px',
                'body-small': '14px',
                'body-tiny': '12px'
            },
            lineHeight: {
                h1: '1.2',
                h2: '1.2',
                h3: '1.2',
                h4: '1.35',
                h5: '1.35',
                h6: '1.35',
                'body-large': '27px',
                body: '24px',
                'body-small': '21px',
                'body-tiny': '18px'
            },
            letterSpacing: {
                h1: '-0.02em',
                h2: '-0.02em',
                h3: '-0.02em',
                h4: '-0.01em',
                h5: '-0.01em',
                h6: '-0.01em',
                'body-large': '0.02em',
                body: '0.02em',
                'body-small': '0.05em',
                'body-tiny': '0.05em'
            },
            spacing: {
                '4': '4px',
                '8': '8px',
                '16': '16px',
                '24': '24px',
                '32': '32px',
                '40': '40px',
                '48': '48px',
                '64': '64px',
                '80': '80px',
                '96': '96px',
                '120': '120px'
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '16px',
                    sm: '24px',
                    md: '32px',
                    lg: '40px',
                    xl: '48px'
                }
            },
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px'
            }
        }
    },
    plugins: [],
} satisfies Config;
