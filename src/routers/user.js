const express = require("express");
const {
  addUser,
  updateUser,
  getUsers,
  deleteUser,
  login,
} = require("../controllers/user");
const {
  addRequest,
  getRequests,
  getSelfRequest,
} = require("../controllers/request");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/addUser", addUser);
router.post("/updateUser/:id", updateUser);
router.get("/getUsers/", getUsers);
router.delete("/deleteUser/:id", deleteUser);
router.post("/login", login);
//request
router.post("/addRequest", auth, addRequest);
router.get("/getRequests", auth, getRequests);
router.get("/getSelfRequest", auth, getSelfRequest);

module.exports = router;
