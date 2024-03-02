const Request = require("../models/request");
const sequelize = require("sequelize");
const TransactionDb = require("./transaction");

const createRequest = async (params) => {
  try {
    params.controlNumber = generateControlNumber();
    const request = await Request.create(params);
    await TransactionDb.createTransaction(request);

    return request;
  } catch (error) {
    throw error;
  }
};
// Function to generate a random control number
const generateControlNumber = () => {
  // Generate a random number between 100000 and 999999
  return Math.floor(Math.random() * 900000) + 100000;
};
const findAll = async () => {
  try {
    const requests = await Request.findAll();
    return requests;
  } catch (error) {
    throw error;
  }
};
const findByIdAndUpdate = async (id, update) => {
  try {
    const request = await Request.findByPk(id);
    if (!request) {
      return null;
    }
    await request.update(update);
    return request;
  } catch (error) {
    throw error;
  }
};
const findByIdAndDelete = async (id) => {
  try {
    const request = await Request.destroy({ where: { id } });
    return request;
  } catch (error) {
    throw error;
  }
};
const findSelfRequest = async (id) => {
  try {
    const requests = await Request.findAll({ where: { ownerId: id } });
    return requests;
  } catch (error) {
    throw error;
  }
};
const getRequestStatus = async (id) => {
  try {
    // Define the attributes to count each status conditionally
    const attributes = [
      [
        sequelize.fn(
          "COUNT",
          sequelize.literal("CASE WHEN status = 'pending' THEN 1 END")
        ),
        "pending",
      ],
      [
        sequelize.fn(
          "COUNT",
          sequelize.literal("CASE WHEN status = 'complete' THEN 1 END")
        ),
        "complete",
      ],
      [
        sequelize.fn(
          "COUNT",
          sequelize.literal("CASE WHEN status = 'processing' THEN 1 END")
        ),
        "processing",
      ],
      [
        sequelize.fn(
          "COUNT",
          sequelize.literal("CASE WHEN status = 'realising' THEN 1 END")
        ),
        "realising",
      ],
    ];

    // Perform the query with the conditional where clause based on the presence of id
    const statusCounts = await Request.findAll({
      attributes,
      where: id ? { ownerId: id } : undefined, // Apply the where condition only if id is provided
      raw: true, // Adding raw: true to make processing results simpler
    });

    // Assuming the query returns aggregated results as expected, directly use the first row
    if (statusCounts.length > 0) {
      const status = {
        pending: statusCounts[0].pending,
        complete: statusCounts[0].complete,
        processing: statusCounts[0].processing,
        realising: statusCounts[0].realising,
      };

      return status;
    }

    // Return zeros if no records found (or adjust as needed)
    return { pending: 0, complete: 0, processing: 0, realising: 0 };
  } catch (error) {
    console.error("Failed to get request status:", error);
    throw error; // Rethrow or handle as needed
  }
};
const getRquestByStatus = async (id, status) => {
  try {
    const request = await Request.findAll({ where: { ownerId: id, status } });
    return request;
  } catch (error) {
    throw error;
  }
};
const getDocumentReport = async () => {
  try {
    const report = await Request.findAll({
      attributes: [
        "documentationType",
        [
          sequelize.fn("COUNT", sequelize.col("documentationType")),
          "totalRequests",
        ],
      ],
      group: ["documentationType"],
    });

    // Initialize an object to accumulate the counts
    let formattedReport = {
      total: 0,
      TOR: 0,
      COR: 0,
      COG: 0,
      COE: 0,
      goodMoral: 0,
      CAV: 0,
      Others: 0,
    };

    // Accumulate counts for each documentationType
    report.forEach((item) => {
      const type = item.dataValues.documentationType;
      const count = item.dataValues.totalRequests;

      if (formattedReport.hasOwnProperty(type)) {
        formattedReport[type] = parseInt(count, 10);
        formattedReport.total += parseInt(count, 10); // Update total
      }
    });

    return formattedReport;
  } catch (error) {
    console.error("Error generating report:", error);
  }
};
module.exports = {
  createRequest,
  findAll,
  findByIdAndUpdate,
  findByIdAndDelete,
  findSelfRequest,
  getRequestStatus,
  getRquestByStatus,
  getDocumentReport,
};
