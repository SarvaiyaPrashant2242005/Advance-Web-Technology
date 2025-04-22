const Prescription = require('../model/prescription');

const createPrescription = async (data) => {
  return await Prescription.create(data);
};

const getPrescriptionsByPatientId = async (patientId) => {
  return await Prescription.findAll({
    where: { patient_id: patientId },
    order: [['createdAt', 'DESC']] // or 'prescription_date' if you have that field
  });
};

module.exports = {
  createPrescription,
  getPrescriptionsByPatientId
};