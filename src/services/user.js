const UserDb = require("../dbAccess/user");
const cacheKey = require("../constant/cacheKey");

const createUser = async (userData) => {
  try {
    return await UserDb.createUser(userData);
  } catch (error) {
    throw error;
  }
};
const findOne = async (params) => {
  try {
    return await UserDb.findOne(params);
  } catch (error) {
    throw error;
  }
};
const findByIdAndUpdate = async (id, update) => {
  try {
    return await UserDb.findByIdAndUpdate(id, update);
  } catch (error) {
    throw error;
  }
};
const findAll = async (page, pageSize) => {
  try {
    return await UserDb.findAll(page, pageSize);
  } catch (error) {
    throw error;
  }
};
const findByIdAndDelete = async (id) => {
  try {
    return await UserDb.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
const findById = async (id) => {
  try {
    return await UserDb.findById(id);
  } catch (error) {
    throw error;
  }
};
const UserService = {
  findOne,
  createUser,
  findByIdAndUpdate,
  findAll,
  findByIdAndDelete,
  findById,
};
module.exports = UserService;
