import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PrescriptionForm = ({ onSubmit, onCancel }) => {
  const [prescription, setPrescription] = useState('');
  const [days, setDays] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prescription.trim() || !days || isNaN(days) || days <= 0) {
      alert('Please enter valid prescription and number of days.');
      return;
    }
    onSubmit({ prescription, days: parseInt(days) });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h4>Add Prescription</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Prescription Details</label>
            <ReactQuill value={prescription} onChange={setPrescription} />
          </div>
          <div className="form-group">
            <label>Number of Days</label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 5"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              required
            />
          </div>
          <div className="btn-group">
            <button type="button" onClick={onCancel}>Cancel ❌</button>
            <button type="submit">Submit 💊</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionForm;
