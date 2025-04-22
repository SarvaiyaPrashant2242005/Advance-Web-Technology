
const mongoose = require('mongoose');
const Course = require('./models/Course'); // Import the Course model

// Default courses data
const courses = [
  {
    title: 'JavaScript for Beginners',
    description: 'Learn JavaScript from scratch.',
    instructor: 'John Doe',
    price: 29.99,
  },
  {
    title: 'Advanced Node.js',
    description: 'Deep dive into Node.js and Express.',
    instructor: 'Jane Smith',
    price: 49.99,
  },
  {
    title: 'React for Beginners',
    description: 'Learn React.js and create dynamic web apps.',
    instructor: 'Emily Clark',
    price: 39.99,
  },
];

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/learning_platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('MongoDB connected');
    // Insert the default courses
    await Course.insertMany(courses);
    console.log('Courses added to database');
    mongoose.connection.close(); // Close the connection once done
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
