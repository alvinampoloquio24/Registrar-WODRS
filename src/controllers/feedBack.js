const Feedback = require("../models/feedBack");

const createFeedBack = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const comment = req.body.comment;
    const feedBack = await Feedback.create({ userId, comment });

    return res.status(200).json(feedBack);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong. " });
  }
};
const getFeedback = async (req, res, next) => {
  try {
    const feedBacks = await Feedback.find();

    return res.status(200).json(feedBacks);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong. " });
  }
};

module.exports = {
  createFeedBack,
  getFeedback,
};
