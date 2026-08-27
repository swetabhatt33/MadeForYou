import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { count } = useCart();
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

        <Link to="/cart" className="cart-link">
          Cart
          <span className="cart-count">{count}</span>
        </Link>
      </div>

      {menuOpen && (
        <nav className="mobile-nav-panel">
          <Link to="/product/gift-box" onClick={closeMenu}>Gift Boxes</Link>
          <Link to="/product/greeting-card" onClick={closeMenu}>Greeting Cards</Link>
          <Link to="/product/invitations" onClick={closeMenu}>Invitations</Link>
          <Link to="/product/return-gifts" onClick={closeMenu}>Return Gifts</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
        </nav>
      )}
    </header>
  );
}
