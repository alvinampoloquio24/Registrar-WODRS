const mongoose = require("mongoose");

// Define the schema for items in the recycle bin
const feedBackSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  comment: {
    type: String,
  },
});

// Create a Mongoose model for the recycle bin item
const Feedback = mongoose.model("Feedback", feedBackSchema);

module.exports = Feedback;
