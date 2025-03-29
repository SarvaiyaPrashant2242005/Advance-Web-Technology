
const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    shop_name: { type: DataTypes.STRING, allowNull: false },
    shop_email: { type: DataTypes.STRING, allowNull: true },
    shop_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  };
  return sequelize.define("shop", attributes);
}
