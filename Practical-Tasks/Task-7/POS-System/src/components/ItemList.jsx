import React from 'react';
import './ItemList.css';

const ItemList = ({ items, onAdd }) => (
  <div className="items-container">
    <h2 className="items-heading text-xl font-semibold text-gray-700">📦 Available Items</h2>
    
    {items.length === 0 ? (
      <div className="empty-items">
        No items match your search. Try another keyword.
      </div>
    ) : (
      <div className="items-grid">
        {items.map(item => (
          <div
            key={item.id}
            className="item-card"
          >
            <div className="item-name">{item.name}</div>
            <div className="item-price">{item.price}</div>
            <button
              onClick={() => onAdd(item)}
              className="item-add-button"
            >
              <span>+</span> Add
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default ItemList;