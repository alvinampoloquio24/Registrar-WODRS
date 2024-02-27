require("dotenv").config({ path: "./src/config/.env" }); // Load .env file from src/config folder

const { Sequelize } = require("sequelize");

// Now process.env should have the variables loaded from .env
const { PG_PORT, USER, PASSWORD, DB_NAME, HOST } = process.env;
console.log(PG_PORT);

// Initialize Sequelize with database credentials
const sequelize = new Sequelize(DB_NAME, USER, PASSWORD, {
  host: HOST,
  port: PG_PORT,
  dialect: "postgres", // Specify the dialect
});

module.exports = sequelize;
