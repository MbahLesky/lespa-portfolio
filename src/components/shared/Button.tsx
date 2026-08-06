import Link from "next/link";

import { cn } from "@/lib/utils";
import type { ButtonVariant } from "@/types";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

/** 16px Medium with label tracking, per the button spec. */
const TYPE_CLASS = "font-body text-body font-medium tracking-wider";

interface BaseProps {
  variant?: ButtonVariant;
  /** Icon-only: collapses to a 44x44 square. Requires an accessible label. */
  icon?: boolean;
  className?: string;
  children?: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never;
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Buttons and button-styled links.
 *
 * Press feedback is scale 0.98 over 100ms and nothing else — no lift and no
 * shadow, both of which the brand rejects. Real <button> and <a> elements
 * throughout, so keyboard behaviour is the platform's rather than reimplemented.
 */
export function Button({
  variant = "primary",
  icon = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "btn-base",
    TYPE_CLASS,
    VARIANT_CLASS[variant],
    icon && "btn-icon",
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink;
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");

    if (isExternal) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
