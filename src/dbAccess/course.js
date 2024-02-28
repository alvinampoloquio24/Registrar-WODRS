const Course = require("../models/course");

const createCourse = async (params) => {
  try {
    const course = await Course.create(params);

    return course;
  } catch (error) {
    throw error;
  }
};
const findAll = async () => {
  try {
    const courses = await Course.findAll();
    return courses;
  } catch (error) {
    throw error;
  }
};
const findByIdAndUpdate = async (id, update) => {
  try {
    const course = await Course.findByPk(id);

    if (!course) {
      return null;
    }
    await course.update(update);
    return course;
  } catch (error) {
    throw error;
  }
};

const findByIdAndDelete = async (id) => {
  try {
    const course = await Course.destroy({ where: { id } });
    return course;
  } catch (error) {
    throw error;
  }
};
const CourseDb = {
  createCourse,
  findAll,
  findByIdAndUpdate,
  findByIdAndDelete,
};
module.exports = CourseDb;
