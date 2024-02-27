const UserService = require("../services/user");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const addUser = async function (req, res) {
  try {
    const userData = req.body;

    const isEmailExist = await UserService.findOne({ email: req.body.email });
    if (isEmailExist) {
      return res
        .status(400)
        .json({ message: "Email Adress is already exist. " });
    }
    // hash plain password before saving to databse
    userData.password = await bcrypt.hash(userData.password, 8);

    const user = await UserService.createUser(userData);
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async function (req, res) {
  try {
    const id = req.params.id;
    if (req.body.id) {
      return res
        .status(400)
        .json({ message: "Update must not contain an Id. " });
    }
    if (!id) {
      return res.status(400).json({ message: "Id is needed. " });
    }
    // const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    const user = await UserService.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res.status(400).json({ message: "No user with provided Id. " });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
const getUsers = async function (req, res) {
  try {
    const users = await UserService.findAll();
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
    const user = await UserService.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json({ message: "No user with that id. " });
    }

    return res.status(200).json({ message: "Delete Successfully. " });
  } catch (error) {
    console.log(error);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await UserService.findOne({ email });

    if (!existUser) {
      return res.status(400).json({ message: "Wrong credentials. " });
    }
    const isMatch = bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong credentials. " });
    }
    const token = jsonwebtoken.sign(
      { id: existUser.id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRE }
    );
    return res.status(200).json({ user: existUser, token });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = { addUser, updateUser, getUsers, deleteUser, login };
