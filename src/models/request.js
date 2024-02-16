const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const requestSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId, // Changed type to ObjectId
      ref: "User", // Assuming 'User' is the model name of the owner
    },
    controlNumber: {
      type: String,
    },
    studentId: {
      type: String,
    },
    emailAddress: {
      type: String,
    },
    isOwner: {
      type: Boolean,
    },
    documentationType: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "realising", "complete"],
      default: "pending",
    },
    noOfCopies: {
      type: String,
    },
  },
  { timestamps: true }
);

const Request = model("Request", requestSchema);
module.exports = Request;
