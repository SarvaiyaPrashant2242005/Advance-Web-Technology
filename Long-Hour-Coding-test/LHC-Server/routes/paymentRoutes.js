const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');

// Create payment for a patient
router.post('/:patient_id', paymentController.createPayment);

// Get payments for a patient
router.get('/:patient_id', paymentController.getPayments);

module.exports = router;
