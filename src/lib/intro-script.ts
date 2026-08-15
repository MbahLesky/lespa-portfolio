import { HOLD_REST_CLASS, HOLD_REST_MAX_MS } from "@/lib/intro-timeline";

/**
 * Runs synchronously in the document head, before the first paint.
 *
 * It decides whether the opening sequence runs, and holds the page below the
 * headline at the first frame of its entrance until the hero has finished. The
 * sequence itself lifts that hold, because it is the only thing that knows when
 * the typing ends.
 *
 * Deciding this from a mounted component instead produced a visible flash of
 * the page before the overlay appeared. Every path ends with a decision, so
 * content is never left waiting on a branch that threw — and the hold lifts on
 * a timer regardless, so a failure anywhere downstream cannot leave the page
 * permanently blank.
 */
export const introScript = `(function(){
  var d = document.documentElement;
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (sessionStorage.getItem('lespa:intro') === '1') return;
    sessionStorage.setItem('lespa:intro', '1');
    d.classList.add('intro-active');
    d.classList.add('${HOLD_REST_CLASS}');
    setTimeout(function(){ d.classList.remove('${HOLD_REST_CLASS}'); }, ${HOLD_REST_MAX_MS});
  } catch (e) {
    d.classList.remove('intro-active');
    d.classList.remove('${HOLD_REST_CLASS}');
  }
})();`;
