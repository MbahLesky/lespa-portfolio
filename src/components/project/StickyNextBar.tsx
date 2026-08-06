"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

import { Text } from "@/components/shared/Text";
import { cn } from "@/lib/utils";

/** Appears once the reader is this far down — not before. */
const APPEAR_AT = 0.8;

interface StickyNextBarProps {
  name: string;
  href: string;
}

/**
 * A slim invitation that slides up at 80% scroll.
 *
 * Deliberately dismissible: it sits over the outcomes section, which is the
 * part of the page most worth reading, so anyone who wants it gone can say so.
 */
export function StickyNextBar({ name, href }: StickyNextBarProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollable > 0 && window.scrollY / scrollable >= APPEAR_AT);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      className={cn("sticky-next", visible && "is-visible")}
      // Kept out of the tree until it is on screen, so it never interrupts the
      // tab order of content the reader is still working through.
      aria-hidden={!visible}
    >
      <Link href={href} className="sticky-next-link" tabIndex={visible ? 0 : -1}>
        <Text size="sm" as="span">
          Next: {name} →
        </Text>
      </Link>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="btn-base btn-ghost btn-icon"
        aria-label="Dismiss next project bar"
        tabIndex={visible ? 0 : -1}
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
