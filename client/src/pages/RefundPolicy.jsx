export default function RefundPolicy() {
  return (
    <div className="container section legal-page">
      <h1>Refund &amp; Return Policy</h1>
      <p className="legal-updated">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

      <h2>Personalized items are final sale</h2>
      <p>
        Because every item we make is personalized specifically for you —
        with names, messages, photos, or other details you provide — we're
        unable to accept returns or offer refunds simply for a change of
        mind once production has started. This is standard for made-to-order,
        personalized goods.
      </p>

      <h2>Damaged or incorrect orders</h2>
      <p>
        We want you to be happy with what arrives. If your order arrives
        damaged, defective, or doesn't match what you ordered, contact us
        within 7 days of delivery with:
      </p>
      <ul>
        <li>Your order reference number</li>
        <li>A photo showing the issue</li>
        <li>A brief description of what's wrong</li>
      </ul>
      <p>
        We'll review and make it right — typically with a replacement or a
        refund, depending on the situation.
      </p>

      <h2>Errors we're responsible for</h2>
      <p>
        If an item doesn't match the personalization details you actually
        submitted at checkout (for example, a misspelled name that we
        typed incorrectly, not one you entered incorrectly), that's on us
        and we'll fix it at no cost to you.
      </p>

      <h2>Errors in the information you provided</h2>
      <p>
        Since we produce each order exactly as submitted, we can't offer a
        free remake if the personalization details you entered (name
        spelling, dates, wording, uploaded photos) turn out to have a
        mistake you made. We're happy to discuss a paid remake in these
        cases — just reach out.
      </p>

      <h2>Lost or delayed shipments</h2>
      <p>
        If your order hasn't arrived within a reasonable time of the
        estimate given at checkout, contact us and we'll look into it with
        our shipping carrier on your behalf.
      </p>

      <h2>Contact us</h2>
      <p>
        For anything related to a return, refund, or an issue with your
        order, email{" "}
        <a href="mailto:madeforyou.vercel@gmail.com">madeforyou.vercel@gmail.com</a>{" "}
        with your order reference number.
      </p>
    </div>
  );
}
