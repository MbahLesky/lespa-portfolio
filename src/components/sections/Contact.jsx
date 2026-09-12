"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { contact, footer, socials } from "@/content/copy";
import { contactSchema } from "@/lib/contact-schema";

/**
 * Contact — three fields and one button, with the copy around it trimmed to the
 * single intro line the copy doc specifies.
 *
 * react-hook-form with the zod resolver, against the same schema the route
 * handler validates with.
 */
export function Contact() {
  const [status, setStatus] = useState("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactSchema), mode: "onBlur" });

  const onSubmit = async (values) => {
    setStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error(`Contact endpoint returned ${response.status}`);

      setStatus("sent");
      reset();
    } catch (error) {
      console.error("Contact submission failed", error);
      setStatus("failed");
    }
  };

  return (
    <section id="contact" className="snap-section relative py-24 md:py-30">
      <div className="mx-auto flex max-w-content flex-col gap-12 px-6 md:px-8">
        <SectionHeading label={contact.label} heading={contact.introLine} />

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <Reveal className="max-w-reading">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8">
            <Field
              id="name"
              label={contact.fields.name}
              error={errors.name?.message}
              register={register("name")}
            />
            <Field
              id="email"
              type="email"
              label={contact.fields.email}
              error={errors.email?.message}
              register={register("email")}
            />
            <Field
              id="message"
              label={contact.fields.message}
              error={errors.message?.message}
              register={register("message")}
              multiline
            />

            <div className="flex flex-wrap items-center gap-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-md bg-action px-8 py-4 text-body-sm uppercase tracking-label text-action-fg transition-colors duration-fast hover:bg-action-hover disabled:opacity-60"
              >
                {contact.submit}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>

              {/* Announced on change, so the outcome reaches a screen reader
                  without moving focus. */}
              <p role="status" aria-live="polite" className="text-body-sm">
                {status === "sent" ? (
                  <span className="text-accent">{contact.success}</span>
                ) : null}
                {status === "failed" ? (
                  <span className="text-content">{contact.failure}</span>
                ) : null}
              </p>
            </div>
          </form>
        </Reveal>

          <DirectRoutes />
        </div>
      </div>
    </section>
  );
}

/**
 * The same accounts the footer carries as icons, spelled out as handles, plus the
 * email and phone. Written out rather than iconified so they can be read, copied
 * and dialled — the footer row stays as it is.
 */
function DirectRoutes() {
  return (
    <Reveal className="flex flex-col gap-8" delay={0.1}>
      <h3 className="text-caption uppercase tracking-eyebrow text-accent">
        {contact.direct.heading}
      </h3>

      <ul className="flex flex-col gap-4">
        <li className="flex items-center gap-4">
          <Mail className="h-4 w-4 shrink-0 text-content-secondary" aria-hidden="true" />
          <a
            href={`mailto:${contact.direct.email}`}
            className="text-body text-content transition-colors duration-fast hover:text-accent"
          >
            {contact.direct.email}
          </a>
        </li>
        <li className="flex items-center gap-4">
          <Phone className="h-4 w-4 shrink-0 text-content-secondary" aria-hidden="true" />
          <a
            href={`tel:${contact.direct.phone.replace(/\s+/g, "")}`}
            className="text-body text-content transition-colors duration-fast hover:text-accent"
          >
            {contact.direct.phone}
          </a>
        </li>
      </ul>

      <ul className="flex flex-col gap-2 border-t border-border pt-6">
        {socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-baseline justify-between gap-6 py-1"
            >
              <span className="text-caption uppercase tracking-eyebrow text-content-secondary">
                {social.label}
              </span>
              <span className="text-body-sm text-content transition-colors duration-fast group-hover:text-accent">
                {social.username}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function Field({ id, label, error, register, type = "text", multiline = false }) {
  const shared =
    "glass w-full rounded-md border px-4 py-4 text-body text-content outline-none transition-colors duration-fast placeholder:text-content-secondary focus:border-accent";
  const borderClass = error ? "border-accent" : "border-border";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-caption uppercase tracking-eyebrow text-content-secondary">
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          rows={6}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${shared} ${borderClass} resize-y`}
          {...register}
        />
      ) : (
        <input
          id={id}
          type={type}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${shared} ${borderClass}`}
          {...register}
        />
      )}

      {error ? (
        <p id={`${id}-error`} className="text-caption text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}
