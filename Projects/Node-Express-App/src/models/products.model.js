const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    product_name: { type: DataTypes.STRING, allowNull: false },
    product_caytegory: { type: DataTypes.INTEGER, allowNull: true },
    course_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  };
  return sequelize.define("course", attributes);
}
