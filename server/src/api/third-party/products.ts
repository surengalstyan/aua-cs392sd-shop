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
  try {
    console.log(payload);
    const products = await createProduct(payload);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// update
router.put("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const payload = req.body;
  try {
    const products = await updateProduct(Number(productId), payload);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// delete
router.delete("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    await deleteProduct(Number(productId));
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// get all
router.get("/products", async (req, res) => {
  const products = await getAllProducts();
  res.json(products);
});

// get by id
router.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const product = await getProductById(Number(productId));
  res.json(product);
});

// get available stock
router.get("/products/:productId/stock", async (req, res) => {
  const { productId } = req.params;
  const stock = await getStockByProductId(Number(productId));
  res.json(stock);
});

// do order
router.post("/products/:productId/order", async (req, res) => {
  const productId = Number(req.params.productId);

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
