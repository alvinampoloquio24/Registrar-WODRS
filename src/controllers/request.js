const Request = require("../models/request");
const Transaction = require("../models/transaction");
const crypto = require("crypto");
const cloudinary = require("../config/cloudinary");
const sendEmail = require("../email/email");

const addRequest = async function (req, res) {
  try {
    let data = req.body;
    data.ownerId = req.user._id;
    data.controlNumber = generateControlNumber();

    if (req.files && req.files.clearance && req.files.clearance.length > 0) {
      const clearanceImage = await cloudinary.uploader.upload(
        req.files.clearance[0].path
      );
      data.clearance = clearanceImage.url;
    }

    const request = await Request.create(data);
    delete request.status;
    await Transaction.create({ requestDetails: request });
    const documentType = request.documentationType.join(", ");

    // await sendEmail(request.controlNumber, documentType, data.emailAddress);
    return res.status(201).json({ message: "Add successfully", request });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};
const getRequests = async function (req, res) {
  try {
    const requests = await Request.find();

    return res.status(200).json(requests);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong. ", error: error.message });
  }
};
const getSelfRequest = async function (req, res) {
  try {
    const requests = await Request.find({ ownerId: req.user._id });

    return res.status(200).json(requests);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong. ", error: error.message });
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
    return res
      .status(500)
      .json({ message: "Somthing went wrong. ", error: error.message });
  }
};
const getRequestByStatus = async function (req, res) {
  try {
    const status = req.query.status;
    const requests = await Request.find({ ownerId: req.user._id, status });

    return res.status(200).json(requests);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong. ", error: error.message });
  }
};
const editSelfRequest = async function (req, res) {
  try {
    const requestId = req.params.id;
    const id = req.user._id;
    const update = req.body;
    if (!requestId) {
      return res.status(400).json({
        message: "Request Id is required. ",
      });
    }
    const request = await Request.findOneAndUpdate(
      {
        ownerId: id,
        _id: requestId,
      },
      { $set: update },
      { new: true }
    );
    if (!request) {
      return res.status(400).json({
        message: "No reqeust in id provided. ",
      });
    }

    return res.status(200).json({ message: "Update Successfully. ", request });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong. ", error: error.message });
  }
};
const deleteRequest = async function (req, res) {
  try {
    const requestId = req.params.id;
    if (!requestId) {
      return res.status(400).json({ message: "Request Id is required. " });
    }
    const request = await Request.findByIdAndDelete(requestId);

    if (!request) {
      return res.status(400).json({ message: "No request in provided id. " });
    }
    return res.status(200).json({ message: "Delete Successfully. ", request });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong. ", error: error.message });
  }
};
const getDocumentReport = async function (req, res) {
  try {
    // Aggregate documents to count how many belong to each documentationType
    const aggregation = await Request.aggregate([
      {
        $group: {
          _id: "$documentationType", // Group by the 'documentationType' field
          count: { $sum: 1 }, // Count the documents in each group
        },
      },
    ]);

    // Initialize an object to hold your counts
    let counts = {
      total: 0,
      TOR: 0,
      COR: 0,
      COG: 0,
      COE: 0,
      goodMoral: 0,
      CAV: 0,
      Others: 0,
    };

    // Map the aggregation results to your counts object
    aggregation.forEach((group) => {
      counts.total += group.count; // Increment the total count
      if (counts.hasOwnProperty(group._id)) {
        counts[group._id] = group.count;
      }
    });

    // Respond with the counts
    res.status(200).json(counts);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong. ", error: error.message });
  }
};
const getAllRequestStatus = async function (req, res) {
  try {
    const [pending, complete, processing, realising] = await Promise.all([
      Request.countDocuments({ status: "pending" }),
      Request.countDocuments({ status: "complete" }),
      Request.countDocuments({ status: "processing" }),
      Request.countDocuments({ status: "realising" }),
    ]);

    const status = { pending, realising, complete, processing };

    return res.status(200).json(status);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong. ", error: error.message });
  }
};
const generateControlNumber = function () {
  // Generate a random 8-byte hex string
  const uniqueId = crypto.randomBytes(8).toString("hex");

  // Example format: "CN-YYMMDD-UNIQUEID"
  const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const controlNumber = `CN-${datePart}-${uniqueId}`;

  return controlNumber;
};
const getControlNumber = async function (req, res) {
  try {
    const controlNumber = req.params.number;
    const request = await Request.findOne({ controlNumber });
    return res.status(200).json(request);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong. ", error: error.message });
  }
};
const approveRequest = async function (req, res) {
  try {
    const id = req.params.id;
    const { name, amount } = req.body;
    const request = await Request.findByIdAndUpdate(
      id,
      {
        status: "approve",
        claim: { name, amount },
      },
      { new: true }
    );
    if (!request) {
      return res.status(400).json({ message: "No tarnsaction in this Id. " });
    }
    return res.status(201).json({ message: "Approve Successfully", request });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong. ", error: error.message });
  }
};
const getAllRequest = async function (req, res) {
  try {
    const requests = await Request.find();
    return res.status(200).json(requests);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong. ", error: error.message });
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
  getDocumentReport,
  getAllRequestStatus,
  getControlNumber,
  approveRequest,
  getAllRequest,
};
