const { Sequelize } = require("sequelize");
const config = require("../config/config");

// Determine the environment
const env = process.env.NODE_ENV || "development";
console.log("Run in", env);
// Initialize Sequelize with database credentials based on the environment
const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    port: config[env].port,
    dialect: config[env].dialect,
    dialectOptions: {
      ssl: config[env].dialectOptions.ssl,
    },
  }
);

module.exports = sequelize;
