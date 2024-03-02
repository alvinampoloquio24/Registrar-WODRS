const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Request = sequelize.define("Requests", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4, // Generate UUID automatically
  },
  ownerId: {
    type: DataTypes.UUID,
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
    type: DataTypes.ENUM(
      "TOR",
      "COR",
      "COG",
      "COE",
      "Good Moral",
      "CAV",
      "Others"
    ),
    defaultValue: "Others",
    allowNull: false,
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
  paymentMethod: {
    type: DataTypes.ENUM("Gcash", "Cash"),
    defaultValue: "Cash",
  },
});

module.exports = Request;
