// Server-side product catalogue. This is the ONLY place prices are trusted.
// The client sends productId + variantId + personalization; the server
// looks up the real price here and ignores any price the client sends.

export const PRODUCTS = [
    {
    id: "gift-box",
    name: "Personalized Gift Boxes",
    tagline: "Because Every Story Deserves a Special Gift.",
    description:
      "We transform your emotions into beautifully curated gift experiences. Each personalized box is thoughtfully designed to capture memories, celebrate milestones, and make every occasion unforgettable. Each box comes with:",
    includes: [
      "A handmade card",
      "Chocolates",
      "A photo frame",
      "A fridge magnet",
      "Goat milk soap",
    ],
    theme: "brass",
    images: [
      "/images/gift-box-1.jpg",
      "/images/gift-box-2.jpg",
      "/images/gift-box-3.jpg",
      "/images/gift-box-4.jpg",
	  "/images/gift-box-5.jpg",
    ],
    colorImages: {
    fieldName: "boxColor",
    options: {
      "Ivory/Gold": "/images/gift-box-5.jpg",
      "Purple/Silver": "/images/gift-box-4.jpg",
      "Blue/Sliver": "/images/gift-box-1.jpg",
      "Burgundy/White": "/images/gift-box-2.jpg",
      "Rose Pink/Gold": "/images/gift-box-3.jpg",
  },
},
    variants: [{ id: "standard", label: "Gift Box", price: 5200 }],
    personalizationFields: [
      {
        name: "recipientName",
        label: "Recipient name",
        type: "text",
        maxLength: 30,
        required: true,
      },
      {
        name: "recipientRelation",
        label: "Relationship to recipient",
        type: "text",
        maxLength: 15,
        required: true,
      },
      {
        name: "Greeting card message",
        label: "Message to be written in card",
        type: "textarea",
        maxLength: 250,
        required: false,
      },
      {
        name: "boxColor",
        label: "Box Color",
        type: "select",
        options: ["Ivory/Gold", "Purple/Silver", "Blue/Sliver", "Burgundy/White","Rose Pink/Gold"],
        required: true,
      },
	{
        name: "chocolateType",
        label: "Chocolate flavour",
        type: "select",
        options: ["Lindt - Dark chocolate ", "Ferrero Rocher"],
        required: true,
      },
    ],
  },
  {
    id: "greeting-card",
    name: "Personalized Greeting Cards",
    tagline: "Your words transform into beautiful poetry—whether it be a story or express the deepest emotions.",
    description:
      "A personalized greeting card that brings your story to life through heartfelt pictures and beautifully crafted poetry—capturing memories and emotions you’ll cherish forever.** Your story, your memories, your vision—transformed into a custom-designed picture on a greeting card made just for you.**",
    theme: "burgundy",
    images: [
      "/images/greeting-card-1.jpg",
      "/images/greeting-card-2.jpg",
	  "/images/greeting-card-3.jpg",
    ],
    variants: [{ id: "standard", label: "Greeting Card", price: 1500 }],
    personalizationFields: [
      {
        name: "recipientName",
        label: "Recipient name",
        type: "text",
        maxLength: 30,
        required: true,
      },
      {
        name: "fromName",
        label: "From",
        type: "text",
        maxLength: 30,
        required: true,
      },
      {
        name: "message",
        label: "Personal message",
        type: "textarea",
        maxLength: 200,
        required: false,
      },
    ],
  },
  {
    id: "invitations",
    name: "Personalized Invitations",
    tagline: "Letterpress invitations, invitation boxes, invitation baskets",
    description:
      "Invitations specially designed your occasion, set by hand for weddings, milestones, and celebrations of every kind.",
    theme: "green",
    images: [
      "/images/invitations-1.jpg",
      "/images/invitations-2.jpg",
    ],
    variants: [
  { id: "letterpress", label: "LetterPress Invitation — pack of 10 cards", price: 1200 },
  { id: "basket", label: "Invitation Basket — 1 unit", price: 1500 },
  { id: "box", label: "Invitation Box — 1 unit", price: 1500 },
],
variantFieldLabel: "Invitation Type",
    personalizationFields: [
      {
        name: "eventType",
        label: "Occasion",
        type: "select",
        options: ["Wedding", "Birthday", "Anniversary", "Baby Shower", "Other"],
        required: true,
      },
      {
        name: "hostNames",
        label: "Host / celebrant name(s)",
        type: "text",
        maxLength: 60,
        required: true,
      },
      {
        name: "eventDate",
        label: "Event date",
        type: "date",
        required: true,
      },
      {
        name: "venue",
        label: "Venue / location",
        type: "text",
        maxLength: 80,
        required: false,
      },
      {
        name: "message",
        label: "Additional wording",
        type: "textarea",
        maxLength: 200,
        required: false,
      },
      {
        name: "theme",
        label: "Design theme",
        type: "select",
        options: [
          "Botanical",
          "Royal",
          "Modern Minimal",
          "Vintage",
        ],
        required: true,
      },
    ],
  },
{
    id: "return-gifts",
    name: "Personalized Return Gifts",
    tagline: "Small tokens of thanks, personalized for every guest.",
    description:
      "Thoughtful little keepsakes for weddings, birthdays, and celebrations — personalized with a name or a short note so every guest takes home something made just for them.",
    theme: "burgundy",
    images: [
      "/images/return-gifts-1.jpg",
      "/images/return-gifts-2.jpg",
    ],
variants: [
  { id: "return-gift", label: "Pack of 7", price: 5200 }
],
    personalizationFields: [
      {
        name: "eventType",
        label: "Occasion",
        type: "select",
        options: ["Wedding", "Birthday", "Baby Shower", "Housewarming", "Other"],
        required: true,
      },
      {
        name: "guestNote",
        label: "Name or note for the tag",
        type: "text",
        maxLength: 40,
        required: false,
      },
	 {
        name: "packagingType",
        label: "Packaging Type",
        type: "select",
        options: 
			["Kraft bag","Basket","Box"],
        required: true,
      },
      {
        name: "giftOptions",
        label: "Gift Options",
        type: "select",
        options: 
			["Mini mug + hot chocolate/coffee + thank-you card",
			 "Scented candle + hot chocolate/coffee+ thank-you card",
			 "organic soap + hot chocolate/coffee + thank-you card",
			 "colors + color book + organic chips +thank-you card"],
        required: true,
      },
      {
        name: "additionalNote",
        label: "Additional Note",
        type: "textarea",
        maxLength: 120,
        required: false,
      },
    ],
  },
];

export function findProduct(productId) {
  return PRODUCTS.find((p) => p.id === productId) || null;
}

export function findVariant(productId, variantId) {
  const product = findProduct(productId);
  if (!product) return null;
  const variant = product.variants.find((v) => v.id === variantId);
  if (!variant) return null;
  return { product, variant };
}
