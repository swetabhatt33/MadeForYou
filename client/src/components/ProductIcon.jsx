const THEME_COLORS = {
  brass: "#a47a3e",
  burgundy: "#5b1a1a",
  green: "#16241f",
};

export default function ProductIcon({ productId, theme = "brass", className }) {
  const color = THEME_COLORS[theme] || THEME_COLORS.brass;

  if (productId === "gift-box") {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <rect x="14" y="38" width="72" height="48" stroke={color} strokeWidth="2" />
        <path d="M14 50h72" stroke={color} strokeWidth="2" />
        <path d="M50 38v48" stroke={color} strokeWidth="2" />
        <path
          d="M50 38c-6-14-26-14-26 0M50 38c6-14 26-14 26 0"
          stroke={color}
          strokeWidth="2"
        />
        <circle cx="50" cy="50" r="6" fill={color} />
      </svg>
    );
  }

  if (productId === "gift-card") {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <rect x="10" y="28" width="80" height="50" rx="3" stroke={color} strokeWidth="2" />
        <path d="M10 44h80" stroke={color} strokeWidth="2" />
        <circle cx="50" cy="61" r="9" stroke={color} strokeWidth="2" />
        <path d="M50 55v12M44 61h12" stroke={color} strokeWidth="1.4" />
      </svg>
    );
  }

  //invitations
  if (productId === "invitations") {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <rect x="12" y="24" width="76" height="54" rx="2" stroke={color} strokeWidth="2" />
        <path d="M12 26l38 30 38-30" stroke={color} strokeWidth="2" />
        <circle cx="50" cy="52" r="5.5" fill={color} opacity="0.85" />
      </svg>
    );
  }

  // return-gifts (and fallback default)
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path d="M30 42c0-12 8-20 20-20s20 8 20 20" stroke={color} strokeWidth="2" />
      <path
        d="M24 42h52l-4 40a4 4 0 01-4 3.6H32a4 4 0 01-4-3.6l-4-40z"
        stroke={color}
        strokeWidth="2"
      />
      <path d="M24 42h52" stroke={color} strokeWidth="2" />
      <circle cx="50" cy="60" r="6" fill={color} opacity="0.85" />
    </svg>
  );
}
