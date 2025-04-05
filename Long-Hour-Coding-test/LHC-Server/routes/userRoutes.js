const express = require('express');
const router = express.Router();
const patientController = require('../controller/patientController');

// Routes for Patient Management
router.get('/', patientController.getAllPatients);        // Get all patients
router.get('/:id', patientController.getPatientById);    // Get patient by ID
router.post('/', patientController.createPatient);       // Create new patient

module.exports = router;
