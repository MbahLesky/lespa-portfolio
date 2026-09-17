import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact-schema";
import { resend } from "@/lib/resend";

/**
 * Load the email template once at module scope — the file only changes on
 * deploy, so there is no reason to re-read it on every request.
 */
const emailTemplate = readFileSync(
  join(process.cwd(), "email-template.html"),
  "utf-8",
);

/**
 * Replace all `{{key}}` placeholders in the template with the given values.
 */
function renderTemplate(template, data) {
  return Object.entries(data).reduce(
    (html, [key, value]) => html.replaceAll(`{{${key}}}`, value),
    template,
  );
}

/**
 * Contact submissions.
 *
 * Validates server-side as well as in the browser — client validation is a
 * convenience, not a control, and this endpoint is reachable directly.
 *
 * Delivery is handled by Resend. Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL`
 * in `.env` before testing. The "from" address uses Resend's shared
 * onboarding domain — once you verify your own domain in the Resend dashboard,
 * swap it for something like `contact@yourdomain.com`.
 */

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { name, email, message } = parsed.data;

  const html = renderTemplate(emailTemplate, {
    name,
    email,
    message,
    initial: name.charAt(0).toUpperCase(),
    year: new Date().getFullYear().toString(),
  });

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL,
      subject: `🟢 Lespa Portfolio - New message from ${name}`,
      replyTo: email,
      html,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend API error", error);
      return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] unexpected send failure", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }

  console.info("[contact] sent to", process.env.CONTACT_TO_EMAIL, { name, email });

  return NextResponse.json({ ok: true });
}

