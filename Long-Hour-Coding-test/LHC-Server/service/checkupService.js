const Checkup = require('../model/checkupform');

const createCheckup = async (data) => {
  return await Checkup.create(data);
};


const getCheckupsByPatientId = async (patientId) => {
  return await Checkup.findAll({
    where: { patient_id: patientId },
    order: [['checkup_date', 'DESC']]
  });
};

module.exports = {
  createCheckup,
  getCheckupsByPatientId
};
