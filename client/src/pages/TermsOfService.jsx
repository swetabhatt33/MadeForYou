export default function TermsOfService() {
  return (
    <div className="container section legal-page">
      <h1>Terms of Service</h1>
      <p className="legal-updated">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

      <p>
        These terms govern your use of this website and any purchase you
        make from Made For You. By placing an order, you agree to them.
      </p>

      <h2>Orders and personalization</h2>
      <p>
        Every item on this site is made to order based on the details you
        provide — names, messages, photos, dates, and similar
        personalization. It's your responsibility to check this
        information for accuracy before submitting your order, since
        production begins based on exactly what you enter.
      </p>

      <h2>Pricing and payment</h2>
      <p>
        All prices are listed in USD and are charged in full at checkout
        via Stripe. We reserve the right to correct pricing errors, and to
        update prices for future orders at any time.
      </p>

      <h2>Production and shipping times</h2>
      <p>
        Because each order is personalized and made by hand, please allow
        reasonable production time before shipment. See our{" "}
        <a href="/shipping-policy">Shipping Policy</a> for current
        timelines.
      </p>

      <h2>Cancellations and changes</h2>
      <p>
        Since production on personalized items often begins shortly after
        an order is placed, we can only accommodate cancellations or
        changes if you contact us promptly after ordering and production
        hasn't yet started. Once an item is in production, it can no
        longer be changed or canceled.
      </p>

      <h2>Returns and refunds</h2>
      <p>
        Please see our <a href="/refund-policy">Refund Policy</a> for full
        details on returns, refunds, and what to do if something arrives
        damaged or incorrect.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Please don't submit personalization content (text or photos) that
        is illegal, infringes someone else's rights, or that you don't
        have permission to use. We reserve the right to decline or cancel
        an order for these reasons.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        We aim for every order to arrive exactly as intended, but to the
        extent permitted by law, our liability for any issue with an order
        is limited to the amount you paid for that order.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. Continued use of this
        site after changes means you accept the updated terms.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions? Email us at{" "}
        <a href="mailto:madeforyou.vercel@gmail.com">madeforyou.vercel@gmail.com</a>.
      </p>
    </div>
  );
}
