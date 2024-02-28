const RequestService = require("../services/request");

const addRequest = async function (req, res) {
  try {
    let data = req.body;
    data.ownerId = req.user.id;

    const request = await RequestService.createRequest(data);
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
    const requests = await RequestService.findAll();

    return res.status(200).json(requests);
  } catch (error) {
    return res.send(error);
  }
};
const getSelfRequest = async function (req, res) {
  try {
    const requests = await RequestService.findSelfRequest(req.user.id);

    return res.status(200).json(requests);
  } catch (error) {
    return res.send(error);
  }
};
const getRequestStatus = async function (req, res) {
  try {
    const id = req.user.id;

    const status = await RequestService.getRequestStatus(id);

    return res.status(200).json(status);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
const getRequestByStatus = async function (req, res) {
  try {
    const status = req.query.status;
    const id = req.user.id;
    const requests = await RequestService.getRequestByStatus(id, status);

    return res.status(200).json(requests);
  } catch (error) {
    return res.send(error);
  }
};
const editSelfRequest = async function (req, res) {
  try {
    const requestId = req.params.id;
    const update = req.body;
    if (!requestId) {
      return res.status(400).json({
        message: "Request Id is required. ",
      });
    }
    const request = await RequestService.findByIdAndUpdate(requestId, update);
    if (!request) {
      return res.status(400).json({
        message: "No reqeust in id provided. ",
      });
    }

    return res.status(200).json({ message: "Update Successfully. ", request });
  } catch (error) {
    return res.send(error);
  }
};
const deleteRequest = async function (req, res) {
  try {
    const requestId = req.params.id;
    if (!requestId) {
      return res.status(400).json({ message: "Request Id is required. " });
    }
    const request = await RequestService.findByIdAndDelete(requestId);

    if (!request) {
      return res.status(400).json({ message: "No request in provided id. " });
    }
    return res.status(200).json({ message: "Delete Successfully. ", request });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
module.exports = {
  addRequest,
  getRequests,
  getSelfRequest,
  getRequestByStatus,
  getRequestStatus,
  editSelfRequest,
  deleteRequest,
};
