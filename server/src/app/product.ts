import { documentDb } from "database/document-db";

const getAllProducts = async () => {
  return await documentDb.product.findMany();
};

const getProductById = async (id: string) => {
  return await documentDb.product.findFirst({
    where: {
      id,
    },
  });
};

const createProduct = async (product: any) => {
  return await documentDb.product.create({ data: product });
};

const updateProduct = async (id: string, product: any) => {
  return await documentDb.product.update({ where: { id }, data: product });
};

const deleteProduct = async (id: string) => {
  return await documentDb.product.delete({ where: { id } });
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
