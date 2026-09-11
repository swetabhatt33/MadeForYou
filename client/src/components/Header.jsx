import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { count, currency, setCurrency } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="row">
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <Link to="/" className="brandmark">
          <span className="wordmark">
            Made <span className="amp">For</span> You
          </span>
        </Link>

        <nav className="nav-links">
          <Link to="/product/gift-box">Gift Boxes</Link>
          <Link to="/product/greeting-card">Greeting Cards</Link>
          <Link to="/product/invitations">Invitations</Link>
          <Link to="/product/return-gifts">Return Gifts</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="currency-toggle">
          <button
            type="button"
            className={currency === "usd" ? "active" : ""}
            onClick={() => setCurrency("usd")}
          >
            USD
          </button>
          <button
            type="button"
            className={currency
