const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const courseSchema = new Schema({
  name: {
    type: String,
  },
  department: {
    type: String,
  },
  descrition: {
    type: String,
  },
});

const Course = model("Corse", courseSchema);
module.exports = Course;
