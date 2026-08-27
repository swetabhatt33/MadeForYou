export default function PrivacyPolicy() {
  return (
    <div className="container section legal-page">
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

      <p>
        Made For You ("we," "us," or "our") respects your privacy. This
        policy explains what information we collect when you use this
        website, why we collect it, and how it's handled.
      </p>

      <h2>Information we collect</h2>
      <p>When you place an order, we collect:</p>
      <ul>
        <li>Your name and email address</li>
        <li>Order and personalization details you provide (recipient names, messages, event dates, and similar text you enter into product forms)</li>
        <li>Photos you choose to upload for personalized products</li>
        <li>Payment is handled entirely by Stripe — we do not see or store your card details</li>
      </ul>

      <h2>How we use this information</h2>
      <ul>
        <li>To prepare, personalize, and fulfill your order</li>
        <li>To send you an order confirmation and updates about your order</li>
        <li>To respond if you contact us with a question</li>
      </ul>
      <p>We do not sell your personal information to third parties.</p>

      <h2>Third-party services we use</h2>
      <p>
        To operate this store, we share limited information with a small
        number of service providers, each acting on our behalf:
      </p>
      <ul>
        <li><strong>Stripe</strong> — processes payments securely; we never see your full card number</li>
        <li><strong>Cloudinary</strong> — stores photos you upload for personalized products</li>
        <li><strong>Resend</strong> — sends order confirmation emails</li>
        <li>Our hosting providers, who run the servers this site operates on</li>
      </ul>

      <h2>How long we keep your information</h2>
      <p>
        We retain order records and associated personalization details
        (including uploaded photos) for as long as needed to fulfill your
        order and for our own business records afterward. If you'd like us
        to delete your information, contact us and we'll do so except
        where we're required to keep records (for example, for tax
        purposes).
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us at any time to tell you what information we hold
        about you, correct it, or delete it, by contacting us using the
        details below.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The "last updated"
        date at the top of this page reflects the most recent version.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy or your information? Email us at{" "}
        <a href="mailto:madeforyou.vercel@gmail.com">madeforyou.vercel@gmail.com</a>.
      </p>
    </div>
  );
}
