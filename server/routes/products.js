import { Router } from "express";
import { PRODUCTS, findProduct } from "../data/products.js";

export const productsRouter = Router();

productsRouter.get("/", (req, res) => {
  res.json({ products: PRODUCTS });
});

productsRouter.get("/:id", (req, res) => {
  const product = findProduct(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found." });
  res.json({ product });
});
