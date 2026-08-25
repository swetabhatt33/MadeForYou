const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Something went wrong.");
  }
  return data;
}

export const api = {
  getProducts: () => request("/api/products"),
  getProduct: (id) => request(`/api/products/${id}`),
  createCheckout: (payload) =>
    request("/api/checkout", { method: "POST", body: JSON.stringify(payload) }),
  getOrder: (id) => request(`/api/checkout/order/${id}`),
  uploadImage: async (file) => {
  const form = new FormData();
  form.append("photo", file);
  const res = await fetch(`${API_URL}/api/uploads`, {
    method: "POST",
    body: form,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed.");
  return data;
},
};

export function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
