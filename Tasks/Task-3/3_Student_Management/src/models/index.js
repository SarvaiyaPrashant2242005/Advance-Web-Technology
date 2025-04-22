const sequelize = require('../config/db.helper');
const Student = require('./student.model');

const db = { sequelize, Student };

sequelize.sync()
  .then(() => console.log("✅ Tables synchronized!"))
  .catch(err => console.error("❌ Sync error:", err));

module.exports = db;
