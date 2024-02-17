const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const userSchema = new Schema({
  firstName: {
    type: String, // 'String' should be capitalized
  },
  lastName: {
    type: String, // 'String' should be capitalized
  },
  year: {
    type: String, // 'String' should be capitalized
  },
  course: {
    type: String, // 'String' should be capitalized
  },
  email: {
    type: String, // 'String' should be capitalized
    unique: true,
  },
  password: {
    type: String, // 'String' should be capitalized
  },
  role: {
    type: String, // 'String' should be capitalized
    default: "student",
    enum: ["cashier", "student", "registrar"],
  },
});

const User = model("User", userSchema); // 'new' is not required here
module.exports = User;
