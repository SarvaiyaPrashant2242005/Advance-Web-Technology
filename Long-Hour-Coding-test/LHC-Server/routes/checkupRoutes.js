const express = require('express');
const router = express.Router();
const checkupController = require('../controller/checkupController');

// Create checkup entry
router.post('/patients/:patient_id/checkups', checkupController.createCheckup);

// Get all checkups for a patient
router.get('/patients/:patient_id/checkups', checkupController.getCheckups);

module.exports = router;
