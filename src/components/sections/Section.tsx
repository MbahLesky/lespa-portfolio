import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "light" | "dark" | "brand";
    spacing?: "small" | "medium" | "large" | "none";
    children: React.ReactNode;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
    ({ className, variant, spacing = "medium", children, ...props }, ref) => {
        // Base styles
        const baseStyles = "relative w-full overflow-hidden";

        // Gradient modes
        const modeStyles = {
            light: "bg-gradient-light text-primary",
            dark: "bg-gradient-dark text-accentSecondary",
            brand: "bg-gradient-brand text-accentSecondary",
        };

        const spacingStyles = {
            small: "py-8",
            medium: "py-16",
            large: "py-24",
            none: "py-0",
        };

        const activeModeStyle = variant ? modeStyles[variant] : "";
        const activeSpacingStyle = spacingStyles[spacing];

        return (
            <section
                ref={ref}
                className={cn(baseStyles, activeModeStyle, activeSpacingStyle, className)}
                {...props}
            >
                {/* Pattern Underlay */}
                {variant === 'light' && <div className="absolute inset-0 bg-pattern-light pointer-events-none z-0" />}
                {variant === 'dark' && <div className="absolute inset-0 bg-pattern-dark pointer-events-none z-0" />}
                {variant === 'brand' && <div className="absolute inset-0 bg-pattern-dark pointer-events-none z-0" />}

                {/* Content Container */}
                <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8">
                    {children}
                </div>
            </section>
        );
    }
);

Section.displayName = "Section";
