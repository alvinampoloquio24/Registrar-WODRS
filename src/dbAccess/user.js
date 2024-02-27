const User = require("../models/user");

const createUser = async function (userData) {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw error;
  }
};
const findOne = async function (params) {
  try {
    console.log(params);
    const user = await User.findOne({ where: params }); // Pass the params within the 'where' property

    return user;
  } catch (error) {
    throw error;
  }
};
const findByIdAndUpdate = async (id, update) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }
    await user.update(update);
    return user;
  } catch (error) {}
};
const findAll = async function (params) {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw error;
  }
};

const UserDb = {
  createUser,
  findOne,
  findAll,
  findByIdAndUpdate,
};
module.exports = UserDb;
