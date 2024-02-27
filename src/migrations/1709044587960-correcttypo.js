"use strict";
const { DataTypes } = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Courses", "desciption", "description");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Courses", "description", "desciption");
  },
};
