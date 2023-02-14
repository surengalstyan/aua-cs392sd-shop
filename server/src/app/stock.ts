import { database } from "database";

const getStockByProductId = async (id: number) => {
  return await database.stock.findFirst({
    where: {
      productId: Number(id),
    },
  });
};

export { getStockByProductId };
