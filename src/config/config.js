require("dotenv").config({ path: __dirname + "/../../.env" });

module.exports = {
  development: {
    dialect: "postgres",
    host: process.env.DEV_HOST,
    port: process.env.DEV_PORT,
    username: process.env.DEV_USER,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DB_NAME,
    dialectOptions: {
      ssl: process.env.DEV_SSL_ENABLED === "true",
    },
  },
  test: {
    dialect: "postgres",
    host: process.env.TEST_HOST,
    port: process.env.TEST_PORT,
    username: process.env.TEST_USER,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DB_NAME,
  },
  production: {
    dialect: "postgres",
    host: process.env.PROD_HOST,
    port: process.env.PROD_PORT,
    username: process.env.PROD_USER,
    password: process.env.PROD_PASSWORD,
    database: process.env.PROD_DB_NAME,
    dialectOptions: {
      ssl: process.env.PROD_SSL_ENABLED === "true",
    },
  },
};
