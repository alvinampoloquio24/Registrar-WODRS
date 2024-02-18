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
  getRequestStatus,
  getRequestByStatus,
  editSelfRequest,
  deleteRequest,
} = require("../controllers/request");
const {
  addCourse,
  getCourse,
  deleteCourse,
  editCourse,
} = require("../controllers/course");
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
router.get("/getRequestStatus", auth, getRequestStatus);
router.get("/getRequestByStatus", auth, getRequestByStatus);
router.post("/editSelfRequest/:id", auth, editSelfRequest);
router.delete("/deleteRequest/:id", auth, deleteRequest);
//course
router.post("/addCourse", auth, addCourse);
router.get("/getCourse", auth, getCourse);
router.post("/editCourse/:id", auth, editCourse);
router.delete("/deleteCourse/:id", auth, deleteCourse);

module.exports = router;
