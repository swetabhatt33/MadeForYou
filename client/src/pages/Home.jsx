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
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Personalized · Made to order</span>
            <h1>
              Gifts delivered to <em>your</em> doorstep!
            </h1>
            <p className="lede">
              Personalized giftboxes, custom greeting cards,
              invitations and return gifts, packed by hand for the
              person you're giving them to.
            </p>
            <div className="hero-actions">
              <a href="#gift-box" className="btn btn-primary btn-small">
                Browse the collection
              </a>
            </div>
          </div>
          <img
            src="/images/hero-photo.jpg"
            alt="Personalized gifts made for you"
            className="hero-photo"
          />
        </div>
      </section>

      <section className="section container">
        <h1>Our collection</h1>

        <div className="catalogue">
          {products.map((product, i) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              id={product.id}
              className="catalogue-item"
            >
              <h3>{product.name}</h3>

              <ProductImage
                id={product.id}
                name={product.name}
                theme={product.theme}
                images={product.images}
                className="catalogue-photo"
                iconClassName="catalogue-icon"
              />

              <p className="tagline">{product.tagline}</p>

              <div className="price-row">
                <button className="price-from">
                  From {formatPrice(Math.min(...product.variants.map((v) => v.price)))}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
