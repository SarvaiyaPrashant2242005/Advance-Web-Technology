import { useState } from 'react';
import './App.css';

function App() {
  const [price, setPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [totalGST, setTotalGST] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  const calculateGST = () => {
    const priceValue = parseFloat(price);
    const taxValue = parseFloat(taxRate);

    if (!isNaN(priceValue) && !isNaN(taxValue)) {
      const gst = (priceValue * taxValue) / 100;
      const cgstValue = gst / 2;
      const sgstValue = gst / 2;
      const final = priceValue + gst;

      setCgst(cgstValue.toFixed(2));
      setSgst(sgstValue.toFixed(2));
      setTotalGST(gst.toFixed(2));
      setFinalPrice(final.toFixed(2));
    }
  };

  return (
    <div className="container">
      <h2>GST Calculator</h2>
      <div className="input-group">
        <label>Enter Price (₹):</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="e.g. 1000"
        />
      </div>
      <div className="input-group">
        <label>Enter Tax Rate (%):</label>
        <input
          type="number"
          value={taxRate}
          onChange={(e) => setTaxRate(e.target.value)}
          placeholder="e.g. 18"
        />
      </div>
      <button onClick={calculateGST}>Calculate</button>

      <div className="results">
        <p><strong>CGST:</strong> ₹{cgst}</p>
        <p><strong>SGST:</strong> ₹{sgst}</p>
        <p><strong>Total GST:</strong> ₹{totalGST}</p>
        <p><strong>Final Price:</strong> ₹{finalPrice}</p>
      </div>
    </div>
  );
}

export default App;
