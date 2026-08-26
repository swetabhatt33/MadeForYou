import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { api, formatPrice } from "../lib/api";
import ProductImage from "../components/ProductImage";

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  

  const canceled = searchParams.get("canceled");

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const payload = {
        customerEmail: email,
        items: items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          quantity: i.quantity,
          personalization: i.personalization,
        })),
      };
      const { checkoutUrl } = await api.createCheckout(payload);
      window.location.href = checkoutUrl;
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container empty-state">
        <h1>Your cart is empty</h1>
        <p>Personalize a gift box, gift card, or invitation to get started.</p>
        <Link to="/" className="btn btn-primary">
          Browse the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <Link to="/#collection" className="crumb back-button">
        ← Back to the collection
      </Link>
      <h1>Your cart</h1>

      {canceled && (
        <p className="error-text" style={{ marginTop: 10 }}>
          Checkout was canceled — your cart has been saved.
        </p>
      )}

      <div style={{ marginTop: 30 }}>
        {items.map((item) => (
          <div className="cart-item" key={item.cartId}>
            <div className="cart-thumb">
              <ProductImage
                id={item.productId}
                name={item.productName}
                theme={item.theme}
                images={item.images}
                className="cart-photo"
                iconClassName="cart-icon"
              />
            </div>
            <div>
              <h4>{item.productName}</h4>
                            <p className="meta">{item.variantLabel}</p>
              <div className="qty-stepper">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                  disabled={item.quantity >= 10}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <p className="personalization-summary">
                {Object.entries(item.personalization)
                  .filter(([, v]) => v)
                  .map(([k, v]) => `${prettyLabel(k)}: ${v}`)
                  .join(" · ")}
              </p>
              <button className="remove-btn" onClick={() => removeItem(item.cartId)}>
                Remove
              </button>
            </div>
            <div className="line-price">
              {formatPrice(item.unitPrice * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-summary-row total">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <p className="field-hint">
          Shipping and any applicable tax are calculated at checkout.
        </p>
      </div>

      <form className="checkout-panel" onSubmit={handleCheckout}>
        <div className="field-group" style={{ marginBottom: 16 }}>
          <label htmlFor="email">Email for order confirmation</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Redirecting to secure checkout…" : "Proceed to checkout"}
        </button>
      </form>
    </div>
  );
}

function prettyLabel(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}
