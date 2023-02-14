import { useEffect, useState } from "react";

function useStock(productId: string) {
  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState<any>(null);

  const getStock = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + "/products/" + productId + "/stock"
      );
      const data = await response.json();
      setStock(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return {
    getStock,
    stock,
    loading,
  };
}

export default useStock;
