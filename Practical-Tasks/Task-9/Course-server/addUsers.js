const mongoose = require('mongoose');
const User = require('./models/User'); // Import the User model

// Default users data
const users = [
  {
    name: 'Alice',
    email: 'alice@example.com',
    enrolledCourses: [],
  },
  {
    name: 'Bob',
    email: 'bob@example.com',
    enrolledCourses: [],
  },
  {
    name: 'Charlie',
    email: 'charlie@example.com',
    enrolledCourses: [],
  },
];

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/learning_platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('MongoDB connected');
    // Insert the default users
    await User.insertMany(users);
    console.log('Users added to database');
    mongoose.connection.close(); // Close the connection once done
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
