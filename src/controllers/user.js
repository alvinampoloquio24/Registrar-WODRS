const UserService = require("../services/user");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const Chance = require("chance");
const chance = new Chance();

const addUser = async function (req, res, next) {
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
    return next(error);
  }
};
const addMultipleUsers = async function (count) {
  try {
    for (let i = 0; i < count; i++) {
      const userData = {
        firstName: chance.first(),
        lastName: chance.last(),
        year: chance.integer({ min: 1, max: 4 }).toString(),
        course: chance.pickone(["BSCS", "BSIT", "BSIS"]),
        email: chance.email().toLowerCase(),
        password: chance.string({ length: 8 }),
        role: chance.pickone(["student", "admin"]),
      };

      await addUser({ body: userData }, { json: () => {} }, () => {});
    }
    console.log(`${count} users added successfully.`);
  } catch (error) {
    console.error("Error adding users:", error);
  }
};
const updateUser = async function (req, res, next) {
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
    const user = await UserService.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res.status(400).json({ message: "No user with provided Id. " });
    }

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};
const getUsers = async function (req, res, next) {
  try {
    const { page, pageSize } = req.query;
    const users = await UserService.findAll(page, pageSize);
    return res.status(201).json(users);
  } catch (error) {
    return next(error);
  }
};
const deleteUser = async function (req, res, next) {
  try {
    const id = req.params.id;
    // check if the user is registar or cashier
    const userRole = await UserService.getUserRole(id);
    if (!userRole) {
      return res.status(400).json({ message: "No user with that id. " });
    }
    const isAllowedToDelete =
      userRole === "registrar" || userRole === "cashier";
    if (isAllowedToDelete) {
      return res
        .status(400)
        .json({ message: `Not allowed to delete the role: ${userRole}` });
    }
    const user = await UserService.findByIdAndDelete(id);

    if (!user) {
      return res.status(400).json({ message: "No user with that id. " });
    }

    return res.status(200).json({ message: "Delete Successfully. " });
  } catch (error) {
    return next(error);
  }
};
const login = async (req, res, next) => {
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
    return next(error);
  }
};
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UserService.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("An error occurred:", error);
    return next(error);
  }
};
module.exports = {
  addUser,
  updateUser,
  getUsers,
  deleteUser,
  login,
  getUserById,
  addMultipleUsers,
};
