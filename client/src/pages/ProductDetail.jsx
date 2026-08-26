import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { api, formatPrice } from "../lib/api";
import { useCart } from "../context/CartContext";
import ProductGallery from "../components/ProductGallery";
import { renderRichText } from "../lib/richText";
import ImageUploadField from "../components/ImageUploadField";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [variantId, setVariantId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [personalization, setPersonalization] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .getProduct(id)
      .then((data) => {
        setProduct(data.product);
        setVariantId(data.product.variants[0]?.id);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container section">Loading…</div>;
  if (!product) return <div className="container section">Product not found.</div>;

  const variant = product.variants.find((v) => v.id === variantId);
  // If this product maps a personalization field (e.g. a color dropdown)
  // to specific photos, look up which photo matches the current choice.
  const colorImages = product.colorImages;
  const selectedImage = colorImages
    ? colorImages.options[personalization[colorImages.fieldName]]
    : undefined;

  const setField = (name, value) => {
    setPersonalization((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
  const nextErrors = {};
  for (const field of product.personalizationFields) {
    if (field.required) {
      const val = personalization[field.name];
      const isEmpty =
        field.type === "image-upload"
          ? !Array.isArray(val) || val.length === 0
          : !String(val || "").trim();
      if (isEmpty) {
        nextErrors[field.name] = `${field.label} is required.`;
      }
    }
  }
  setErrors(nextErrors);
  return Object.keys(nextErrors).length === 0;
};

  const handleAddToCart = () => {
    if (!validate()) return;
    addItem({
      productId: product.id,
      productName: product.name,
      theme: product.theme,
      images: product.images,
      variantId: variant.id,
      variantLabel: variant.label,
      unitPrice: variant.price,
      quantity,
      personalization,
    });
    setJustAdded(true);
    setTimeout(() => navigate("/cart"), 500);
  };

  return (
    <div className="container product-detail">
      <ProductGallery
        id={product.id}
        name={product.name}
        theme={product.theme}
        images={product.images}
        selectedImage={selectedImage}
      />

      <div className="product-info">
        <Link to="/" className="crumb back-button">
          ← Back to the collection
        </Link>
        <h1>{product.name}</h1>
        <p className="tagline">{renderRichText(product.description)}</p>
        {product.includes && product.includes.length > 0 && (
          <ul className="includes-list">
          {product.includes.map((item) => (
            <li key={item}>{item}</li>
         ))}
        </ul>
        )}

        <div className="field-group">
          <span className="label">{product.variantFieldLabel || "Size / option"}</span>
          <div className="variant-options">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                className="variant-pill"
                aria-pressed={v.id === variantId}
                onClick={() => setVariantId(v.id)}
              >
                {v.label} — {formatPrice(v.price)}
              </button>
            ))}
          </div>
        </div>

        {product.personalizationFields.map((field) => (
          <div className="field-group" key={field.name}>
            <label htmlFor={field.name}>
              {field.label}
              {field.required ? " *" : ""}
            </label>
            {field.hint && <p className="field-hint field-note">{field.hint}</p>}
            <PersonalizationInput
              field={field}
              value={personalization[field.name] ?? (field.type === "image-upload" ? [] : "")}
              onChange={(v) => setField(field.name, v)}
            />
            {errors[field.name] && <p className="error-text">{errors[field.name]}</p>}
          </div>
        ))}

        <div className="field-group">
          <label htmlFor="quantity">Quantity</label>
          <select
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ maxWidth: 120 }}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="sticky-cta">
          <span className="price">
            {variant ? formatPrice(variant.price * quantity) : ""}
          </span>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            {justAdded ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PersonalizationInput({ field, value, onChange }) {
  if (field.type === "textarea") {
    return (
      <>
        <textarea
          id={field.name}
          value={value}
          maxLength={field.maxLength}
          onChange={(e) => onChange(e.target.value)}
        />
        {field.maxLength && (
          <p className="field-hint">
            {value.length}/{field.maxLength}
          </p>
        )}
      </>
    );
  }
  if (field.type === "image-upload") {
  return <ImageUploadField id={field.name} value={value} onChange={onChange} />;
  }

  if (field.type === "select") {
    return (
      <select id={field.name} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>
          Choose…
        </option>
        {field.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      id={field.name}
      type={field.type === "date" ? "date" : "text"}
      value={value}
      maxLength={field.maxLength}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
