import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact-schema";
import { MailNotConfiguredError, sendContactEmail } from "@/lib/mail";

/**
 * Contact submissions.
 *
 * Validates server-side as well as in the browser — client validation is a
 * convenience, not a control, and this endpoint is reachable directly.
 *
 * Node runtime, not edge: the send is a single outbound fetch either way, but
 * the logs from a failed send are worth having in the same place as the rest.
 */
export const runtime = "nodejs";

/**
 * A crude flood guard.
 *
 * This is per-instance memory, and Vercel runs however many instances it likes,
 * so it does not bound the total rate — it only slows a naive script hammering
 * one warm function. It is worth the fifteen lines anyway; it is not worth
 * mistaking for rate limiting. Move to a shared store if the form is ever
 * actually targeted.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function overRateLimit(key) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // The map would otherwise grow for the life of the instance.
  if (hits.size > 500) {
    for (const [k, times] of hits) {
      if (!times.some((at) => now - at < WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (overRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Try again in a minute." },
      { status: 429 },
    );
  }

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

  const { name, email, message, company } = parsed.data;

  // The honeypot is hidden from people and invisible to assistive technology,
  // so anything that filled it in is automated. Answered with a plain success:
  // telling a bot it was caught only teaches whoever wrote it what to change.
  if (company) {
    console.info("[contact] honeypot tripped", { ip });
    return NextResponse.json({ ok: true });
  }

  try {
    await sendContactEmail({ name, email, message });
  } catch (error) {
    if (error instanceof MailNotConfiguredError) {
      // A deployment problem, not a visitor's problem. Loud in the logs, because
      // the symptom otherwise is a form that quietly fails for everyone.
      console.error("[contact] mail is not configured —", error.message);
    } else {
      console.error("[contact] send failed", error);
    }

    // One generic message either way. The visitor cannot act on the difference,
    // and the difference is exactly what an attacker would probe for.
    return NextResponse.json(
      { error: "Could not send the message." },
      { status: 502 },
    );
  }

  // Logged without the message body — enough to know a real submission arrived
  // and who it was from, without copying private text into the log.
  console.info("[contact] delivered", { name, email });

  return NextResponse.json({ ok: true });
}
