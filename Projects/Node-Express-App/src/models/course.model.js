const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    course_name: { type: DataTypes.STRING, allowNull: false },
    course_duration: { type: DataTypes.INTEGER, allowNull: true },
    course_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  };
  return sequelize.define("course", attributes);
}