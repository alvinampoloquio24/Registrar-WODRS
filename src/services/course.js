const CourseDb = require("../dbAccess/course");

module.exports = {
  createCourse: async (params) => {
    try {
      return await CourseDb.createCourse(params);
    } catch (error) {
      throw error;
    }
  },
  getAllCourse: async () => {
    try {
      return await CourseDb.findAll();
    } catch (error) {
      throw error;
    }
  },
  updateCourse: async (id, update) => {
    try {
      return await CourseDb.findByIdAndUpdate(id, update);
    } catch (error) {
      throw error;
    }
  },
  deleteCourse: async (id) => {
    try {
      const course = await CourseDb.findByIdAndDelete(id);
      return course;
    } catch (error) {
      throw error;
    }
  },
};
