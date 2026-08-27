import { useState } from "react";
import { api } from "../lib/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const setField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await api.sendContactMessage(form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container section legal-page">
      <h1>Contact us</h1>
      <p>
        Have a question about an order, a custom request, or anything
        else? Send us a message and we'll get back to you by email.
      </p>

      {status === "success" ? (
        <div className="contact-success">
          <p>Thanks — your message is on its way to us. We'll reply by email soon.</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="contact-name">Your name</label>
            <input
              id="contact-name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
            />
          </div>
          <div className="field-group">
            <label htmlFor="contact-email">Your email</label>
            <input
              id="contact-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="field-group">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              required
              maxLength={2000}
              value={form.message}
              onChange={(e) => setField("message", e.target.value)}
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Sending…" : "Send message"}
          </button>
        </form>
      )}
    </div>
  );
}
