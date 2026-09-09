import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/phase1-contact-schema";

/**
 * Contact submissions.
 *
 * Validates server-side as well as in the browser — client validation is a
 * convenience, not a control, and this endpoint is reachable directly. The
 * schema is the same one the form uses, so the two cannot drift apart.
 *
 * [MOCK] Delivery is not wired up. There is no mail provider configured, so a
 * valid submission is logged and acknowledged. Before launch, replace the
 * logging below with a real send (Resend, Postmark, or an SMTP relay), put the
 * credentials in the environment, and test the form end to end.
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

  const { name, email } = parsed.data;
  // The message body is deliberately not logged.
  console.info("[contact] submission received", { name, email });

  return NextResponse.json({ ok: true });
}
