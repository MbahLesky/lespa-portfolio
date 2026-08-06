"use client";

import { Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/shared/Button";
import { useSoundPreference } from "@/hooks/useSoundPreference";

/**
 * Sound on/off. Appears in the nav and the footer.
 *
 * Renders nothing at all on touch devices or under reduced motion, where sound
 * is disabled outright — a toggle for something that cannot happen is noise.
 */
export function SoundToggle() {
  const { isAvailable, enabled, toggle } = useSoundPreference();

  if (!isAvailable) return null;

  return (
    <Button
      variant="ghost"
      icon
      onClick={toggle}
      aria-label={enabled ? "Turn sound off" : "Turn sound on"}
      aria-pressed={enabled}
    >
      {enabled ? (
        <Volume2 className="h-5 w-5" aria-hidden="true" />
      ) : (
        <VolumeX className="h-5 w-5" aria-hidden="true" />
      )}
    </Button>
  );
}
