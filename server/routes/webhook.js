import { Router } from "express";
import Stripe from "stripe";
import { findOrderByStripeSessionId, updateOrder } from "../db.js";

export const webhookRouter = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

// NOTE: this route is mounted with express.raw() in server.js, not
// express.json(), because Stripe's signature check needs the exact
// raw request body bytes.
webhookRouter.post("/", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const order = await findOrderByStripeSessionId(session.id);
      if (order) {
        await updateOrder(order.id, {
          status: "paid",
          paidAt: new Date().toISOString(),
        });
        // TODO: send a confirmation email, notify fulfillment, etc.
        console.log(`Order ${order.id} marked as paid.`);
      }
      break;
    }
    case "checkout.session.expired": {
      const session = event.data.object;
      const order = await findOrderByStripeSessionId(session.id);
      if (order) {
        await updateOrder(order.id, { status: "expired" });
      }
      break;
    }
    default:
      // Unhandled event type — safe to ignore.
      break;
  }

  res.json({ received: true });
});
