const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // This ensures that the email value is unique across all users
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async () => {
  try {
    await sequelize.sync();
  } catch (error) {
    console.error("Error synchronizing User model:", error);
  }
})();

module.exports = User;

// const mongoose = require("mongoose");

// const { Schema, model } = mongoose;
// const userSchema = new Schema({
//   firstName: {
//     type: String, // 'String' should be capitalized
//   },
//   lastName: {
//     type: String, // 'String' should be capitalized
//   },
//   year: {
//     type: String, // 'String' should be capitalized
//   },
//   course: {
//     type: String, // 'String' should be capitalized
//   },
//   email: {
//     type: String, // 'String' should be capitalized
//     unique: true,
//   },
//   password: {
//     type: String, // 'String' should be capitalized
//   },
//   role: {
//     type: String, // 'String' should be capitalized
//     default: "student",
//     enum: ["cashier", "student", "registrar"],
//   },
// });

// const User = model("User", userSchema); // 'new' is not required here
// module.exports = User;
