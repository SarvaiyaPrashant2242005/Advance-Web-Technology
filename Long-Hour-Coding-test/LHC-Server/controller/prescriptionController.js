const prescriptionService = require('../service/prescriptionService');

const createPrescription = async (req, res) => {
  try {
    const { patient_id } = req.params;
    const { prescription, days } = req.body;

    if (!prescription || !days) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newPrescription = await prescriptionService.createPrescription({
      patient_id,
      prescription,
      days
    });

    res.status(201).json({ message: 'Prescription saved', data: newPrescription });
  } catch (error) {
    console.error('Error creating prescription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getPrescriptions = async (req, res) => {
  try {
    const { patient_id } = req.params;
    const prescriptions = await prescriptionService.getPrescriptionsByPatientId(patient_id);

    res.status(200).json({ data: prescriptions });
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createPrescription,
  getPrescriptions
};