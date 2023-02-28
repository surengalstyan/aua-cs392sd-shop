import { relationalDb } from "database/relational-db";

const getStockByProductId = async (id: string) => {
  return await relationalDb.stock.findFirst({
    where: {
      productId: id,
    },
  });
};

export { getStockByProductId };
