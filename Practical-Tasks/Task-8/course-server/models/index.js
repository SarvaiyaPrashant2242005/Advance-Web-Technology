// models/index.js
const { Sequelize, DataTypes } = require('sequelize');

// Replace with your actual MySQL credentials
const sequelize = new Sequelize('mu_2425_test', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define models
const Course = sequelize.define('course', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  instructor: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Courses'  // Explicitly defining the table name as "Courses"
});

const EnrolledCourse = sequelize.define('EnrolledCourse', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'EnrolledCourses'  // Explicitly defining the table name as "EnrolledCourses"
});

// Define relationships (foreign key)
EnrolledCourse.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(EnrolledCourse, { foreignKey: 'courseId' });

// Sync database
sequelize.sync();

module.exports = { sequelize, Course, EnrolledCourse };
