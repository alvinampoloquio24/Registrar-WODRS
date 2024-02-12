const User = require("../models/user");

const addUser = async function (req, res) {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async function (req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is needed. " });
    }
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};
const getUsers = async function (req, res) {
  try {
    const users = await User.find();
    return res.status(201).json(users);
  } catch (error) {
    console.log(error);
  }
};
const deleteUser = async function (req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id required. " });
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json({ message: "No user with that id. " });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addUser, updateUser, getUsers, deleteUser };
