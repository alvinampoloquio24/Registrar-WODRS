const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const transactionSchema = new Schema({
  requestDetails: {
    type: Object,
  },
  status: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  amount: {
    type: Number,
    default: 0,
  },
});

const Course = model("Transaction", transactionSchema);
module.exports = Course;
