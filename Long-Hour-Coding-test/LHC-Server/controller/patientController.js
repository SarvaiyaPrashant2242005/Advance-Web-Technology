const patientService = require('../service/patientService');

// Get all patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await patientService.getAllPatients();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single patient by ID
exports.getPatientById = async (req, res) => {
    try {
        const patient = await patientService.getPatientById(req.params.id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });

        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new patient
exports.createPatient = async (req, res) => {
    try {
        const newPatient = await patientService.createPatient(req.body);
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};