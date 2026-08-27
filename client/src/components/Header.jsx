import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="site-header">
      <div className="row">
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

        <nav className="mobile-nav-panel">
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
    </header>
  );
}
