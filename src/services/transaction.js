const TransactionDb = require("../dbAccess/transaction");

module.exports = {
  getAllTransaction: async (page, pageSize) => {
    try {
      return await TransactionDb.getAllTransaction(page, pageSize);
    } catch (error) {
      throw error;
    }
  },
};
