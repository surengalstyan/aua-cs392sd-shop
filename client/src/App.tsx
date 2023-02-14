import { useEffect, useState } from "react";
import logo from "./assets/logo-white.png";
import "./App.css";
import useProducts from "./hooks/useProducts";
import useStock from "./hooks/useStock";
import useOrder from "./hooks/useOrder";

function Product({ product }: any) {
  const [opened, setOpened] = useState(false);
  const { getStock, stock, loading } = useStock(product.id);
  const { doOrder, order, loading: ordering } = useOrder(product.id);

  useEffect(() => {
    if (opened) {
      getStock();
    }
  }, [opened]);

  return (
    <div
      className="product"
      style={{ cursor: opened ? "unset" : "pointer" }}
      onClick={() => setOpened(true)}
    >
      <img src={`${product.image}`}></img>
      <h2>{product.title}</h2>
      <h5>{product.description}</h5>
      {opened && (
        <>
          {loading && <div>loading...</div>}
          {stock && (
            <div className="checkout">
              <span>
                <b>{order ? stock.count - 1 : stock.count}</b> items is
                currently available.
              </span>
              <br></br>
              <span>
                Price after dicount <b>${stock.price}</b>
              </span>
              <br></br>
              {!order &&
                stock.count > 0 &&
                (ordering ? (
                  <span>Moment please</span>
                ) : (
                  <button disabled={ordering} onClick={doOrder}>
                    {ordering ? "Moment please" : "ORDER"}
                  </button>
                ))}
            </div>
          )}
          {order && (
            <div>
              <h4>Thank You! Your order is successfully placed.</h4>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function App() {
  const { products, loading } = useProducts();

  return (
    <div className="App">
      <div>
        <a href="/">
          <img src={logo} className="logo" alt="logo" />
        </a>
      </div>
      <h1>Products</h1>
      {loading && <h2>Loading...</h2>}
      <div className="products">
        {products.map((p) => (
          <Product product={p} key={p.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
