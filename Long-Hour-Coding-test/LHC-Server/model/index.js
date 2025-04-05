const Patient = require('../model/patient');

// Get all patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single patient by ID
exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new patient
exports.createPatient = async (req, res) => {
    try {
        const { first_name, last_name, dob, gender, contact_number, email, address, medical_history } = req.body;
        const newPatient = await Patient.create({ first_name, last_name, dob, gender, contact_number, email, address, medical_history });
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a patient by ID
exports.updatePatient = async (req, res) => {
    try {
        const { first_name, last_name, dob, gender, contact_number, email, address, medical_history } = req.body;
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });

        await patient.update({ first_name, last_name, dob, gender, contact_number, email, address, medical_history });
        res.status(200).json({ message: "Patient updated successfully", patient });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a patient by ID
exports.deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });

        await patient.destroy();
        res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
