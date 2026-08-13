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
        className={`${className} photo-${id}`}
        onError={() => setFailed(true)}
      />
    );
  }

  // No photo (or it failed to load) — reserve the exact same box the
  // photo would have used, so cards without a photo don't throw off
  // alignment next to cards that have one.
  return (
    <div
      className={`${className} photo-fallback`}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <ProductIcon productId={id} theme={theme} className={iconClassName} />
    </div>
  );
}
