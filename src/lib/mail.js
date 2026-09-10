/**
 * Contact email delivery, through Resend.
 *
 * Posted straight to Resend's REST API rather than through their SDK. The call
 * is one fetch against one endpoint, so the SDK would add a dependency and a
 * layer of indirection to save nothing — and this way the exact request that
 * goes out is readable here.
 *
 * Everything configurable lives in the environment. Nothing about the account,
 * the destination or the sender is compiled into the bundle.
 */

const DEFAULT_API_URL = "https://api.resend.com/emails";

/**
 * Resend's shared sender. It works with no domain set up, which is what lets
 * the form deliver before lespa.dev exists — but it only delivers to the email
 * address that owns the Resend account. Once a domain is verified in Resend,
 * set CONTACT_FROM_EMAIL to an address on it and mail can go anywhere.
 */
const DEFAULT_FROM = "Lespa Portfolio <onboarding@resend.dev>";

/** Thrown when the environment is not set up, as opposed to a send failing. */
export class MailNotConfiguredError extends Error {}

function readConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  const missing = [];
  if (!apiKey) missing.push("RESEND_API_KEY");
  if (!to) missing.push("CONTACT_TO_EMAIL");
  if (missing.length) {
    throw new MailNotConfiguredError(`Missing environment: ${missing.join(", ")}`);
  }

  return {
    apiKey,
    to,
    from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
    // Overridable so the delivery path can be exercised against a local stand-in
    // rather than sending real mail from a test.
    apiUrl: process.env.RESEND_API_URL || DEFAULT_API_URL,
  };
}

/** HTML-escapes a value so a message body cannot inject markup into the email. */
function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Sends one contact submission.
 *
 * The reply-to is the sender's own address, so replying in a mail client goes
 * to them rather than to Resend. The from address stays ours — sending as the
 * visitor would be forgery, and every receiving server would treat it as such.
 *
 * Resolves on success. Throws MailNotConfiguredError if the environment is
 * incomplete, and a plain Error if Resend rejects the send.
 */
export async function sendContactEmail({ name, email, message }) {
  const { apiKey, to, from, apiUrl } = readConfig();

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio enquiry from ${name}`,
      text: [
        `From: ${name} <${email}>`,
        "",
        message,
        "",
        "— Sent from the contact form on the Lespa portfolio.",
      ].join("\n"),
      html: [
        `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`,
        // white-space:pre-wrap keeps the sender's own line breaks without
        // needing to turn their text into markup.
        `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
        `<hr><p>Sent from the contact form on the Lespa portfolio.</p>`,
      ].join(""),
    }),
  });

  if (!response.ok) {
    // Read the body for the log, but never hand it back to the browser — it can
    // name the account and the reason the key was rejected.
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend returned ${response.status}: ${detail.slice(0, 300)}`);
  }
}
