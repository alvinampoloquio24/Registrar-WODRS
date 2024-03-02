const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Course = sequelize.define("Course", {
  id: {
    type: DataTypes.UUID, // Adjusted to Sequelize.UUID
    defaultValue: DataTypes.UUIDV4, // You can use DataTypes.UUIDV4 here as well
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Course;
