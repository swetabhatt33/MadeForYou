import "dotenv/config";
import express from "express";
import cors from "cors";

import { productsRouter } from "./routes/products.js";
import { checkoutRouter } from "./routes/checkout.js";
import { webhookRouter } from "./routes/webhook.js";

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: CLIENT_URL }));

// Stripe webhooks need the RAW body for signature verification, so this
// route must be registered before express.json() is applied globally.
app.use("/api/webhook", express.raw({ type: "application/json" }), webhookRouter);

app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/products", productsRouter);
app.use("/api/checkout", checkoutRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong." });
});

app.listen(PORT, () => {
  console.log(`Vellum & Seal API listening on http://localhost:${PORT}`);
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn(
      "⚠️  STRIPE_SECRET_KEY is not set — checkout will not work until you add it to server/.env"
    );
  }
});
