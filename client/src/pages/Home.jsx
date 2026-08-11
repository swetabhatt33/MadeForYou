import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, formatPrice } from "../lib/api";
import ProductImage from "../components/ProductImage";
import WaxSeal from "../components/WaxSeal";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initials, setInitials] = useState("");
  const [sealKey, setSealKey] = useState(0);

  useEffect(() => {
    api
      .getProducts()
      .then((data) => setProducts(data.products))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleInitials = (e) => {
    const v = e.target.value.toUpperCase().slice(0, 3);
    setInitials(v);
    setSealKey((k) => k + 1); // re-trigger stamp animation
  };

  return (
    <>
      <section className="hero">
        <span className="hero-ghost-letter">{initials[0] || "V"}</span>
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Personalized · Made to order</span>
            <h1>
              Gifts set delivered to <em>your</em> doorstep!
            </h1>
            <p className="lede">
              Personalized giftboxes, handmade gift cards, and 
              invitations — printed, and packed by hand for the
              person you're giving them to.
            </p>
            <div className="hero-actions">
              <Link to="#gift-box" className="btn btn-primary">
                Browse the collection
              </Link>
              <a href="#how-it-works" className="btn btn-ghost">
                How personalization works
              </a>
            </div>
          </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <h2>The collection</h2>
          <p>Three ways to personalize a gift — set by hand to order.</p>
        </div>

        {loading && <p>Loading the collection…</p>}
        {error && <p className="error-text">{error}</p>}

        <div className="catalogue">
          {products.map((product, i) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              id={product.id}
              className="catalogue-item"
            >
              <span className="plate-number">Plate {String(i + 1).padStart(2, "0")}</span>
              <ProductImage
                id={product.id}
                name={product.name}
                theme={product.theme}
                images={product.images}
                className="catalogue-photo"
                iconClassName="catalogue-icon"
              />
              <h3>{product.name}</h3>
              <p className="tagline">{product.tagline}</p>
              <span className="price-from">
                From {formatPrice(Math.min(...product.variants.map((v) => v.price)))}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container" id="how-it-works">
        <div className="section-heading">
          <h2>How personalization works</h2>
          <p>Every piece moves through the same three steps before it ships.</p>
        </div>
        <div className="catalogue catalogue-steps">
          <div className="catalogue-item" style={{ cursor: "default" }}>
          <span className="plate-number">Step 01</span>
          <h3>You choose the words</h3>
          <p className="tagline">
          Names, a date, a message — entered on the product page and
          shown back to you before it's set.
          </p>
          </div>
          <div className="catalogue-item" style={{ cursor: "default" }}>
            <span className="plate-number">Step 02</span>
            <h3>We set it by hand</h3>
            <p className="tagline">
              Your words transformed into a beautiful peom, just for your loved one.
            </p>
          </div>
          <div className="catalogue-item" style={{ cursor: "default" }}>
            <span className="plate-number">Step 03</span>
            <h3>It arrives wrapped</h3>
            <p className="tagline">
              Wrapped with love and ready to give — or shipped directly to
              your recipient.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
