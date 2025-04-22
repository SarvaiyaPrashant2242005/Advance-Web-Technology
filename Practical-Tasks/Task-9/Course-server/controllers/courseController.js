// controllers/courseController.js
const Course = require('../models/Course');

exports.searchCourses = async (req, res) => {
  const { query } = req.query;

  try {
    const courses = await Course.find({
      title: { $regex: query, $options: 'i' },
    });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search courses' });
  }
};
