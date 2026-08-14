/**
 * Runs synchronously in the document head, before the first paint.
 *
 * It decides whether the opening sequence runs. The entrance cues are set by
 * the sequence itself, which is the only thing that knows how long the typing
 * takes; this just marks the page as held so nothing enters underneath it.
 *
 * Deciding this from a mounted component instead produced a visible flash of
 * the page before the overlay appeared. Every path ends with a decision, so
 * content is never left waiting on a branch that threw.
 */
export const introScript = `(function(){
  var d = document.documentElement;
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (sessionStorage.getItem('lespa:intro') === '1') return;
    sessionStorage.setItem('lespa:intro', '1');
    d.classList.add('intro-active');
    d.style.setProperty('--enter-delay', '99999ms');
    d.style.setProperty('--enter-rest', '99999ms');
  } catch (e) {
    d.classList.remove('intro-active');
  }
})();`;
