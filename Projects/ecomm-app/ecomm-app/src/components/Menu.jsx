import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <Link to="/home">Home</Link>&nbsp;
      <Link to="/aboutus">About us</Link>&nbsp;
      <Link to="/proddetails">Product</Link>
    </div>
  );
};

export default Menu;