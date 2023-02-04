import express from "express";
import { Database } from "./database";
import cors from "cors";
const database = new Database();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/products", async (req, res) => {
  const products = await database.product.findMany();
  res.json(products);
});

app.get("/product/:id", async (req, res) => {
  const { id } = req.params;

  const product = await database.product.findFirst({
    where: {
      id: Number(id),
    },
  });

  res.json(product);
});

app.get("/stock/:productId", async (req, res) => {
  const { productId } = req.params;

  const stock = await database.stock.findFirst({
    where: {
      productId: Number(productId),
    },
  });

  res.json(stock);
});

app.post("/order/:productId", async (req, res) => {
  const { productId } = req.params;

  const order = await database.$transaction(async (db) => {
    const stock = await db.stock.findFirst({
      where: {
        productId: Number(productId),
        count: { gt: 0 },
      },
    });

    if (!stock) {
      res
        .sendStatus(404)
        .json({ errorMessage: "the product is not available currently" });
      return;
    }

    db.order.create({
      data: {
        productId: Number(productId),
        stockId: stock.id,
        count: 1,
      },
    });

    return db.stock.update({
      where: {
        id: stock.id,
      },
      data: {
        count: { decrement: 1 },
      },
    });
  });

  res.json(order);
});

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`)
);
