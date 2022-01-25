import React from "react";
import Footer from "./Components/Footer";
import Products from "./Products";
import ProductDetails from "./Components/ProductDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./Cart";
import Login from "./Login";
import Signup from "./Signup";
import BillingInfo from "./BillingInfo";
import ErrorPage from "./ErrorPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/emart" element={<Products />} />
        <Route path="/product">
          <Route path=":id" element={<ProductDetails />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/billing" element={<BillingInfo />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};
export default App;
