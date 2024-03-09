const Transaction = require("../models/transaction");
const Request = require("../models/request");
const getAllTransaction = async function (req, res) {
  try {
    const transaction = await Transaction.find();
    return res.status(200).json(transaction);
  } catch (error) {
    return res.send(error);
  }
};
const approvePayment = async function (req, res) {
  try {
    const id = req.params.id;
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      {
        status: "paid",
        "requestDetails.status": "paid",
      },
      { new: true }
    );

    if (!transaction) {
      return res.status(400).json({ message: "Not found. " });
    }
    const reqId = transaction.requestDetails._id;

    await Request.findByIdAndUpdate(reqId, { status: "paid" });
    return res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

module.exports = {
  getAllTransaction,
  approvePayment,
};
