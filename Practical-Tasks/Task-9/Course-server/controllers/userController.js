// controllers/userController.js
const User = require('../models/User');
const Course = require('../models/Course');

exports.enrollInCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ error: 'User or course not found' });
    }

    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    res.json({ message: 'Enrolled successfully', user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to enroll' });
  }
};
