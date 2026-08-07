import { findVariant } from "./data/products.js";

// Recomputes every line item's price from the server-side catalogue.
// Never trust a price sent by the client. Throws a descriptive error
// if the cart references something invalid so the route can return 400.
export function priceCart(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Cart is empty.");
  }

  let subtotal = 0;
  const pricedItems = items.map((item, i) => {
    const { productId, variantId, quantity, personalization } = item;
    const qty = Number(quantity) || 1;

    if (qty < 1 || qty > 20) {
      throw new Error(`Item ${i + 1}: quantity must be between 1 and 20.`);
    }

    const found = findVariant(productId, variantId);
    if (!found) {
      throw new Error(`Item ${i + 1}: unknown product or variant.`);
    }
    const { product, variant } = found;

    // Validate required personalization fields are present.
    for (const field of product.personalizationFields) {
      if (field.required) {
        const val = personalization?.[field.name];
        if (val === undefined || val === null || String(val).trim() === "") {
          throw new Error(
            `Item ${i + 1}: "${field.label}" is required for ${product.name}.`
          );
        }
      }
    }

    const lineTotal = variant.price * qty;
    subtotal += lineTotal;

    return {
      productId,
      variantId,
      productName: product.name,
      variantLabel: variant.label,
      unitPrice: variant.price,
      quantity: qty,
      lineTotal,
      personalization: personalization || {},
    };
  });

  return { items: pricedItems, subtotal, currency: "usd" };
}
