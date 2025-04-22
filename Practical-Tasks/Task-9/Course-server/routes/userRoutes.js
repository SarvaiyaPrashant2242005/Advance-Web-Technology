const express = require('express');
const User = require('../models/User');
const Course = require('../models/Course');

const router = express.Router();

// Enroll user in course
router.post('/:userId/enroll/:courseId', async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: 'User or Course not found' });
    }

    user.enrolledCourses.push(course);
    await user.save();

    res.json({ message: 'User enrolled successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's enrolled courses
router.get('/:userId/enrolled', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('enrolledCourses');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.enrolledCourses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
