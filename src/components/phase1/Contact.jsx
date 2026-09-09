"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Reveal } from "@/components/phase1/Reveal";
import { contactSchema } from "@/lib/phase1-contact-schema";
import { contact } from "@/content/phase1";

/**
 * Three fields and one button.
 *
 * Validated on blur rather than on every keystroke: telling someone their email
 * is invalid while they are still halfway through typing it is noise, not help.
 * Errors are tied to their field with aria-describedby and announced, so the
 * message reaches a screen reader rather than only the eye.
 */
export function Contact() {
  const [state, setState] = useState("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const onSubmit = async (values) => {
    setState("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("send failed");
      setState("sent");
      reset();
    } catch {
      setState("failed");
    }
  };

  return (
    <section id="contact" className="section-pad" aria-labelledby="contact-heading">
      <Reveal className="mx-auto w-full max-w-2xl px-6">
        <h2 id="contact-heading" className="section-heading">
          Contact
        </h2>
        <p className="contact-intro">{contact.intro}</p>

        <form className="mt-16 flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)} noValidate>
          {contact.fields.map((field) => {
            const error = errors[field.name];
            const errorId = `${field.name}-error`;
            const shared = {
              id: field.name,
              autoComplete: field.autoComplete,
              "aria-invalid": error ? "true" : undefined,
              "aria-describedby": error ? errorId : undefined,
              className: "field",
              ...register(field.name),
            };

            return (
              <div key={field.name} className="flex flex-col gap-2">
                <label htmlFor={field.name} className="field-label">
                  {field.label}
                </label>

                {field.type === "textarea" ? (
                  <textarea rows={6} {...shared} />
                ) : (
                  <input type={field.type} {...shared} />
                )}

                {error && (
                  <p id={errorId} className="field-error" role="alert">
                    {error.message}
                  </p>
                )}
              </div>
            );
          })}

          <button type="submit" className="btn btn-primary self-start" disabled={isSubmitting}>
            {state === "sending" ? contact.sending : contact.submit}
          </button>

          {/* Announced rather than only shown: the form has already been
              submitted by the time either of these matters. */}
          <p className="field-status" role="status">
            {state === "sent" ? contact.success : state === "failed" ? contact.failure : ""}
          </p>
        </form>
      </Reveal>
    </section>
  );
}
