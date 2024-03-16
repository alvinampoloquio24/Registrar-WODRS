const express = require("express");
const upload = require("../middleware/upload");
const {
  addUser,
  updateUser,
  getUsers,
  deleteUser,
  login,
  getSelf,
  updateSelf,
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
  getDocumentReport,
  getAllRequestStatus,
  getControlNumber,
  approveRequest,
} = require("../controllers/request");
const {
  addCourse,
  getCourse,
  deleteCourse,
  editCourse,
} = require("../controllers/course");
const {
  getAllTransaction,
  approvePayment,
  getSelfTransaction,
} = require("../controllers/transaction");
const { createFeedBack, getFeedback } = require("../controllers/feedBack");
const auth = require("../middleware/auth");
const permission = require("../middleware/checkPermission");
const router = express.Router();

router.get("/getUsers/", auth, permission("read", "User"), getUsers);
router.get("/getSelf", auth, permission("readSelf", "User"), getSelf);
router.post("/updateSelf", auth, permission("updateSelf", "User"), updateSelf);
router.post("/addUser", addUser);
router.post("/updateUser/:id", auth, permission("update", "User"), updateUser);
router.post("/login", login);
router.get("/getUserById/:id", auth, permission("delete", "User"), getUserById);
router.delete("/deleteUser/:id", auth, permission("read", "User"), deleteUser);
//request
router.post(
  "/addRequest",
  auth,
  permission("create", "Request"),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "clearance", maxCount: 1 },
  ]),
  addRequest
);
router.get("/getRequests", auth, permission("read", "Request"), getRequests);
router.get(
  "/getSelfRequest",
  auth,
  permission("readSelf", "Request"),
  getSelfRequest
);
router.get(
  "/getRequestStatus",
  auth,
  permission("readSelf", "Request"),
  getRequestStatus
);
router.get(
  "/getRequestByStatus",
  auth,
  permission("readSelf", "Request"),
  getRequestByStatus
);
router.post(
  "/editSelfRequest/:id",
  auth,
  permission("updateSelf", "Request"),
  editSelfRequest
);
router.delete(
  "/deleteRequest/:id",
  auth,
  permission("deleteSelf", "Request"),
  deleteRequest
);
router.get(
  "/getDocumentReport",
  auth,
  permission("generate", "Request"),
  getDocumentReport
);
router.get(
  "/getAllRequestStatus",
  auth,
  permission("read", "Request"),
  getAllRequestStatus
);
router.post(
  "/approveRequest/:id",
  auth,
  permission("update", "Request"),
  approveRequest
);

//course
router.post("/addCourse", auth, permission("create", "Course"), addCourse);
router.get("/getCourse", auth, permission("read", "Course"), getCourse);
router.post(
  "/editCourse/:id",
  auth,
  permission("update", "Course"),
  editCourse
);
router.delete(
  "/deleteCourse/:id",
  auth,
  permission("delete", "Course"),
  deleteCourse
);
router.get("/get", auth, getCourse);

//transaction
router.get(
  "/getAllTransaction",
  auth,
  permission("read", "Transaction"),
  getAllTransaction
);
router.post(
  "/approvePayment/:id",
  auth,
  permission("update", "Transaction"),
  approvePayment
);
router.post(
  "/createFeedback",
  auth,
  permission("create", "Feedback"),
  createFeedBack
);
router.get("/getFeedback", auth, permission("read", "Feedback"), getFeedback);
router.get(
  "/getSelfTransaction",
  auth,
  permission("readSelf", "Transaction"),
  getSelfTransaction
);
module.exports = router;
