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

    if (req.file && req.file.path) {
      // Check if req.file exists before accessing its path
      const image = await cloudinary.uploader.upload(req.file.path);
      data.image = image.url;
    }
    const request = await Request.create(data);
    delete request.status;
    await Transaction.create({ requestDetails: request });
    const documentType = request.documentationType.join(", ");

    // await sendEmail(request.controlNumber, documentType, data.emailAddress);
    console.log(request);
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

    const [pending, approve] = await Promise.all([
      Request.countDocuments({ ownerId: id, status: "pending" }),
      Request.countDocuments({ ownerId: id, status: "approve" }),
    ]);

    const status = { pending, approve };

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
    delete update.controlNumber;
    if (!requestId) {
      return res.status(400).json({
        message: "Request Id is required. ",
      });
    }
    if (req.file && req.file.path) {
      // Check if req.file exists before accessing its path
      const image = await cloudinary.uploader.upload(req.file.path);
      update.image = image.url;
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
    // Fetch all requests
    const requests = await Request.find({});

    console.log(requests);
    if (!requests) {
      return res.status(404).json({ message: "No requests found." });
    }

    // Initialize total document count
    let report = {
      totalDocument: 0,
      TOR: 0,
      COR: 0,
      COG: 0,
      COE: 0,
      goodMoral: 0,
      CAV: 0,
      Others: 0,
    };

    // Loop through each request
    for (const request of requests) {
      // Increment totalDocument count
      report.totalDocument += request.documentationType.length;

      // Loop through each document type in the request

      for (let a = 0; a <= request.documentationType.length; a++) {
        console.log(request.documentationType[a], "o");
        switch (request.documentationType[a]) {
          case "COR":
            report.COR++;
            break;
          case "TOR":
            report.TOR++;
            break;
          case "COG":
            report.COG++;
            break;
          case "COE":
            report.COE++;
            break;
          case "goodMoral":
            report.goodMoral++;
            break;
          case "CAV":
            report.CAV++;
            break;
          default:
            report.Others++; // Ensure you have initialized Others in the report
        }
      }
    }

    // Respond with the total count of documents
    res.status(200).json(report);
  } catch (error) {
    console.error("Error fetching requests:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};
const approvePayment = async function (req, res) {
  try {
    const id = req.params.id;
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      {
        status: "waiting for approval",
      },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "No request found with this id" });
    }

    res.status(200).json({ message: "Success", request: updatedRequest });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getAllRequestStatus = async function (req, res) {
  try {
    const [
      pending,
      approve,
      waitingForPayment,
      waitingForApproval,
      amountData,
    ] = await Promise.all([
      Request.countDocuments({ status: "pending" }),
      Request.countDocuments({ status: "approve" }), // Count documents with status "approve"
      Request.countDocuments({ status: "waiting for payment" }),
      Request.countDocuments({ status: "waiting for approval" }),
      Request.aggregate([
        {
          $match: { "claim.amount": { $exists: true } }, // Match documents where claim.amount exists
        },
        {
          $group: {
            _id: null, // Group all matching documents together (null means no grouping key)
            totalAmount: { $sum: "$claim.amount" }, // Sum all claim.amount values
          },
        },
      ]),
    ]);

    // Extract the total amount from the aggregation result
    const totalAmount = amountData.length > 0 ? amountData[0].totalAmount : 0;

    // Ensure that the 'waitingForPayment' and 'waitingForApproval' statuses are included in the response
    const status = {
      pending,
      approve,
      waitingForPayment,
      waitingForApproval,
      totalAmount, // Include the totalAmount in the response
    };

    return res.status(200).json(status);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

// otal: 0,
//       TOR: 0,
//       COR: 0,
//       COG: 0,
//       COE: 0,
//       goodMoral: 0,
//       CAV: 0,
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
const updateRequest = async function (req, res) {
  try {
    const id = req.params.id;
    const request = await Request.findByIdAndUpdate(id, req.body);

    if (!request) {
      return res.status(400).json({ message: "No request in this id. " });
    }
    return res.status(200).json(request);
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
  approvePayment,
  updateRequest,
};
