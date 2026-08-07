import { useState } from "react";
import ProductIcon from "./ProductIcon";

/**
 * Single-photo display (catalogue thumbnail, cart thumbnail). Shows the
 * first entry in `images` if it loads; otherwise falls back to the
 * line-art ProductIcon so the site never shows a broken image.
 */
export default function ProductImage({
  id,
  name,
  theme,
  images,
  className,
  iconClassName,
}) {
  const [failed, setFailed] = useState(false);
  const src = images?.[0];

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name}
        className={className}
        onError={() => setFailed(true)}
      />
    );
  }

  return <ProductIcon productId={id} theme={theme} className={iconClassName} />;
}
