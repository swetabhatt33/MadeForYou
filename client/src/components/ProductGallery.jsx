import { useEffect, useState } from "react";
import ProductIcon from "./ProductIcon";

/**
 * Product photo gallery: a large main photo with clickable thumbnails.
 * Any image that fails to load (e.g. the file hasn't been added yet) is
 * quietly dropped from rotation. If every photo fails (or none were
 * provided), it falls back to the line-art icon — the page never shows a
 * broken image.
 *
 * `selectedImage` (optional): a URL from `images` that should be shown
 * whenever it changes — e.g. jumping to the photo matching a color the
 * customer just picked from a dropdown. Manually clicking a thumbnail
 * still works normally and isn't overridden until selectedImage changes
 * again.
 */
export default function ProductGallery({ id, name, theme, images = [], selectedImage }) {
  const [failed, setFailed] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!selectedImage) return;
    const idx = images.indexOf(selectedImage);
    if (idx !== -1) setActiveIndex(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

  const validEntries = images
    .map((src, i) => ({ src, i }))
    .filter(({ i }) => !failed[i]);

  if (validEntries.length === 0) {
    return (
      <div className="gallery-col">
        <div className={`product-visual product-visual-${id}`}>
          <ProductIcon productId={id} theme={theme} className="product-visual-icon" />
        </div>
      </div>
    );
  }

  const activeEntry =
    validEntries.find(({ i }) => i === activeIndex) || validEntries[0];

  const markFailed = (index) => setFailed((prev) => ({ ...prev, [index]: true }));

  return (
    <div className="gallery-col">
      <div className={`product-visual product-visual-${id}`}>
        <img
          key={activeEntry.src}
          src={activeEntry.src}
          alt={`${name} — photo ${activeEntry.i + 1}`}
          className="product-photo"
          onError={() => markFailed(activeEntry.i)}
        />
      </div>

      {validEntries.length > 1 && (
        <div className="gallery-thumbs" role="tablist" aria-label={`${name} photos`}>
          {validEntries.map(({ src, i }) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === activeEntry.i}
              className="gallery-thumb"
              onClick={() => setActiveIndex(i)}
            >
              <img src={src} alt="" onError={() => markFailed(i)} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}