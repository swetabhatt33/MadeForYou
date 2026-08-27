export default function ShippingPolicy() {
  return (
    <div className="container section legal-page">
      <h1>Shipping Policy</h1>
      <p className="legal-updated">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

      <h2>Production time</h2>
      <p>
        Every item is personalized and made to order after you check out —
        it isn't sitting pre-made on a shelf. Please allow{" "}
        <strong>[X–X business days]</strong> for us to prepare your order
        before it ships. Orders with multiple personalized items (like
        several return gifts) may take longer, since each one is set up
        individually.
      </p>

      <h2>Shipping time</h2>
      <p>
        Once your order ships, delivery typically takes{" "}
        <strong>[X–X business days]</strong>, depending on your location.
        You'll receive a confirmation once your order is on its way.
      </p>

      <h2>Where we ship</h2>
      <p>
        We currently ship to <strong>[list the regions/countries you serve]</strong>.
        If you're unsure whether we deliver to your area, email us before
        ordering and we'll confirm.
      </p>

      <h2>Shipping costs</h2>
      <p>
        Shipping cost is calculated and shown at checkout before you pay,
        based on your order and delivery address.
      </p>

      <h2>Tracking</h2>
      <p>
        [If you provide tracking numbers, describe how customers receive
        them here — e.g. "You'll receive a tracking number by email once
        your order ships."]
      </p>

      <h2>Questions about your order</h2>
      <p>
        For anything related to shipping or delivery, email{" "}
        <a href="mailto:madeforyou.vercel@gmail.com">madeforyou.vercel@gmail.com</a>{" "}
        with your order reference number.
      </p>
    </div>
  );
}
