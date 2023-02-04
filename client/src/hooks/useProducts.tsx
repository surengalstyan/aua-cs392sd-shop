import { useEffect, useState } from "react";

function useProducts() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_SERVER_URL + '/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, [])

  return {
    products,
    loading,
  }

}

export default useProducts;