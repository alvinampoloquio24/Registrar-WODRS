const Transaction = require("../models/transaction");

const getAllTransaction = async function (req, res) {
  try {
    const transaction = await Transaction.find();
    return res.status(200).json(transaction);
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  getAllTransaction,
};
