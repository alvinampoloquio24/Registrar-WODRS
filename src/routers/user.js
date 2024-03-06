const express = require("express");
const upload = require("../middleware/upload");
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
  getDocumentReport,
  getAllRequestStatus,
  getControlNumber,
} = require("../controllers/request");
const {
  addCourse,
  getCourse,
  deleteCourse,
  editCourse,
} = require("../controllers/course");
const { getAllTransaction } = require("../controllers/transaction");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/addUser", addUser);
router.post("/updateUser/:id", updateUser);
router.get("/getUsers/", getUsers);
router.delete("/deleteUser/:id", deleteUser);
router.post("/login", login);
//request
router.post("/addRequest", auth, upload.single("image"), addRequest);
router.get("/getRequests", auth, getRequests);
router.get("/getSelfRequest", auth, getSelfRequest);
router.get("/getRequestStatus", auth, getRequestStatus);
router.get("/getRequestByStatus", auth, getRequestByStatus);
router.post("/editSelfRequest/:id", auth, editSelfRequest);
router.delete("/deleteRequest/:id", auth, deleteRequest);
router.get("/getDocumentReport", auth, getDocumentReport);
router.get("/getAllRequestStatus", auth, getAllRequestStatus);

//course
router.post("/addCourse", auth, addCourse);
router.get("/getCourse", auth, getCourse);
router.post("/editCourse/:id", auth, editCourse);
router.delete("/deleteCourse/:id", auth, deleteCourse);
router.get("/get", auth, getCourse);

//transaction
router.get("/getAllTransaction", auth, getAllTransaction);
module.exports = router;
