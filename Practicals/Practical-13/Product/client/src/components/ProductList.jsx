import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../services/productService';
// import { deleteProduct, getProducts } from '../services/productService';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      // Ensure we're working with an array
      const productsData = Array.isArray(response?.data?.data) 
        ? response.data.data 
        : Array.isArray(response?.data) 
          ? response.data 
          : [];
      setProducts(productsData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
      setProducts([]); // Ensure products is always an array
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id); // Make sure this matches your import
      fetchProducts();
    } catch (err) {
      setError('Failed to delete product');
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ul style={{ listStyle: 'none' }}>
          {products.map(product => (
            <li key={product._id} className="product-item">
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-price">${product.price}</div>
                {product.description && <p>{product.description}</p>}
              </div>
              <div className="product-actions">
                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ProductList;