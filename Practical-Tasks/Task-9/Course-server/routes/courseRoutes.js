const express = require('express');
const Course = require('../models/Course');

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search courses
router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const courses = await Course.find({
      title: { $regex: query, $options: 'i' },
    });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
