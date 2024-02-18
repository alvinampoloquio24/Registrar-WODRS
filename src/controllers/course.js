const Course = require("../models/course");

const addCourse = async function (req, res) {
  try {
    const isRegistrar = req.user.role === "registrar";
    if (!isRegistrar) {
      return res.status(401).json({ message: "Unauthoruize Request. " });
    }
    const course = await Course.create(req.body);
    return res.status(201).json({ message: "Add succesfully", course });
  } catch (error) {
    return res.send(error);
  }
};
const getCourse = async function (req, res) {
  try {
    const isRegistrar = req.user.role === "registrar";
    if (!isRegistrar) {
      return res.status(401).json({ message: "Unauthoruize Request. " });
    }
    const courses = await Course.find();
    return res.status(201).json(courses);
  } catch (error) {
    return res.send(error);
  }
};
const editCourse = async function (req, res) {
  try {
    const isRegistrar = req.user.role === "registrar";
    if (!isRegistrar) {
      return res.status(401).json({ message: "Unauthoruize Request. " });
    }
    const id = req.params.id;
    const update = req.body;
    if (!id) {
      return res.status(400).json({ message: "Course id is required. " });
    }
    const course = await Course.findByIdAndUpdate(id, update, { new: true });
    if (!course) {
      return res
        .status(400)
        .json({ message: "There is no course in provided Id. " });
    }
    return res.status(201).json({ message: "Update Successfully. ", course });
  } catch (error) {
    return res.send(error);
  }
};
const deleteCourse = async function (req, res) {
  try {
    const isRegistrar = req.user.role === "registrar";
    if (!isRegistrar) {
      return res.status(401).json({ message: "Unauthoruize Request. " });
    }
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Course id is required. " });
    }
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res
        .status(400)
        .json({ message: "There is no course in provided Id. " });
    }
    return res.status(201).json({ message: "Delete Successfully. ", course });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = { addCourse, getCourse, editCourse, deleteCourse };
