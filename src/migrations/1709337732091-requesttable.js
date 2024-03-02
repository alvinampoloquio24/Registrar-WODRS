"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Requests", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      ownerId: {
        type: Sequelize.UUID,
        references: {
          model: "Users", // Make sure this matches your actual users table name
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Requests");
  },
};
