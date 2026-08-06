"use client";

import { useEffect, useState } from "react";

import { Text } from "@/components/shared/Text";

/**
 * The design system, rendered live from the real CSS variables.
 *
 * Every value on screen is read from the stylesheet at runtime rather than
 * typed in, so this cannot drift from the tokens the rest of the site uses —
 * which is the entire point of showing it. It also means the swatches re-read
 * themselves when the theme changes.
 */

const COLOR_TOKENS = [
  { name: "Brand", variable: "--brand" },
  { name: "Brand Light", variable: "--brand-light" },
  { name: "Brand Dark", variable: "--brand-dark" },
  { name: "Accent", variable: "--brand-accent" },
  { name: "Background", variable: "--background" },
  { name: "Surface", variable: "--surface" },
  { name: "Text Primary", variable: "--text-primary" },
  { name: "Text Muted", variable: "--text-secondary" },
] as const;

/** Hoisted so the identity is stable — it is an effect dependency below. */
const COLOR_VARIABLES = COLOR_TOKENS.map((token) => token.variable);

const TYPE_RAMP = [
  { name: "H1", className: "text-h1" },
  { name: "H2", className: "text-h2" },
  { name: "H3", className: "text-h3" },
  { name: "H4", className: "text-h4" },
  { name: "Body L", className: "text-body-lg" },
  { name: "Body", className: "text-body" },
  { name: "Small", className: "text-body-sm" },
  { name: "Caption", className: "text-caption" },
] as const;

/** The 8px grid. 4 is micro-adjustment only. */
const SPACING_STEPS = [4, 8, 16, 24, 32, 48, 64, 96, 120] as const;

/** Widest bar in the scale, used to normalise the others to a percentage. */
const SPACING_MAX = SPACING_STEPS[SPACING_STEPS.length - 1];

/** Browsers may hand back the 3-digit shorthand; show the full value. */
function expandHex(value: string) {
  const short = value.match(/^#([0-9A-F])([0-9A-F])([0-9A-F])$/i);
  return short ? `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}` : value;
}

function useTokenValues(variables: readonly string[]) {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const read = () => {
      const styles = getComputedStyle(document.documentElement);
      const next: Record<string, string> = {};
      for (const variable of variables) {
        next[variable] = expandHex(
          styles.getPropertyValue(variable).trim().toUpperCase(),
        );
      }
      setValues(next);
    };

    read();

    // next-themes swaps a class on <html>; re-read so the panel follows.
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    return () => observer.disconnect();
  }, [variables]);

  return values;
}

function ColorSwatches() {
  const values = useTokenValues(COLOR_VARIABLES);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {COLOR_TOKENS.map((token) => (
        <div key={token.variable} className="flex flex-col gap-2">
          <div
            className="elevated h-16 w-full rounded"
            style={{ backgroundColor: `var(${token.variable})` }}
          />
          <div className="flex flex-col">
            <Text size="caption" as="span">
              {token.name}
            </Text>
            <Text size="caption" as="span" muted className="font-mono">
              {values[token.variable] || "—"}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
}

function TypeRamp() {
  const [sizes, setSizes] = useState<Record<string, string>>({});

  useEffect(() => {
    const next: Record<string, string> = {};
    for (const step of TYPE_RAMP) {
      const probe = document.createElement("span");
      probe.className = step.className;
      probe.style.position = "absolute";
      probe.style.visibility = "hidden";
      document.body.appendChild(probe);
      next[step.name] = `${Math.round(
        parseFloat(getComputedStyle(probe).fontSize),
      )}px`;
      probe.remove();
    }
    setSizes(next);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {TYPE_RAMP.map((step) => (
        <div key={step.name} className="flex items-baseline gap-4">
          <Text size="caption" as="span" muted className="w-16 shrink-0">
            {step.name} {sizes[step.name] ?? ""}
          </Text>
          <span
            className={`${step.className} truncate font-heading`}
            aria-hidden="true"
          >
            Systems, not one-offs
          </span>
        </div>
      ))}
    </div>
  );
}

function SpacingScale() {
  return (
    <div className="flex flex-col gap-2">
      {SPACING_STEPS.map((step) => (
        <div key={step} className="flex items-center gap-4">
          <Text size="caption" as="span" muted className="w-12 shrink-0">
            {step}px
          </Text>
          <span
            className="bg-gradient-brand-lift h-2 rounded-sm"
            style={{ width: `${(step / SPACING_MAX) * 100}%` }}
            aria-hidden="true"
          />
        </div>
      ))}
    </div>
  );
}

export function TokenDisplay() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <Text size="caption" muted className="uppercase">
          Colour
        </Text>
        <ColorSwatches />
      </div>

      <div className="flex flex-col gap-4">
        <Text size="caption" muted className="uppercase">
          Type scale
        </Text>
        <TypeRamp />
      </div>

      <div className="flex flex-col gap-4">
        <Text size="caption" muted className="uppercase">
          Spacing — 8px grid
        </Text>
        <SpacingScale />
      </div>
    </div>
  );
}
