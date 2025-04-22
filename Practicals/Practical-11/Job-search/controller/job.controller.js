const db = require("../models");
const Job = db.jobs;
const Op = db.Sequelize.Op;

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const where = {};
    const { title, location, type, minSalary } = req.query;

    if (title) where.title = { [Op.like]: `%${title}%` };
    if (location) where.location = location;
    if (type) where.type = type;
    if (minSalary) where.salary = { [Op.gte]: minSalary };

    const jobs = await Job.findAll({ where });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
