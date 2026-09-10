import Link from "next/link";

export const metadata = {
  title: "Page not found | Lespa",
  robots: { index: false, follow: true },
};

/**
 * Phase 1 is one page, so there is nowhere to send someone but back to it.
 */
export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen items-center bg-gradient-dark-surface">
      <div className="mx-auto flex max-w-content flex-col gap-8 px-6 md:px-8">
        <p className="text-caption uppercase tracking-eyebrow text-accent">404</p>
        <h1 className="max-w-reading text-h2-m text-content md:text-h2">
          That page isn&apos;t here.
        </h1>
        <Link
          href="/"
          className="inline-flex w-fit items-center rounded-md bg-action px-8 py-4 text-body-sm uppercase tracking-label text-action-fg transition-colors duration-fast hover:bg-action-hover"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
