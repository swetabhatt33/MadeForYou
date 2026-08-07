export default function WaxSeal({ initials = "V&S", size = 148 }) {
  return (
    <div className="seal" style={{ width: size, height: size }} aria-hidden="true">
      <span className="seal-initials">{initials || "?"}</span>
    </div>
  );
}
