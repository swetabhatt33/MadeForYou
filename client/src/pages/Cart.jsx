import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { api, formatPrice, resolveMediaUrl } from "../lib/api";
import ProductImage from "../components/ProductImage";


export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, currency } = useCart();
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
        currency,
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
        <p>Personalize a gift
