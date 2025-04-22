// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/learning_platform');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('DB Connection Failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
