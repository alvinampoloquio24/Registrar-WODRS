const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const courseSchema = new Schema({
  name: {
    type: String,
  },
  department: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Course = model("Course", courseSchema);
module.exports = Course;
