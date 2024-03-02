const Transaction = require("../models/transaction");
const sequelize = require("sequelize");

const createTransaction = async (requestDetails) => {
  try {
    console.log("222222222222");
    const transaction = await Transaction.create({ requestDetails });
    return transaction;
  } catch (error) {
    throw error;
  }
};
const getAllTransaction = async (page, pageSize) => {
  try {
    let transactions;
    if (!page || !pageSize) {
      transactions = await Transaction.findAll();
    } else {
      const offset = (page - 1) * pageSize;
      transactions = await Transaction.findAll({
        offset: offset,
        limit: pageSize,
      });
    }
    return transactions;
  } catch (error) {
    throw error;
  }
};

const TransactionDb = {
  createTransaction,
  getAllTransaction,
};
module.exports = TransactionDb;
