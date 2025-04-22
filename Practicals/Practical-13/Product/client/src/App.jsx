import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ErrorBoundary from './components/ErrorBoundary.jsx';


function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="App">
      <ErrorBoundary>
        <header className="header">
          <h1>Product Management</h1>
        </header>
        <div className="form-container">
          <h2>Add New Product</h2>
          <ProductForm onSuccess={() => setRefresh(!refresh)} />
        </div>
        <ErrorBoundary>
          <div className="product-list">
            <ProductList />
          </div>
        </ErrorBoundary>
      </ErrorBoundary>
    </div>
  );
}

export default App;