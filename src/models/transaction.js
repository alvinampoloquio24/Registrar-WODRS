const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Transaction = sequelize.define("Transactions", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  requestDetails: {
    type: DataTypes.JSON, // Adjusted to DataTypes.JSON
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "paid"),
    defaultValue: "pending",
  },
  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

module.exports = Transaction;
