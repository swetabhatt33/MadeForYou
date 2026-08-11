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
              Gifts set delivered to <em>your</em> doorstep!
            </h1>
            <p className="lede">
              Personalized giftboxes, handmade gift cards, and 
              invitations — printed, and packed by hand for the
              person you're giving them to.
            </p>
            <div className="hero-cta">
            <Link to="#gift-box" className="btn btn-primary btn-small">
              Browse the collection
            </Link>
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

      
    </>
  );
}
