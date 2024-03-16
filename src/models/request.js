const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const requestSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
    relationshipToOwner: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    image: {
      type: String,
    },
    claim: {
      type: {
        name: {
          type: String,
        },
        dateClaim: {
          type: Date,
          default: Date.now,
        },
      },
    },
    clearance: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "Gcash"],
      default: "cash",
    },
    noOfCopies: {
      type: String,
    },
  },
  { timestamps: true }
);

const Request = model("Request", requestSchema);
module.exports = Request;
