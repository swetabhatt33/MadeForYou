import { Router } from "express";
import Stripe from "stripe";
import { findOrderByStripeSessionId, updateOrder } from "../db.js";
import { sendOrderConfirmationEmail } from "../email.js";

export const webhookRouter = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

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
        const updatedOrder = await updateOrder(order.id, {
          status: "paid",
          paidAt: new Date().toISOString(),
        });
        console.log(`Order ${order.id} marked as paid.`);
        await sendOrderConfirmationEmail(updatedOrder);
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
      break;
  }

  res.json({ received: true });
});
