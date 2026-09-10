"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // The digest is the only handle on the server-side cause once this reaches a
    // real visitor, so it belongs in the log.
    console.error("Unhandled error", error.digest ?? error);
  }, [error]);

  return (
    <main id="main" className="flex min-h-screen items-center bg-gradient-dark-surface">
      <div className="mx-auto flex max-w-content flex-col gap-8 px-6 md:px-8">
        <p className="text-caption uppercase tracking-eyebrow text-accent">Error</p>
        <h1 className="max-w-reading text-h2-m text-content md:text-h2">
          Something broke on my end.
        </h1>
        <button
          type="button"
          onClick={reset}
          className="inline-flex w-fit items-center rounded-md bg-action px-8 py-4 text-body-sm uppercase tracking-label text-action-fg transition-colors duration-fast hover:bg-action-hover"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
