import { useRef, useState } from "react";
import { api, resolveMediaUrl } from "../lib/api";

export default function ImageUploadField({ id, value, onChange }) {
  const images = Array.isArray(value) ? value : [];
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setError(null);
    setUploading(true);
    try {
      const uploaded = await Promise.all(files.map((file) => api.uploadImage(file)));
      const newUrls = uploaded.map((r) => r.url);
      onChange([...images, ...newUrls]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = (urlToRemove) => {
    onChange(images.filter((u) => u !== urlToRemove));
  };

  return (
    <div className="image-upload-field">
      {images.length > 0 && (
        <div className="image-upload-grid">
          {images.map((url) => (
            <div className="image-upload-thumb" key={url}>
              <img src={resolveMediaUrl(url)} alt="Uploaded photo" />
              <button
                type="button"
                className="image-upload-remove"
                onClick={() => handleRemove(url)}
                aria-label="Remove photo"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        id={id}
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p className="field-hint">Uploading…</p>}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
