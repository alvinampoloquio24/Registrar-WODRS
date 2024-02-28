"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Requests", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ownerId: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Add foreign key constraint manually since Sequelize sometimes has issues with it
    await queryInterface.addConstraint("Requests", {
      fields: ["ownerId"],
      type: "foreign key",
      name: "fk_ownerId_Requests",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Requests");
  },
};
