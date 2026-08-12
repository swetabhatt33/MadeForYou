import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  console.warn(
    "⚠️  DATABASE_URL is not set — order storage will fail until you add it to server/.env"
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: /sslmode=require|render\.com/.test(process.env.DATABASE_URL || "")
    ? { rejectUnauthorized: false }
    : false,
});

const ready = pool.query(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    stripe_session_id TEXT,
    data JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );
  CREATE INDEX IF NOT EXISTS idx_orders_stripe_session_id
    ON orders (stripe_session_id);
`);

export async function saveOrder(order) {
  await ready;
  await pool.query(
    `INSERT INTO orders (id, stripe_session_id, data) VALUES ($1, $2, $3)`,
    [order.id, order.stripeSessionId || null, order]
  );
  return order;
}

export async function getOrder(orderId) {
  await ready;
  const res = await pool.query(`SELECT data FROM orders WHERE id = $1`, [orderId]);
  return res.rows[0]?.data ?? null;
}

export async function updateOrder(orderId, patch) {
  await ready;
  const existing = await getOrder(orderId);
  if (!existing) return null;
  const updated = { ...existing, ...patch };
  await pool.query(
    `UPDATE orders SET data = $2, stripe_session_id = $3 WHERE id = $1`,
    [orderId, updated, updated.stripeSessionId || null]
  );
  return updated;
}

export async function findOrderByStripeSessionId(sessionId) {
  await ready;
  const res = await pool.query(
    `SELECT data FROM orders WHERE stripe_session_id = $1`,
    [sessionId]
  );
  return res.rows[0]?.data ?? null;
}
