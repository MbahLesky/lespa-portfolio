"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";

import { useSoundPreference } from "@/hooks/useSoundPreference";
import { soundEngine, type SoundName } from "@/lib/sound-engine";

interface SoundContextValue {
  isAvailable: boolean;
  enabled: boolean;
  toggle: () => void;
  play: (name: SoundName) => void;
}

const SoundContext = createContext<SoundContextValue>({
  isAvailable: false,
  enabled: false,
  toggle: () => {},
  play: () => {},
});

/**
 * Owns the sound preference and the engine behind it.
 *
 * The engine is only ever prepared in response to the toggle, so nothing is
 * built or decoded for the overwhelming majority of visitors who never turn
 * sound on — and an AudioContext created outside a user gesture would start
 * suspended anyway.
 */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const { isAvailable, enabled, toggle } = useSoundPreference();

  useEffect(() => {
    if (enabled) {
      void soundEngine.prepare();
    } else {
      void soundEngine.suspend();
    }
  }, [enabled]);

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled) return;
      soundEngine.play(name);
    },
    [enabled],
  );

  const value = useMemo(
    () => ({ isAvailable, enabled, toggle, play }),
    [isAvailable, enabled, toggle, play],
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  return useContext(SoundContext);
}
