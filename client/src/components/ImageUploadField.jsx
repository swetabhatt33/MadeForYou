import { useRef, useState } from "react";
import { api, resolveMediaUrl } from "../lib/api";

export default function ImageUploadField({ id, value, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);
    try {
      const { url } = await api.uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleClear = () => {
    onChange("");
    setError(null);
  };

  return (
    <div className="image-upload-field">
      {value ? (
        <div className="image-upload-preview">
          <img src={resolveMediaUrl(value)} alt="Uploaded photo" />
          <button type="button" className="btn btn-ghost" onClick={handleClear}>
            Remove and choose a different photo
          </button>
        </div>
      ) : (
        <>
          <input
            id={id}
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            disabled={uploading}
          />
          {uploading && <p className="field-hint">Uploading…</p>}
          {error && <p className="error-text">{error}</p>}
        </>
      )}
    </div>
  );
}
