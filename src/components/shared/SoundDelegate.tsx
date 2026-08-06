"use client";

import { useEffect } from "react";

import { useSound } from "@/components/shared/SoundProvider";

/**
 * Plays the hover and click sounds from a single pair of document listeners.
 *
 * The alternative — a handler on every button and card — forced Button to be a
 * client component, which pulled the sound layer into every page that renders
 * so much as a link. Delegation keeps Button (and anything else that only
 * wanted a sound) on the server.
 *
 * pointerover rather than mouseover so it is one event source across input
 * types; the engine ignores everything anyway unless sound is switched on,
 * which it is not for touch users.
 */
export function SoundDelegate() {
  const { enabled, play } = useSound();

  useEffect(() => {
    if (!enabled) return;

    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest) return;
      if (target.closest(".btn-base")) play("buttonHover");
      else if (target.closest(".project-card")) play("cardHover");
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest?.(".btn-base")) play("buttonClick");
    };

    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("click", onClick, { passive: true });
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("click", onClick);
    };
  }, [enabled, play]);

  return null;
}
