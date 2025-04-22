const Payment = require('../model/Payment'); // Make sure the path is correct

// Create a new payment record
const createPayment = async (data) => {
  return await Payment.create({
    patient_id: data.patient_id,
    previous_balance: data.previous_balance,
    medicine_fee_per_day: data.medicine_fee_per_day,
    extra_test_fee: data.extra_test_fee,
    current_payment: data.current_payment,
    remaining_amount: data.remaining_amount,
    remarks: data.remarks
  });
};

// Get all payments for a specific patient
const getPaymentsByPatientId = async (patientId) => {
  return await Payment.findAll({
    where: { patient_id: patientId },
    order: [['created_at', 'DESC']]
  });
};

module.exports = {
  createPayment,
  getPaymentsByPatientId
};
