const express = require('express');
const router = express.Router();
const prescriptionController = require('../controller/prescriptionController');

// POST /api/patients/:patientId/prescriptions
router.post('/patients/:patient_id/prescriptions', prescriptionController.createPrescription);

// GET /api/patients/:patientId/prescriptions
router.get('/patients/:patient_id/prescriptions', prescriptionController.getPrescriptions);

module.exports = router;
