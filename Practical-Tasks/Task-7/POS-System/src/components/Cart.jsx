import React from 'react';
import './Cart.css';

const Cart = ({ cart, onRemove }) => {
  const totalItems = cart.reduce((total, item) => total + item.qty, 0);
  
  return (
    <div className="cart-container">
      <h2 className="cart-heading text-xl font-semibold text-gray-700">
        🛍️ Cart {totalItems > 0 && `(${totalItems} items)`}
      </h2>
      
      {cart.length === 0 ? (
        <div className="cart-empty">
          Your cart is empty. Add some items!
        </div>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map(item => (
              <li key={item.id} className="cart-item cart-item-enter">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-quantity">× {item.qty}</span>
                  <span className="cart-item-price">₹{item.qty * item.price}</span>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="cart-item-remove"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          
          <div className="cart-summary">
            <div className="cart-total">
              Total Items: {totalItems}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;