const { Sequelize } = require("sequelize");

// Database Configuration
const sequelize = new Sequelize("patientmanagement", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Set true if you want to see queries in the console
});

// Test Connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

module.exports = sequelize;
