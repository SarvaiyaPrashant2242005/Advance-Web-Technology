const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.helper');

const Student = sequelize.define('students', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  age: { type: DataTypes.INTEGER }
}, { timestamps: false });

module.exports = Student;
