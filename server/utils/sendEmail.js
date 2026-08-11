import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

let transporter = null;

function getTransporter() {
  if (!env.email.host || !env.email.user || !env.email.pass) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.email.host,
      port: env.email.port,
      secure: env.email.port === 465,
      auth: { user: env.email.user, pass: env.email.pass },
    });
  }
  return transporter;
}

/**
 * Best-effort contact notification email. Returns false (never throws) if
 * email isn't configured or sending fails, so the contact API always
 * succeeds at persisting the message regardless of email delivery.
 */
export async function sendContactNotification({ name, email, subject, message }) {
  const mailer = getTransporter();
  if (!mailer || !env.email.to) return false;

  try {
    await mailer.sendMail({
      from: env.email.from || env.email.user,
      to: env.email.to,
      replyTo: email,
      subject: `New portfolio contact: ${subject || 'No subject'}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    return true;
  } catch (err) {
    console.error('Failed to send contact notification email:', err.message);
    return false;
  }
}
