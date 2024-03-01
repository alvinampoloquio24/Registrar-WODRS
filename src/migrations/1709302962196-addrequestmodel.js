"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Requests", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      ownerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      controlNumber: {
        type: Sequelize.STRING,
      },
      studentId: {
        type: Sequelize.STRING,
      },
      emailAddress: {
        type: Sequelize.STRING,
      },
      isOwner: {
        type: Sequelize.STRING,
      },
      documentationType: {
        type: Sequelize.STRING,
      },
      relationshipToOwner: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("pending", "processing", "realising", "complete"),
        defaultValue: "pending",
      },
      noOfCopies: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Requests");
  },
};
