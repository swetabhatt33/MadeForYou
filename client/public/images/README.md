Put your product photos here. Each product supports multiple photos —
list them in `server/data/products.js` under that product's `images`
array, in the order you want them to appear (the first one is used as
the cover photo in the catalogue and cart).

Suggested naming, matching what's already set up in products.js:

  gift-box-1.jpg,      gift-box-2.jpg,      gift-box-3.jpg
  gift-card-1.jpg,     gift-card-2.jpg
  invitations-1.jpg,   invitations-2.jpg

You can use as many or as few as you like per product — add or remove
entries from the `images` array to match. Any of .jpg, .jpeg, .png, or
.webp works.

Recommended: roughly square or 4:5 portrait photos, at least 800px on the
short side, so they stay sharp in both the catalogue grid and the
full-size product gallery.

If a listed file is missing or fails to load, it's automatically skipped
— and if none of a product's photos load, the site falls back to the
line-art icon. Nothing breaks either way.
