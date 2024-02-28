const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Request = sequelize.define("Request", {
  // Assuming you have an ID field in PostgreSQL
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users", // Name of the table that contains the users
      key: "id",
    },
  },
  controlNumber: {
    type: DataTypes.STRING,
  },
  studentId: {
    type: DataTypes.STRING,
  },
  emailAddress: {
    type: DataTypes.STRING,
  },
  isOwner: {
    type: DataTypes.STRING,
  },
  documentationType: {
    type: DataTypes.STRING,
  },
  relationshipToOwner: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM("pending", "processing", "realising", "complete"),
    defaultValue: "pending",
  },
  noOfCopies: {
    type: DataTypes.STRING,
  },
});

module.exports = Request;
