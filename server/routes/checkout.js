import { Router } from "express";
import Stripe from "stripe";
import { nanoid } from "nanoid";
import { priceCart } from "../pricing.js";
import { saveOrder, getOrder } from "../db.js";

export const checkoutRouter = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

// Create an order (server-priced) + a Stripe Checkout Session, and hand
// the client back the URL to redirect the browser to.
checkoutRouter.post("/", async (req, res) => {
  try {
    const { items, customerEmail } = req.body;

    if (!customerEmail || !/^\S+@\S+\.\S+$/.test(customerEmail)) {
      return res.status(400).json({ error: "A valid email is required." });
    }

    const priced = priceCart(items);

    const orderId = nanoid(12);
    const order = {
      id: orderId,
      status: "pending",
      customerEmail,
      items: priced.items,
      subtotal: priced.subtotal,
      currency: priced.currency,
      createdAt: new Date().toISOString(),
      stripeSessionId: null,
    };

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({
        error:
          "Stripe is not configured on the server yet. Add STRIPE_SECRET_KEY to server/.env.",
      });
    }

    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail,
      line_items: priced.items.map((item) => ({
        price_data: {
          currency: priced.currency,
          unit_amount: item.unitPrice,
          product_data: {
            name: `${item.productName} — ${item.variantLabel}`,
            description: summarizePersonalization(item.personalization),
          },
        },
        quantity: item.quantity,
      })),
      success_url: `${clientUrl}/success?order=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/cart?canceled=1`,
      metadata: { orderId },
    });

    order.stripeSessionId = session.id;
    await saveOrder(order);

    res.json({ orderId, checkoutUrl: session.url });
  } catch (err) {
    res.status(400).json({ error: err.message || "Could not start checkout." });
  }
});

checkoutRouter.get("/order/:id", async (req, res) => {
  const order = await getOrder(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found." });
  res.json({ order });
});

function summarizePersonalization(personalization) {
  const parts = Object.entries(personalization || {})
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`);
  // Stripe truncates long product descriptions; keep this compact.
  return parts.join(" · ").slice(0, 300);
}
