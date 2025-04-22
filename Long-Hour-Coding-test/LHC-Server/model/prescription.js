// models/Prescription.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./patient'); // ✅ Import the Patient model

const Prescription = sequelize.define('Prescription', {
  prescription_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'patient_id'
    },
    onDelete: 'CASCADE'
  },
  prescription: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  days: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'prescriptions',
  timestamps: false // set to true if you want Sequelize to manage createdAt/updatedAt
});

// ✅ Setup relationship
Patient.hasMany(Prescription, { foreignKey: 'patient_id' });
Prescription.belongsTo(Patient, { foreignKey: 'patient_id' });

module.exports = Prescription;
