/**
 * A slot for an asset that has not been delivered yet.
 *
 * Deliberately reads as unfinished — no stock photography, no decorative
 * stand-in that could be mistaken for the real thing. It names the asset the
 * checklist is waiting on so the gap is visible in the page, not just in a
 * comment. Every use is paired with a "TODO: asset needed" note at the call site
 * referencing the item in /docs/lespa-restructure-assets.md.
 */
export function AssetPlaceholder({ label, note, className = "" }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border-strong bg-surface-veil p-6 text-center ${className}`}
    >
      <span className="text-caption uppercase tracking-eyebrow text-content-secondary">
        Asset pending
      </span>
      <span className="text-body-sm text-content">{label}</span>
      {note ? (
        <span className="max-w-reading text-caption text-content-secondary">{note}</span>
      ) : null}
    </div>
  );
}
