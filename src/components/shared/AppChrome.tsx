"use client";

import { BootScreen } from "@/components/shared/BootScreen";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";

/**
 * Client-side chrome that belongs to the whole app rather than any one page:
 * the first-visit loading transition and scroll restoration.
 */
export function AppChrome() {
  useScrollRestoration();
  return <BootScreen />;
}
