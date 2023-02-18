import { validateId } from "api/utils/validators";
import { orderByProductId } from "app/order";
import { getAllProducts, getProductById } from "app/product";
import { getStockByProductId } from "app/stock";
import express from "express";

const router = express.Router();

router.get("/products", async (req, res) => {
  const products = await getAllProducts();
  res.json(products);
});

router.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  validateId(productId);

  const product = await getProductById(Number(productId));

  res.json(product);
});

router.get("/products/:productId/stock", async (req, res) => {
  const { productId } = req.params;
  validateId(productId);

  const stock = await getStockByProductId(Number(productId));

  res.json(stock);
});

router.post("/products/:productId/order", async (req, res) => {
  const productId = Number(req.params.productId);
  validateId(productId);

  const stock = await getStockByProductId(productId);
  if (!stock) {
    res
      .sendStatus(404)
      .json({ errorMessage: "the product is not available currently" });
    return;
  }

  const order = await orderByProductId(productId);

  res.json(order);
});

export { router as internalApi };
