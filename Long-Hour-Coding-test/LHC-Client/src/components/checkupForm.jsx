import React from 'react';
import './CheckupForm.css';

const CheckupForm = ({ patientId, data, onChange, onSubmit, onCancel }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h4>Patient ID: {patientId}</h4>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Height (cm)</label>
            <input type="number" name="height" value={data.height} onChange={onChange} required placeholder="48 cm" />
          </div>
          <div className="form-group">
            <label>Weight (kg)</label>
            <input type="number" name="weight" value={data.weight} onChange={onChange} required placeholder="22 kg" />
          </div>
          <div className="form-group">
            <label>BP</label>
            <input type="text" name="bp" value={data.bp} onChange={onChange} required placeholder="120/80" />
          </div>
          <div className="form-group">
            <label>Remarks</label>
            <input type="text" name="remarks" value={data.remarks} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label>Complains</label>
            <input type="text" name="complains" value={data.complains} onChange={onChange} required />
          </div>
          <div className="btn-group">
            <button type="button" onClick={onCancel}>Cancel ❌</button>
            <button type="submit">Next ➡️</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckupForm;
