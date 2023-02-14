import { database } from "database";

const orderByProductId = async (productId: number) => {
  const order = await database.$transaction(async (db) => {
    const stock = await db.stock.findFirst({
      where: {
        productId,
        count: { gt: 0 },
      },
    });

    if (!stock) {
      throw new Error(`product not in a stock: productId:${productId}`);
    }

    await db.order.create({
      data: {
        productId,
        stockId: stock?.id,
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

  return order;
};

export { orderByProductId };
