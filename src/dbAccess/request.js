const Request = require("../models/request");
const sequelize = require("sequelize");
const createRequest = async (params) => {
  try {
    const request = await Request.create(params);
    return request;
  } catch (error) {
    throw error;
  }
};
const findAll = async (params) => {
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
    const statusCounts = await Request.findAll({
      attributes: [
        [
          sequelize.fn(
            "COUNT",
            sequelize.literal("CASE WHEN \"status\" = 'pending' THEN 1 END")
          ),
          "pending",
        ],
        [
          sequelize.fn(
            "COUNT",
            sequelize.literal("CASE WHEN \"status\" = 'complete' THEN 1 END")
          ),
          "complete",
        ],
        [
          sequelize.fn(
            "COUNT",
            sequelize.literal("CASE WHEN \"status\" = 'processing' THEN 1 END")
          ),
          "processing",
        ],
        [
          sequelize.fn(
            "COUNT",
            sequelize.literal("CASE WHEN \"status\" = 'realising' THEN 1 END")
          ),
          "realising",
        ],
      ],
      where: { ownerId: id },
    });

    // Extract the counts from the result and create the status object
    const status = {
      pending: statusCounts[0].dataValues.pending,
      complete: statusCounts[0].dataValues.complete,
      processing: statusCounts[0].dataValues.processing,
      realising: statusCounts[0].dataValues.realising,
    };

    return status;
  } catch (error) {
    throw error;
  }
};
const getRquestByStatus = async (id, status) => {
  const request = await Request.findAll({ where: { ownerId: id, status } });
  return request;
};
module.exports = {
  createRequest,
  findAll,
  findByIdAndUpdate,
  findByIdAndDelete,
  findSelfRequest,
  getRequestStatus,
  getRquestByStatus,
};
