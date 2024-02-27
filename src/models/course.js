const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Course = sequelize.define("Course", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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

// const mongoose = require("mongoose");

// const { Schema, model } = mongoose;
// const courseSchema = new Schema({
//   name: {
//     type: String,
//   },
//   department: {
//     type: String,
//   },
//   descrition: {
//     type: String,
//   },
// });

// const Course = model("Corse", courseSchema);
// module.exports = Course;
