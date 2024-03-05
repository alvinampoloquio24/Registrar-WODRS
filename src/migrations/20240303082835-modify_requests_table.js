"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove the ownerId column
    await queryInterface.removeColumn("Requests", "ownerId");

    // Re-add the ownerId column with the onDelete CASCADE option
    await queryInterface.addColumn("Requests", "ownerId", {
      type: Sequelize.DataTypes.UUID,
      references: {
        model: "Users", // name of the referenced table
        key: "id", // key in the referenced table
      },
      onDelete: "CASCADE", // Delete rows in 'Requests' when the referenced row in 'Users' is deleted
      onUpdate: "CASCADE", // Update the reference when the referenced row's id changes
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the modified ownerId column
    await queryInterface.removeColumn("Requests", "ownerId");

    // Re-add the original ownerId column without the onDelete CASCADE option
    await queryInterface.addColumn("Requests", "ownerId", {
      type: Sequelize.DataTypes.UUID,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "SET NULL", // or whatever the original setting was
    });
  },
};
