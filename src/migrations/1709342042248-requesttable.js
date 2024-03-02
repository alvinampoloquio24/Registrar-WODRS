"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Requests", {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        allowNull: false,
      },
      ownerId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      controlNumber: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      studentId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      emailAddress: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      isOwner: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      documentationType: {
        type: Sequelize.DataTypes.ENUM(
          "TOR",
          "COR",
          "COG",
          "COE",
          "Good Moral",
          "CAV",
          "Others"
        ),
        defaultValue: "Others",
        allowNull: false,
      },
      relationshipToOwner: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.DataTypes.ENUM(
          "pending",
          "processing",
          "realising",
          "complete"
        ),
        defaultValue: "pending",
        allowNull: false,
      },
      noOfCopies: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Requests");
  },
};
