// models/Payment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./patient'); // ✅ Make sure the Patient model is imported

const Payment = sequelize.define('Payment', {
  payment_id: {
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
  previous_balance: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  medicine_fee_per_day: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  extra_test_fee: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  current_payment: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  remaining_amount: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'payments',
  timestamps: false
});

Patient.hasMany(Payment, { foreignKey: 'patient_id' });
Payment.belongsTo(Patient, { foreignKey: 'patient_id' });

module.exports = Payment;
