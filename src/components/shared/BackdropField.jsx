"use client";

import { useEffect, useRef } from "react";

import { useFinePointer } from "@/hooks/useFinePointer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * The pointer-reactive light in the page gradient (Ewan Kerboas reference).
 *
 * A fixed radial wash that follows the cursor across the whole page and swells
 * while the pointer is held down and dragged, so dragging visibly works the
 * background rather than doing nothing.
 *
 * Written straight to CSS custom properties on the element instead of React
 * state: this updates every pointer frame, and re-rendering the tree at that
 * rate would be wasteful. The easing is a lerp on rAF, so the light trails the
 * cursor rather than snapping to it.
 *
 * Absent for touch pointers and for reduced motion.
 */
export function BackdropField() {
  const fieldRef = useRef(null);
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const enabled = finePointer && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;

    const field = fieldRef.current;
    if (!field) return;

    // Start centred so the light does not fly in from a corner.
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { ...target };
    let intensity = 0;
    let targetIntensity = 0;
    let frame;

    const onMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
    };

    // Dragging swells the light; releasing lets it settle back.
    const onDown = () => {
      targetIntensity = 1;
    };
    const onUp = () => {
      targetIntensity = 0;
    };

    const render = () => {
      eased.x += (target.x - eased.x) * 0.08;
      eased.y += (target.y - eased.y) * 0.08;
      intensity += (targetIntensity - intensity) * 0.06;

      field.style.setProperty("--pointer-x", `${eased.x}px`);
      field.style.setProperty("--pointer-y", `${eased.y}px`);
      field.style.setProperty("--pointer-intensity", intensity.toFixed(3));

      frame = window.requestAnimationFrame(render);
    };

    frame = window.requestAnimationFrame(render);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={fieldRef} aria-hidden="true" className="pointer-field" />;
}
