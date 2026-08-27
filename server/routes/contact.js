import { Router } from "express";
import { sendEmail } from "../email.js";

const OWNER_EMAIL = process.env.OWNER_EMAIL || process.env.GMAIL_USER;
const MAX_MESSAGE_LENGTH = 2000;

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT;
}

function validateContactPayload({ name, email, message }) {
  const errors = {};
  if (!name || !name.trim()) errors.name = "Name is required.";
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.email = "A valid email is required.";
  if (!message || !message.trim()) errors.message = "Message is required.";
  if (message && message.length > MAX_MESSAGE_LENGTH) errors.message = "Message is too long.";
  return errors;
}

function escapeHtml(str) {
  return str.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

export const contactRouter = Router();

contactRouter.post("/", async (req, res) => {
  const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: "You've sent a few messages already — please try again a bit later.",
    });
  }

  const { name, email, message } = req.body || {};
  const errors = validateContactPayload({ name, email, message });
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: Object.values(errors)[0] });
  }

  try {
    const result = await sendEmail({
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;">
          <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });
    if (result.skipped) {
      return res.status(500).json({
        error: "The contact form isn't fully set up yet — please try emailing us directly.",
      });
    }
    res.json({ ok: true });
  } catch (err) {
    console.error("Contact form email failed:", err.message);
    res.status(500).json({ error: "Couldn't send your message right now. Please try again." });
  }
});
