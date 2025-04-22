import React from 'react';
import './Bill.css';

const Bill = ({ cart, onClear }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="pt-6 border-t border-gray-300">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">🧾 Final Bill</h2>

      {cart.length === 0 ? (
        <p className="bill-empty">No items to bill.</p>
      ) : (
        <div className="bill-container receipt-paper rounded-lg shadow-lg p-6 print-animation">
          <div className="bill-header">
            <h3 className="bill-logo">🛒 Mini Mart POS</h3>
            <p className="bill-thank-you">Thank you for shopping!</p>
          </div>

          <table className="bill-table">
            <thead className="bill-table-header">
              <tr>
                <th>Item</th>
                <th className="text-right">Qty</th>
                <th className="text-right">Price</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="bill-table-row">
                  <td>{item.name}</td>
                  <td className="text-right">{item.qty}</td>
                  <td className="text-right">₹{item.price}</td>
                  <td className="text-right">₹{item.price * item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bill-total">
            Total Amount: ₹{total}
          </div>

          <div className="bill-footer">
            <p>~ This is a computer-generated bill ~</p>
            <p className="bill-timestamp">{today}</p>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={onClear}
              className="bill-confirm-button"
            >
              Confirm & Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bill;