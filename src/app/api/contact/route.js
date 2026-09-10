import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact-schema";

/**
 * Contact submissions.
 *
 * Validates server-side as well as in the browser — client validation is a
 * convenience, not a control, and this endpoint is reachable directly.
 *
 * Delivery is not wired up. There is no mail provider configured yet, so a valid
 * submission is logged and acknowledged. Before launch, replace the logging
 * below with a real send (Resend, Postmark, or an SMTP relay), put the
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

  // The message body stays out of the log — only enough to know a real
  // submission arrived and who to reply to.
  const { name, email } = parsed.data;
  console.info("[contact] submission received", { name, email });

  return NextResponse.json({ ok: true });
}
