const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const userSchema = new Schema({
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },
  year: {
    type: String,
  },
  course: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "student",
    enum: ["cashier", "student", "registrar", "admin"],
  },
});

const User = model("User", userSchema);
module.exports = User;
