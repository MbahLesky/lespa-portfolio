"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

import { Text } from "@/components/shared/Text";

/**
 * Click-to-copy email address, with the address itself still a mailto link for
 * anyone who would rather just open their mail client.
 */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context, denied permission). The mailto
      // link beside this is the fallback, so there is nothing to report.
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a href={`mailto:${email}`} className="link-underline text-body">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="btn-base btn-ghost btn-icon"
        aria-label={copied ? "Email address copied" : "Copy email address"}
      >
        {copied ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
      {/* Announced on change; the icon swap alone would be silent. */}
      <Text size="caption" muted as="span" aria-live="polite">
        {copied ? "Copied" : ""}
      </Text>
    </div>
  );
}
