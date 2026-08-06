/**
 * Fades page content in on every navigation.
 *
 * A template remounts per route, unlike a layout, which is what makes this fire
 * on navigation rather than once. Fade only — no slide, no wipe, no curtain.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
