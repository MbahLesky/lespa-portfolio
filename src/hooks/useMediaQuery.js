"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/**
 * Reads a media query as external state.
 *
 * useSyncExternalStore rather than an effect: the value is correct on the first
 * client render instead of arriving a frame later, and there is no state write
 * during render to cascade from. The server snapshot is always false, so the
 * server and the first client render agree and anything gated on this must be
 * safe to be briefly wrong during hydration.
 */
export function useMediaQuery(query) {
  const list = useMemo(
    () => (typeof window === "undefined" ? null : window.matchMedia(query)),
    [query],
  );

  const subscribe = useCallback(
    (onChange) => {
      if (!list) return () => {};

      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [list],
  );

  return useSyncExternalStore(
    subscribe,
    () => (list ? list.matches : false),
    () => false,
  );
}
