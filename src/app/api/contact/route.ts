import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact-schema";

/**
 * Contact submissions.
 *
 * Validates server-side as well as in the browser — client validation is a
 * convenience, not a control, and this endpoint is reachable directly.
 *
 * [MOCK] Delivery is not wired up. There is no mail provider configured yet, so
 * a valid submission is logged and acknowledged. Before launch, replace the
 * logging below with a real send (Resend, Postmark, or an SMTP relay) and put
 * the credentials in the environment. The contact form must be tested end to
 * end before the site goes live.
 */
export async function POST(request: Request) {
  let payload: unknown;

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

  // Honeypot filled means a bot. Acknowledge without doing anything, so the
  // sender learns nothing about why it was rejected.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, projectType, budget } = parsed.data;
  console.info("[contact] submission received", {
    name,
    email,
    projectType,
    budget: budget || "unspecified",
  });

  return NextResponse.json({ ok: true });
}
