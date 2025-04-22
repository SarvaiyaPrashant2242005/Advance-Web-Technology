import React, { useState, useEffect } from 'react';

const PaymentDetails = ({ patientId, onSave }) => {
  const [previousBalance, setPreviousBalance] = useState(0);
  const [medicineFee, setMedicineFee] = useState(0);
  const [testFee, setTestFee] = useState(0);
  const [currentPayment, setCurrentPayment] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    // Correct logic: remaining = currentPayment - (prev + medicine + test)
    const total = Number(currentPayment || 0) - (
      Number(previousBalance || 0) +
      Number(medicineFee || 0) +
      Number(testFee || 0)
    );
    setRemaining(total);
  }, [previousBalance, medicineFee, testFee, currentPayment]);

  useEffect(() => {
    const fetchPreviousBalance = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/payments/${patientId}`);
        const json = await response.json();

        if (response.ok && json.data && json.data.length > 0) {
          const lastPayment = json.data[json.data.length - 1];
          setPreviousBalance(Number(lastPayment.remaining_amount || 0));
        } else {
          setPreviousBalance(0); // No previous payment
        }
      } catch (error) {
        console.error('Failed to fetch previous balance:', error);
        setPreviousBalance(0);
      }
    };

    if (patientId) {
      fetchPreviousBalance();
    }
  }, [patientId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      patient_id: patientId,
      previous_balance: previousBalance,
      medicine_fee_per_day: Number(medicineFee),
      extra_test_fee: Number(testFee),
      current_payment: Number(currentPayment),
      remaining_amount: remaining,
      remarks
    };

    console.log('Submitting payment:', data);
    onSave(data);
  };

  return (
    <div className="card p-4 mt-4 shadow-sm">
      <h4>Patient ID: {patientId}</h4>
      <h5>Receive Payment</h5>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-4">
            <label>Previous Balance</label>
            <input
              type="number"
              className="form-control"
              value={previousBalance}
              readOnly
            />
          </div>
          <div className="col-md-4">
            <label>Medicine Fee</label>
            <input
              type="number"
              className="form-control"
              value={medicineFee}
              onChange={(e) => setMedicineFee(Number(e.target.value) || 0)}
              placeholder="e.g. 100"
            />
          </div>
          <div className="col-md-4">
            <label>Extra Test Fee</label>
            <input
              type="number"
              className="form-control"
              value={testFee}
              onChange={(e) => setTestFee(Number(e.target.value) || 0)}
              placeholder="e.g. 50"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Current Payment</label>
            <input
              type="number"
              className="form-control"
              value={currentPayment}
              onChange={(e) => setCurrentPayment(Number(e.target.value) || 0)}
              placeholder="e.g. 120"
            />
          </div>
          <div className="col-md-6">
            <label>Remaining Amount</label>
            <input
              type="number"
              className="form-control"
              value={remaining}
              readOnly
            />
          </div>
        </div>

        <div className="mb-3">
          <label>Remarks</label>
          <textarea
            className="form-control"
            rows="2"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Optional remarks"
          ></textarea>
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-primary">
            Save Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentDetails;
