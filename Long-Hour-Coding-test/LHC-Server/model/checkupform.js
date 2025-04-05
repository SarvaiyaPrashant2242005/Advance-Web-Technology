const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./patient'); // ✅ Import this

const Checkup = sequelize.define('Checkup', {
  checkup_id: {
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
  height: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  bp: {
    type: DataTypes.STRING,
    allowNull: false
  },
  checkup_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  complains: {
    type: DataTypes.TEXT,
    allowNull: false
  }
  
  
 
  
}, {
  tableName: 'checkups',
  timestamps: false
});

// ✅ Setup relationship
Patient.hasMany(Checkup, { foreignKey: 'patient_id' });
Checkup.belongsTo(Patient, { foreignKey: 'patient_id' });

module.exports = Checkup;
