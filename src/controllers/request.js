const RequestService = require("../services/request");

const documentType = require("../constant/documentType");

const addRequest = async function (req, res, next) {
  try {
    let data = req.body;
    data.ownerId = req.user.id;

    const providedDocumentType = data.documentationType;

    // Check if the provided document type is not valid
    if (!Object.values(documentType).includes(providedDocumentType)) {
      const validDocumentTypes = Object.values(documentType).join(", ");
      return res.status(400).json({
        message: `Invalid document type. Valid document types are: ${validDocumentTypes}`,
      });
    }

    const request = await RequestService.createRequest(data);
    return res.status(201).json({ message: "Added successfully", request });
  } catch (error) {
    return next(error);
  }
};
const getRequests = async function (req, res, next) {
  try {
    if (req.user.role !== "registrar") {
      return res.status(401).json({ message: "Unauthorize Request. " });
    }
    const requests = await RequestService.findAll();

    return res.status(200).json(requests);
  } catch (error) {
    return next(error);
  }
};
const getSelfRequest = async function (req, res, next) {
  try {
    const requests = await RequestService.findSelfRequest(req.user.id);

    return res.status(200).json(requests);
  } catch (error) {
    return next(error);
  }
};
const getRequestStatus = async function (req, res, next) {
  try {
    const id = req.user.id;

    const status = await RequestService.getRequestStatus(id);

    return res.status(200).json(status);
  } catch (error) {
    return next(error);
  }
};
const getRequestByStatus = async function (req, res, next) {
  try {
    const status = req.query.status;
    const id = req.user.id;
    const requests = await RequestService.getRequestByStatus(id, status);

    return res.status(200).json(requests);
  } catch (error) {
    return next(error);
  }
};
const editSelfRequest = async function (req, res, next) {
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
    return next(error);
  }
};
const deleteRequest = async function (req, res, next) {
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
    return next(error);
  }
};
const approveRequest = async function (req, res, next) {
  try {
    const requestId = req.params.id;
    if (!requestId) {
      return res.status(400).json({ message: "Request Id is required. " });
    }
    const update = {
      status: "processing",
    };
    const request = await RequestService.findByIdAndUpdate(requestId, update);

    if (!request) {
      return res.status(400).json({ message: "No request in provided id. " });
    }
    return res.status(200).json({ message: "Delete Successfully. ", request });
  } catch (error) {
    return next(error);
  }
};
const getAllRequestStatus = async function (req, res, next) {
  try {
    const status = await RequestService.getRequestStatus();

    return res.status(200).json(status);
  } catch (error) {
    return next(error);
  }
};
const getDocumentReport = async function (req, res, next) {
  try {
    const report = await RequestService.getDocumentReport();
    return res.status(200).json(report);
  } catch (error) {
    return next(error);
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
  approveRequest,
  getAllRequestStatus,
  getDocumentReport,
};
