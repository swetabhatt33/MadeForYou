/**
 * Renders plain text, converting **this** into bold <strong> text.
 * Lets content in server/data/products.js use **double asterisks**
 * around any word or phrase to make it bold on the page, without
 * needing real HTML in the data file.
 *
 * Example: "Comes with **free gift wrap** included."
 */
export function renderRichText(text) {
  if (!text) return text;
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}