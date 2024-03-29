const Transaction = require("../models/transaction");
const Request = require("../models/request");
const getAllTransaction = async function (req, res) {
  try {
    const transaction = await Transaction.find();
    return res.status(200).json(transaction);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong. ", error: error.message });
  }
};
const getSelfTransaction = async function (req, res) {
  try {
    const id = req.user._id;
    const transaction = await Transaction.find({
      "requestDetails.ownerId": id,
    });
    return res.status(200).json(transaction);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong. ", error: error.message });
  }
};

module.exports = {
  getAllTransaction,
  getSelfTransaction,
};
