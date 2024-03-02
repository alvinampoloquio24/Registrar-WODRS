const express = require("express");
const {
  addUser,
  updateUser,
  getUsers,
  deleteUser,
  login,
  getUserById,
} = require("../controllers/user");
const {
  addRequest,
  getRequests,
  getSelfRequest,
  getRequestStatus,
  getRequestByStatus,
  editSelfRequest,
  deleteRequest,
  approveRequest,
  getAllRequestStatus,
  getDocumentReport,
} = require("../controllers/request");
const {
  addCourse,
  getCourse,
  deleteCourse,
  editCourse,
} = require("../controllers/course");
const { getAllTransaction } = require("../controllers/transaction");

const auth = require("../middleware/auth");
const cache = require("../middleware/cache");
const router = express.Router();

router.post("/addUser", addUser);
router.post("/updateUser/:id", updateUser);
router.get("/getUsers/", getUsers);
router.get("/getUserById/:id", cache, getUserById);
router.delete("/deleteUser/:id", deleteUser);
router.post("/login", login);
//request
router.post("/addRequest", auth, addRequest);
router.get("/getRequests", auth, getRequests);
router.get("/getSelfRequest", auth, getSelfRequest);
router.get("/getRequestStatus", auth, getRequestStatus);
router.get("/getAllRequestStatus", auth, getAllRequestStatus);
router.get("/getRequestByStatus", auth, getRequestByStatus);
router.get("/getDocumentReport", auth, getDocumentReport);
router.post("/editSelfRequest/:id", auth, editSelfRequest);
router.delete("/deleteRequest/:id", auth, deleteRequest);
router.post("/approveRequest/:id", auth, approveRequest);

//course
router.post("/addCourse", auth, addCourse);
router.get("/getCourse", auth, getCourse);
router.post("/editCourse/:id", auth, editCourse);
router.delete("/deleteCourse/:id", auth, deleteCourse);

//transactions
router.get("/getAllTransaction", auth, getAllTransaction);

module.exports = router;
