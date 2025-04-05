const Patient = require('../model/patient');

// Get all patients
exports.getAllPatients = async () => {
    return await Patient.findAll();
};

// Get a single patient by ID
exports.getPatientById = async (id) => {
    return await Patient.findByPk(id);
};

// Create a new patient
exports.createPatient = async (patientData) => {
    return await Patient.create(patientData);
};

