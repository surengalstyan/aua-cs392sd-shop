import { useState } from "react";

function useOrder(productId: string) {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);

  const doOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + "/products/" + productId + "/order",
        { method: "POST" }
      );
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return {
    doOrder,
    order,
    loading,
  };
}

export default useOrder;
