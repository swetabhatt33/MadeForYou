import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { api } from "../lib/api";
import WaxSeal from "../components/WaxSeal";

export default function Success() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order");
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    clearCart();
    if (!orderId) return;
    api
      .getOrder(orderId)
      .then((data) => setOrder(data.order))
      .catch((e) => setError(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return (
    <div className="container status-page">
      <div className="status-card">
        <WaxSeal initials="✓" />
        <h1>Your order is sealed.</h1>
        <p>
          Thank you — we've received your order and personalization details.
          A confirmation has been sent to your email.
          {order?.status === "pending" &&
            " Payment is confirming now; this page will reflect it shortly."}
        </p>
        {orderId && <p className="order-id">Order reference: {orderId}</p>}
        {error && <p className="error-text">{error}</p>}
        <div style={{ marginTop: 30 }}>
          <Link to="/" className="btn btn-primary">
            Continue browsing
          </Link>
        </div>
      </div>
    </div>
  );
}
