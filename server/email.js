import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

let transporter = null;
function getTransporter() {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // STARTTLS on 587, instead of implicit TLS on 465
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
      connectionTimeout: 10000,
    });
  }
  return transporter;
}

export async function sendEmail({ to, replyTo, subject, html }) {
  const t = getTransporter();
  if (!t) {
    console.warn("⚠️  GMAIL_USER/GMAIL_APP_PASSWORD not set — email not sent.");
    return { skipped: true };
  }
  return t.sendMail({
    from: `"Made For You" <${GMAIL_USER}>`,
    to,
    replyTo,
    subject,
    html,
  });
}

export async function sendOrderConfirmationEmail(order) {
  try {
    await sendEmail({
      to: order.customerEmail,
      subject: `Your order confirmation — ${order.id}`,
      html: buildOrderEmailHtml(order),
    });
  } catch (err) {
    console.error(`Failed to send confirmation email for order ${order.id}:`, err.message);
  }
}

export function buildOrderEmailHtml(order) {
  const itemsHtml = order.items
    .map((item) => {
      const details = Object.entries(item.personalization || {})
        .filter(([, v]) => {
          const isUrl = (s) =>
            typeof s === "string" && (s.startsWith("/uploads/") || s.includes("res.cloudinary.com"));
          return v && !(Array.isArray(v) ? v.every(isUrl) : isUrl(v));
        })
        .map(([k, v]) => `<li>${prettyLabel(k)}: ${escapeHtml(String(v))}</li>`)
        .join("");

      return `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #eee;">
            <strong>${escapeHtml(item.productName)}</strong> — ${escapeHtml(item.variantLabel)} &times; ${item.quantity}
            ${details ? `<ul style="margin:8px 0 0;padding-left:18px;font-size:13px;color:#555;">${details}</ul>` : ""}
          </td>
          <td style="padding:14px 0;border-bottom:1px solid #eee;text-align:right;vertical-align:top;white-space:nowrap;">
            $${(item.lineTotal / 100).toFixed(2)}
          </td>
        </tr>
      `;
    })
    .join("");

  return `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#2b2b26;">
      <h1 style="font-size:22px;margin-bottom:4px;">Thank you for your order!</h1>
      <p style="color:#555;">We've received your order and it's being prepared.</p>
      <p style="font-size:13px;color:#888;">Order reference: ${escapeHtml(order.id)}</p>
      <table style="width:100%;border-collapse:collapse;margin-top:20px;">
        ${itemsHtml}
      </table>
      <table style="width:100%;margin-top:16px;">
        <tr>
          <td><strong>Subtotal</strong></td>
          <td style="text-align:right;"><strong>$${(order.subtotal / 100).toFixed(2)}</strong></td>
        </tr>
      </table>
      <p style="margin-top:24px;font-size:13px;color:#888;">
        Shipping and any applicable tax were calculated at checkout.
      </p>
    </div>
  `;
}

function prettyLabel(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

function escapeHtml(str) {
  return str.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}
