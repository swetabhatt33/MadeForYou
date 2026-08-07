# Vellum & Seal — Personalized Gifts Shop

A full-stack storefront for personalized gifts: monogrammed gift boxes,
wax-sealed gift cards, and letterpress invitations — with real Stripe
checkout.

- **`client/`** — React (Vite) storefront: catalogue, product personalization
  forms, cart, checkout handoff, order confirmation.
- **`server/`** — Node/Express API: product catalogue (source of truth for
  prices), order creation, Stripe Checkout Session creation, Stripe webhook.

## 1. Run it locally

### Backend

```bash
cd server
cp .env.example .env      # then fill in your Stripe keys, see step 2
npm install
npm run dev                # http://localhost:4000
```

### Frontend

```bash
cd client
cp .env.example .env       # defaults to http://localhost:4000, fine for local dev
npm install
npm run dev                 # http://localhost:5173
```

Open http://localhost:5173 — the catalogue loads from the backend
automatically.

## 2. Connect Stripe (required to actually charge customers)

1. Create a [Stripe account](https://dashboard.stripe.com/register) if you
   don't have one.
2. In the Dashboard, go to **Developers → API keys** and copy your
   **Secret key**. Put it in `server/.env` as `STRIPE_SECRET_KEY`.
   - Use a `sk_test_...` key while you're testing (use Stripe's test card
     `4242 4242 4242 4242`, any future date, any CVC).
   - Switch to your `sk_live_...` key only once you're ready to take real
     payments, and make sure `CLIENT_URL` points at your real domain.
3. Set up the webhook that marks orders as paid:
   - **Local testing:** install the [Stripe CLI](https://stripe.com/docs/stripe-cli),
     run `stripe listen --forward-to localhost:4000/api/webhook`, and copy
     the `whsec_...` it prints into `server/.env` as `STRIPE_WEBHOOK_SECRET`.
   - **Production:** in the Dashboard, go to **Developers → Webhooks → Add
     endpoint**, point it at `https://your-api-domain.com/api/webhook`,
     subscribe to `checkout.session.completed` and
     `checkout.session.expired`, then copy the signing secret it gives you
     into `STRIPE_WEBHOOK_SECRET`.
4. Restart the server after editing `.env`.

Without a webhook, customers can still pay, but orders will stay marked
`"pending"` in `server/data/orders.json` instead of flipping to `"paid"`.

## 3. How money and personalization data flow

1. The customer fills out a personalization form on a product page (name,
   message, monogram, ribbon, event date, etc.) and adds it to a cart kept
   in the browser (`localStorage`).
2. At checkout, the browser sends the cart (product/variant IDs + the
   personalization text) to `POST /api/checkout`.
3. **The server re-prices everything from `server/data/products.js` and
   ignores any price the browser sends.** This is what stops someone from
   tampering with prices in the browser.
4. The server saves an order (`pending`) and creates a Stripe Checkout
   Session, then hands the browser a URL to redirect to. Stripe hosts the
   actual card entry — card numbers never touch your server.
5. After payment, Stripe redirects back to `/success`, and separately
   calls your webhook, which is what actually flips the order to `paid`
   (the redirect alone isn't proof of payment — the webhook is).

## 4. Before you take real orders, also do this

This project intentionally keeps a few things simple so it runs with zero
external services out of the box. Before going live, you'll want to:

- **Swap the order store.** `server/db.js` writes orders to a JSON file.
  Fine for getting started; move to a real database (Postgres, etc.) before
  you have real order volume or need multiple server instances.
- **Send confirmation emails.** There's a `TODO` in
  `server/routes/webhook.js` where you'd trigger a transactional email
  (e.g. via Postmark, SendGrid, or Resend) once an order is marked paid.
- **Add production hosting.** Deploy `server/` anywhere that runs Node
  (Render, Railway, Fly.io, a VPS...) and `client/` as a static build
  (`npm run build` → the `dist/` folder) to something like Netlify, Vercel,
  or Cloudflare Pages. Set `CLIENT_URL` on the server and `VITE_API_URL`
  on the client to your real URLs.
- **Decide on tax and shipping.** Stripe Checkout supports automatic tax
  and shipping rate collection — turn those on in the Stripe Dashboard, or
  add `shipping_address_collection` / `automatic_tax` to the session
  creation in `server/routes/checkout.js` if you want it configured in
  code instead.
- **Add real fulfillment.** Right now "personalization" data (names,
  messages, monograms) is stored on the order — you'll want a way for
  whoever engraves/prints the order to see it (an admin view, or just the
  emailed order details).

## 5. Editing the catalogue

Everything about what's for sale — names, descriptions, variants, prices,
and which personalization fields appear on each product page — lives in
one file: `server/data/products.js`. Add a new object to the `PRODUCTS`
array to add a new product; the frontend renders whatever it finds there
automatically.
