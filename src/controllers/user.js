const User = require("../models/user");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const addUser = async function (req, res) {
  try {
    const userData = req.body;
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
      return res
        .status(400)
        .json({ message: "Email Adress is already exist. " });
    }
    // hash plain password before saving to databse
    userData.password = await bcrypt.hash(userData.password, 8);
    const user = await User.create(userData);
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
    let data = req.body;
    data.password = await bcrypt.hash(data.password, 8);
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};
const updateSelf = async function (req, res) {
  try {
    const id = req.user._id;

    let data = req.body;
    data.password = await bcrypt.hash(data.password, 8);
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};
const getSelf = async function (req, res) {
  try {
    const id = req.user._id;

    const user = await User.findById(id);
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
const getUserById = async function (req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id required. " });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "No user with that id. " });
    }

    return res.status(200).json(user);
  } catch (error) {
    throw error;
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "Wrong credentials. " });
    }
    const isMatch = bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong credentials. " });
    }
    const token = jsonwebtoken.sign(
      { _id: existUser._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRE }
    );
    return res.status(200).json({ user: existUser, token });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  addUser,
  updateUser,
  getUsers,
  deleteUser,
  login,
  updateSelf,
  getSelf,
  getUserById,
};
