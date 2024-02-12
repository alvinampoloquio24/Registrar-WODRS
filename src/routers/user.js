const express = require("express");
const {
  addUser,
  updateUser,
  getUsers,
  deleteUser,
} = require("../controllers/user");
const router = express.Router();

router.post("/addUser", addUser);
router.post("/updateUser/:id", updateUser);
router.get("/getUsers/", getUsers);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
