"use client";

import { useEffect } from "react";

/**
 * The error boundary. Logged rather than shown: a stack trace tells a visitor
 * nothing they can use.
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="section-pad has-pattern">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-start gap-8 px-6">
        <h1 className="section-heading">Something broke</h1>
        <p className="body-copy">
          That&rsquo;s on me, not you. Try again — and if it keeps happening,
          the contact form is the fastest way to tell me.
        </p>
        <button type="button" onClick={reset} className="btn btn-primary">
          Try again
        </button>
      </div>
    </main>
  );
}
