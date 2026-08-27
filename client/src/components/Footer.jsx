import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container row">
        <span>&copy; {new Date().getFullYear()} Made For You. Made to order.</span>
        <span>Secure checkout by Stripe</span>
      </div>

      <div className="footer-links">
      <Link to="/privacy-policy">Privacy Policy</Link>
      <Link to="/terms">Terms of Service</Link>
      <Link to="/refund-policy">Refund Policy</Link>
      <Link to="/shipping-policy">Shipping Policy</Link>
    </div>
    </footer>
  );
}
