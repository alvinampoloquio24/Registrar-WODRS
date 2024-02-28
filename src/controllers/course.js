const CourseService = require("../services/course");

const addCourse = async function (req, res, next) {
  try {
    const isRegistrar = req.user.role === "registrar";
    if (!isRegistrar) {
      return res.status(401).json({ message: "Unauthoruize Request. " });
    }

    const course = await CourseService.createCourse(req.body);
    return res.status(201).json({ message: "Add succesfully", course });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
const getCourse = async function (req, res, next) {
  try {
    const isRegistrar = req.user.role === "registrar";
    if (!isRegistrar) {
      return res.status(401).json({ message: "Unauthoruize Request. " });
    }
    const courses = await CourseService.getAllCourse();
    return res.status(201).json(courses);
  } catch (error) {
    return next(error);
  }
};
const editCourse = async function (req, res, next) {
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
    const course = await CourseService.updateCourse(id, update);
    if (!course) {
      return res
        .status(400)
        .json({ message: "There is no course in provided Id. " });
    }
    return res.status(201).json({ message: "Update Successfully. ", course });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
const deleteCourse = async function (req, res, next) {
  try {
    const isRegistrar = req.user.role === "registrar";
    if (!isRegistrar) {
      return res.status(401).json({ message: "Unauthoruize Request. " });
    }
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Course id is required. " });
    }
    const course = await CourseService.deleteCourse(id);
    if (!course) {
      return res
        .status(400)
        .json({ message: "There is no course in provided Id. " });
    }
    return res.status(201).json({ message: "Delete Successfully. ", course });
  } catch (error) {
    return next(error);
  }
};

module.exports = { addCourse, getCourse, editCourse, deleteCourse };
