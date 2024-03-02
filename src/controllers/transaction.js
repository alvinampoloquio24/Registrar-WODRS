const TransactionService = require("../services/transaction");

const getAllTransaction = async function (req, res, next) {
  try {
    const transactions = await TransactionService.getAllTransaction();
    return res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
module.exports = { getAllTransaction };
