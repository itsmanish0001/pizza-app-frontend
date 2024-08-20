//this is root component
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./component/Navigation";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import { CartContext } from "./CartContext";
import { useEffect, useState } from "react";
import { getCart, storeCart } from "./helper";

const App = () => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    getCart().then((cart) => {
      setCart(JSON.parse(cart));
    });
  }, []);

  useEffect(() => {
    storeCart(JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <BrowserRouter>
        <CartContext.Provider value={{ cart, setCart }}>
          <Navigation></Navigation>
          <Routes>
            <Route path="/" Component={Home}></Route>
            <Route path="/products" Component={ProductsPage}></Route>
            <Route path="/products/:_id" Component={SingleProduct}></Route>
            <Route path="/cart" Component={Cart}></Route>
          </Routes>
        </CartContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
