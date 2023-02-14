import { database } from "database";

const getAllProducts = async () => {
  return await database.product.findMany();
};

const getProductById = async (id: number) => {
  return await database.product.findFirst({
    where: {
      id,
    },
  });
};

const createProduct = async (product: any) => {
  return await database.product.create({ data: product });
};

const updateProduct = async (id: number, product: any) => {
  return await database.product.update({ where: { id }, data: product });
};

const deleteProduct = async (id: number) => {
  return await database.product.delete({ where: { id } });
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
