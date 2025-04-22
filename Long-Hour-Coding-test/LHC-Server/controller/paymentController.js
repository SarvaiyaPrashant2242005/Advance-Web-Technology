const paymentService = require('../service/paymentService');

const createPayment = async (req, res) => {
  try {
    const { patient_id } = req.params;
    const {
      previous_balance,
      medicine_fee_per_day,
      extra_test_fee,
      current_payment,
      remaining_amount,
      remarks
    } = req.body;

    const newPayment = await paymentService.createPayment({
      patient_id,
      previous_balance,
      medicine_fee_per_day,
      extra_test_fee,
      current_payment,
      remaining_amount,
      remarks
    });

    res.status(201).json({ message: 'Payment recorded', data: newPayment });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getPayments = async (req, res) => {
  try {
    const { patient_id } = req.params;
    const payments = await paymentService.getPaymentsByPatientId(patient_id);

    res.status(200).json({ data: payments });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createPayment,
  getPayments
};
