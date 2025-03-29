import React from "react";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import Aboutus from "./components/Aboutus";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />  {/* Redirect "/" to "/home" */}
          <Route path="/home" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/proddetails" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
