"use client";

import Link from "next/link";

import { useSound } from "@/components/shared/SoundProvider";

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
  const { play } = useSound();

  const classes = cn(
    "btn-base",
    TYPE_CLASS,
    VARIANT_CLASS[variant],
    icon && "btn-icon",
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const { href, onMouseEnter, onClick, ...rest } = props as ButtonAsLink;
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");

    // Compose rather than spread-over: a caller's own handler must still run,
    // and spreading it after ours would silently replace the sound trigger.
    const handlers = {
      onMouseEnter: (event: React.MouseEvent<HTMLAnchorElement>) => {
        play("buttonHover");
        onMouseEnter?.(event);
      },
      onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
        play("buttonClick");
        onClick?.(event);
      },
    };

    if (isExternal) {
      return (
        <a href={href} className={classes} {...rest} {...handlers}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest} {...handlers}>
        {children}
      </Link>
    );
  }

  const {
    type = "button",
    onMouseEnter,
    onClick,
    ...rest
  } = props as ButtonAsButton;

  return (
    <button
      type={type}
      className={classes}
      {...rest}
      onMouseEnter={(event) => {
        play("buttonHover");
        onMouseEnter?.(event);
      }}
      onClick={(event) => {
        play("buttonClick");
        onClick?.(event);
      }}
    >
      {children}
    </button>
  );
}
