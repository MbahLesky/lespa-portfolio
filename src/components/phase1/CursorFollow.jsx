"use client";

import { useEffect, useRef } from "react";

/**
 * The cursor-follow effect: a ring that trails the pointer, site-wide.
 *
 * A ring drawn in CSS rather than an image. The asset list marks a cursor
 * graphic as optional and only needed "if the cursor-follow effect uses a
 * shape/icon rather than a pure CSS/canvas dot or ring" — this is the ring, so
 * no asset is required.
 *
 * Pointer-only. A touch screen has no cursor to follow, and a reader who has
 * asked for less motion should not be given a second thing that moves.
 * Positioned straight onto the element in a rAF rather than through React
 * state, so pointer movement never queues a render.
 */
export function CursorFollow() {
  const ring = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || still.matches) return;

    const el = ring.current;
    if (!el) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let toX = x;
    let toY = y;
    let frame = 0;
    let shown = false;

    const draw = () => {
      // Ease toward the pointer rather than tracking it exactly: the lag is
      // what reads as follow rather than as a second cursor.
      x += (toX - x) * 0.18;
      y += (toY - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(draw);
    };

    const onMove = (event) => {
      toX = event.clientX;
      toY = event.clientY;
      if (!shown) {
        shown = true;
        el.dataset.visible = "true";
      }
    };

    // Grows over anything that can be clicked, so the ring doubles as an
    // affordance instead of only decoration.
    const interactive = "a, button, [role='button'], input, textarea, select";
    const onOver = (event) => {
      el.dataset.over = event.target.closest?.(interactive) ? "true" : "false";
    };

    const onLeave = () => {
      shown = false;
      el.dataset.visible = "false";
    };

    frame = requestAnimationFrame(draw);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ring} className="cursor-ring" aria-hidden="true" />;
}
