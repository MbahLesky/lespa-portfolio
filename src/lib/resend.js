import { Resend } from "resend";

/**
 * Singleton Resend client.
 *
 * The API key is read from the `RESEND_API_KEY` environment variable.
 * This module is only imported on the server (route handlers), so the key
 * never leaks to the browser.
 */
export const resend = new Resend(process.env.RESEND_API_KEY);
