const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const requestSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    year: {
      type: String,
    },
    course: {
      type: String,
    },
    address: {
      type: String,
    },
    controlNumber: {
      type: String,
    },
    studentId: {
      type: String,
    },
    purpose: {
      type: String,
    },
    emailAddress: {
      type: String,
    },
    isOwner: {
      type: String,
    },
    documentationType: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "waiting for payment",
        "waiting for approval",
      ],
      default: "pending",
    },

    amount: {
      type: Number,
    },

    image: {
      type: String,
    },
    noOfCopies: {
      type: String,
    },
  },
  { timestamps: true }
);

const Request = model("Request", requestSchema);
module.exports = Request;
