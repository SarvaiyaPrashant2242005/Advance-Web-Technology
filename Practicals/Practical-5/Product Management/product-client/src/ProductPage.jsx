import React, { useEffect, useState } from "react";
import axios from "axios";
import './ProductPage.css';


function ProductPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", category: "" });

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/products", form);
    setForm({ name: "", price: "", category: "" });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <button type="submit">Add Product</button>
      </form>

      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} - ₹{p.price} [{p.category}]
            <button onClick={() => deleteProduct(p._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductPage;
