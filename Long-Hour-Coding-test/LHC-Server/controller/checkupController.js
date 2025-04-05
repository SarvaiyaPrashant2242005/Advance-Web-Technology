const checkupService = require('../service/checkupService');

const createCheckup = async (req, res) => {
  try {
    const { patient_id } = req.params;
    const { height, weight, bp, remarks, complains } = req.body;

if (!height || !weight || !bp || !complains) {
  return res.status(400).json({ error: 'Missing required fields' });
}

const newCheckup = await checkupService.createCheckup({
  patient_id,
  height,
  weight,
  bp,
  remarks,
  complains
});


    res.status(201).json({ message: 'Checkup saved', data: newCheckup });
  } catch (error) {
    console.error('Error creating checkup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCheckups = async (req, res) => {
  try {
    const { patient_id } = req.params;
    const checkups = await checkupService.getCheckupsByPatientId(patient_id);

    res.status(200).json({ data: checkups });
  } catch (error) {
    console.error('Error fetching checkups:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createCheckup,
  getCheckups
};
