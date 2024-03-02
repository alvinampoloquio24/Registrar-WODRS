"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Requests", "paymentMethod", {
      type: Sequelize.DataTypes.ENUM("Gcash", "Cash"),
      defaultValue: "Cash",
      allowNull: false, // Depending on your requirement
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Requests", "paymentMethod");
  },
};
