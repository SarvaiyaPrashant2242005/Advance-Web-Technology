// server.js
const express = require('express');
const { Course, EnrolledCourse } = require('./models/index');
const cors = require('cors');
const { Sequelize } = require('sequelize');

const app = express();  // Initialize app first
app.use(cors());  // Now use cors middleware

app.use(express.json());  // Use express built-in middleware for JSON parsing

// Add some dummy courses to the database (ensure not to duplicate)
const dummyCourses = [
  { title: 'React for Beginners', description: 'Learn React from scratch.', instructor: 'John Doe' },
  { title: 'Advanced JavaScript', description: 'Deep dive into JS concepts.', instructor: 'Jane Smith' },
  { title: 'Python for Data Science', description: 'Use Python for data analysis.', instructor: 'Emily Watson' }
];

dummyCourses.forEach(course => {
  Course.findOrCreate({
    where: { title: course.title },  // Prevent duplication
    defaults: course
  });
});

// Route to get all courses (search functionality)
app.get('/courses', async (req, res) => {
  const { search } = req.query;  // Search query

  let whereClause = {};
  if (search) {
    whereClause = {
      title: {
        [Sequelize.Op.like]: `%${search}%`
      }
    };
  }

  try {
    const courses = await Course.findAll({ where: whereClause });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching courses' });
  }
});

// Route to enroll in a course
app.post('/enroll', async (req, res) => {
  const { username, courseId } = req.body;
  
  try {
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const enrollment = await EnrolledCourse.create({ username, courseId });
    res.json({ message: `Successfully enrolled in "${course.title}"` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error enrolling in course' });
  }
});

// Route to get enrolled courses by username
app.get('/enrolled/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const enrolledCourses = await EnrolledCourse.findAll({
      where: { username },
      include: Course
    });
    res.json(enrolledCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching enrolled courses' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
