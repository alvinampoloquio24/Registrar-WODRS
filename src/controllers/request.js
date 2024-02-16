const Request = require("../models/request");

const addRequest = async function (req, res) {
  try {
    let data = req.body;
    data.ownerId = req.user._id;

    const request = await Request.create(data);
    return res.status(201).json({ message: "Add succesfully", request });
  } catch (error) {
    return res.send(error);
  }
};
const getRequests = async function (req, res) {
  try {
    if (req.user.role !== "registrar") {
      return res.status(401).json({ message: "Unauthorize Request. " });
    }
    const requests = await Request.find();

    return res.status(200).json(requests);
  } catch (error) {
    return res.send(error);
  }
};
const getSelfRequest = async function (req, res) {
  try {
    const requests = await Request.find({ ownerId: req.user._id });

    return res.status(200).json(requests);
  } catch (error) {
    return res.send(error);
  }
};
const getRequestStatus = async function (req, res) {
  try {
    const id = req.user._id;

    const [pending, complete, processing, realising] = await Promise.all([
      Request.countDocuments({ ownerId: id, status: "pending" }),
      Request.countDocuments({ ownerId: id, status: "complete" }),
      Request.countDocuments({ ownerId: id, status: "processing" }),
      Request.countDocuments({ ownerId: id, status: "realising" }),
    ]);

    const status = { pending, realising, complete, processing };

    return res.status(200).json(status);
  } catch (error) {
    return res.send(error);
  }
};
const getRequestByStatus = async function (req, res) {
  try {
    const status = req.query.status;
    const requests = await Request.find({ ownerId: req.user._id, status });

    return res.status(200).json(requests);
  } catch (error) {
    return res.send(error);
  }
};
module.exports = {
  addRequest,
  getRequests,
  getSelfRequest,
  getRequestByStatus,
  getRequestStatus,
};
