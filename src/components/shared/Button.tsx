import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { Button as ShadcnButton, buttonVariants } from "@/components/ui/button";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        return (
            <ShadcnButton
                ref={ref}
                variant={variant}
                size={size}
                asChild={asChild}
                className={className}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
