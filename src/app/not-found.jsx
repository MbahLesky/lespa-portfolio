import Link from "next/link";

/**
 * Phase 1 is a single page, so there is nowhere to route to but back to it.
 */
export default function NotFound() {
  return (
    <main id="main" className="section-pad has-pattern">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-start gap-8 px-6">
        <h1 className="section-heading">This page doesn&rsquo;t exist</h1>
        <p className="body-copy">
          The link may be out of date. Everything lives on one page now.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to the start
        </Link>
      </div>
    </main>
  );
}
