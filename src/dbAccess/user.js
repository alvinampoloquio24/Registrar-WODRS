const User = require("../models/user");
const cache = require("../helper/cacher");
const cacheKey = require("../constant/cacheKey");

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
      return null;
    }
    await user.update(update);
    const key = cacheKey.user(id);
    await cache.remove(key);
    return user;
  } catch (error) {
    throw error;
  }
};
const findAll = async function () {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw error;
  }
};
const findByIdAndDelete = async function (id) {
  try {
    // First, try to find the user
    const user = await User.findOne({ where: { id } });
    // If no user is found, return null
    if (!user) {
      return null;
    }
    // If user is found, delete the user
    await User.destroy({ where: { id } });

    // Assuming `cacheKey.user(id)` constructs the cache key and `cache.remove(key)` removes the cache
    const key = cacheKey.user(id);
    await cache.remove(key);
    // Return the deleted user (or true to indicate success, depending on your preference)
    return user;
  } catch (error) {
    throw error;
  }
};

const findById = async function (id) {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }
    const key = cacheKey.user(user.id);
    await cache.set(key, user);
    return user;
  } catch (error) {
    throw error;
  }
};
const UserDb = {
  createUser,
  findOne,
  findAll,
  findByIdAndUpdate,
  findByIdAndDelete,
  findById,
};
module.exports = UserDb;
