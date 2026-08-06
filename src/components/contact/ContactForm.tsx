"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Check, Loader2 } from "lucide-react";

import { Button } from "@/components/shared/Button";
import { useSound } from "@/components/shared/SoundProvider";
import { Heading } from "@/components/shared/Heading";
import { Text } from "@/components/shared/Text";
import { site } from "@/content/copy";
import {
  BUDGET_RANGES,
  PROJECT_TYPES,
  contactSchema,
  type ContactValues,
} from "@/lib/contact-schema";

type Status = "idle" | "sending" | "sent" | "failed";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    // An icon alongside the text: colour is never the only signal.
    <p id={id} role="alert" className="field-error">
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="text-body-sm">{message}</span>
    </p>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const { play } = useSound();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    // On blur, never on keystroke — errors that appear mid-typing are hostile.
    mode: "onBlur",
  });

  const onSubmit = async (values: ContactValues) => {
    // Anything in the honeypot is a bot. Report success and discard.
    if (values.company) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("sent");
      play("formSuccess");
    } catch {
      // Every field stays populated so nothing has to be retyped.
      setStatus("failed");
    }
  };

  // Replace the form entirely rather than leaving an empty one under a banner.
  if (status === "sent") {
    return (
      <div className="elevated flex flex-col gap-4 rounded-md p-8" role="status">
        <span className="confirm-mark" aria-hidden="true">
          <Check className="h-5 w-5" />
        </span>
        <Heading as="h2" size="h4">
          Message sent.
        </Heading>
        <Text muted>I&apos;ll reply within two working days.</Text>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-body-sm">
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          className="field"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
        />
        <FieldError id="name-error" message={errors.name?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-body-sm">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="field"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        <FieldError id="email-error" message={errors.email?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="projectType" className="text-body-sm">
          Project type
        </label>
        <select
          id="projectType"
          className="field"
          defaultValue=""
          aria-invalid={Boolean(errors.projectType)}
          aria-describedby={errors.projectType ? "projectType-error" : undefined}
          {...register("projectType")}
        >
          <option value="" disabled>
            Choose one
          </option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <FieldError id="projectType-error" message={errors.projectType?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="budget" className="text-body-sm">
          Budget range <span className="text-content-secondary">(optional)</span>
        </label>
        <select id="budget" className="field" defaultValue="" {...register("budget")}>
          <option value="">Prefer not to say</option>
          {BUDGET_RANGES.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-body-sm">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className="field"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      {/* Honeypot: off-screen rather than display:none, which bots skip. */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company">Company (leave blank)</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      {status === "failed" && (
        <div role="alert" className="field-error">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="text-body-sm">
            That didn&apos;t send. Nothing you typed is lost — try again, or
            email me directly at{" "}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
            .
          </span>
        </div>
      )}

      <Button type="submit" variant="primary" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
