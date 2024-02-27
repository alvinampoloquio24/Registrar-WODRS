require("dotenv").config({ path: "./src/config/.env" });

module.exports = {
  development: {
    dialect: "postgres",
    host: "localhost" || process.env.HOST,
    port: 5432 || process.env.PG_PORT,
    username: "postgres" || process.env.USER,
    password: "alvin2024" || process.env.PASSWORD,
    database: "test2" || process.env.DB_NAME,
  },
  test: {
    dialect: "postgres",
    host: process.env.HOST,
    port: process.env.PG_PORT,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
  },
  production: {
    dialect: "postgres",
    host: process.env.HOST,
    port: process.env.PG_PORT,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
  },
};
