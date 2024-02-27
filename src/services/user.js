const UserDb = require("../dbAccess/user");

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
const findAll = async () => {
  return await UserDb.findAll();
};
const findByIdAndDelete = async (id) => {
  return await UserDb.findByIdAndDelete(id);
};
const UserService = {
  findOne,
  createUser,
  findByIdAndUpdate,
  findAll,
  findByIdAndDelete,
};
module.exports = UserService;
