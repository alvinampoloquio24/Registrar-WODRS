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

module.exports = { addRequest, getRequests, getSelfRequest };
