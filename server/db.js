// Minimal file-backed order store.
//
// This is intentionally simple so the project runs with zero external
// services. For real production traffic, swap this module out for a
// proper database (Postgres, etc.) — the function signatures below are
// the only thing the rest of the app depends on, so that's the only
// contract you need to preserve.

import { readFile, writeFile } from "fs/promises";
import { existsSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, "data", "orders.json");

if (!existsSync(DB_FILE)) {
  writeFileSync(DB_FILE, "[]", "utf-8");
}

// Very small in-process write queue so concurrent requests don't clobber
// each other's writes to the JSON file.
let queue = Promise.resolve();
function enqueue(fn) {
  const result = queue.then(fn);
  queue = result.catch(() => {});
  return result;
}

async function readAll() {
  const raw = await readFile(DB_FILE, "utf-8");
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeAll(orders) {
  await writeFile(DB_FILE, JSON.stringify(orders, null, 2), "utf-8");
}

export function saveOrder(order) {
  return enqueue(async () => {
    const orders = await readAll();
    orders.push(order);
    await writeAll(orders);
    return order;
  });
}

export function getOrder(orderId) {
  return enqueue(async () => {
    const orders = await readAll();
    return orders.find((o) => o.id === orderId) || null;
  });
}

export function updateOrder(orderId, patch) {
  return enqueue(async () => {
    const orders = await readAll();
    const idx = orders.findIndex((o) => o.id === orderId);
    if (idx === -1) return null;
    orders[idx] = { ...orders[idx], ...patch };
    await writeAll(orders);
    return orders[idx];
  });
}

export function findOrderByStripeSessionId(sessionId) {
  return enqueue(async () => {
    const orders = await readAll();
    return orders.find((o) => o.stripeSessionId === sessionId) || null;
  });
}
