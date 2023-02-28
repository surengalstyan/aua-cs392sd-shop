import { validate, validateId } from "api/utils/validators";
import { orderByProductId } from "app/order";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "app/product";
import { getStockByProductId } from "app/stock";
import express from "express";
const router = express.Router();

// create
router.post("/products", async (req, res) => {
  const payload = req.body;
  validate(payload, {
    title: {
      presence: true,
      length: { minimum: 1, maximum: 256 },
      type: "string",
    },
    description: {
      presence: true,
      length: { minimum: 1, maximum: 4096 },
      type: "string",
    },
    image: {
      presence: true,
      length: { minimum: 1, maximum: 2048 },
      type: "string",
    },
  });

  const products = await createProduct(payload);
  res.json(products);
});

// update
router.put("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const payload = req.body;
  validateId(productId);
  validate(payload, {
    title: {
      length: { minimum: 1, maximum: 256 },
      type: "string",
    },
    description: {
      length: { minimum: 1, maximum: 4096 },
      type: "string",
    },
    image: {
      length: { minimum: 1, maximum: 2048 },
      type: "string",
    },
  });

  const products = await updateProduct(productId, payload);
  res.json(products);
});

// delete
router.delete("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  validateId(productId);

  await deleteProduct(productId);
  res.sendStatus(200);
});

// get all
router.get("/products", async (req, res) => {
  const products = await getAllProducts();
  res.json(products);
});

// get by id
router.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  validateId(productId);

  const product = await getProductById(productId);
  res.json(product);
});

// get available stock
router.get("/products/:productId/stock", async (req, res) => {
  const { productId } = req.params;
  validateId(productId);

  const stock = await getStockByProductId(productId);
  res.json(stock);
});

// do order
router.post("/products/:productId/order", async (req, res) => {
  const productId = req.params.productId;
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

export { router as productsApi };
