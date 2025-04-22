import React, { useState, useEffect } from 'react';
import items from './data/items';
import ItemList from './components/ItemList.jsx';
import Cart from './components/Cart.jsx';
import Bill from './components/Bill.jsx';
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);

  // Show notification when item is added to cart
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
  };

  const addToCart = (item) => {
    const exists = cart.find(i => i.id === item.id);
    if (exists) {
      setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      showNotification(`Added another ${item.name} to cart`);
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
      showNotification(`${item.name} added to cart`);
    }
  };

  const removeFromCart = (id) => {
    const itemToRemove = cart.find(i => i.id === id);
    if (itemToRemove) {
      setCart(cart.filter(i => i.id !== id));
      showNotification(`${itemToRemove.name} removed from cart`);
    }
  };

  const clearCart = () => {
    setCart([]);
    showNotification("Cart cleared, purchase complete!");
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <header className="app-header">
          <h1 className="app-title">🛒 POS System</h1>
          <p className="app-subtitle">Fast checkout for your retail needs</p>
        </header>

        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search items..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <section className="section">
          <ItemList items={filteredItems} onAdd={addToCart} />
        </section>
        
        <div className="divider"></div>
        
        <section className="section">
          <Cart cart={cart} onRemove={removeFromCart} />
        </section>
        
        <div className="divider"></div>
        
        <section>
          <Bill cart={cart} onClear={clearCart} />
        </section>
        
        <footer className="app-footer">
          © {new Date().getFullYear()} Mini Mart POS System
        </footer>
      </div>
      
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
    </div>
  );
};

export default App;