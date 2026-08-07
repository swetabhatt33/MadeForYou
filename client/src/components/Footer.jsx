export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container row">
        <span>&copy; {new Date().getFullYear()} Made For You. Made to order.</span>
        <span>Secure checkout by Stripe</span>
      </div>
    </footer>
  );
}
