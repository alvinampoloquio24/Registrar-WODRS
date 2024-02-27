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

// const mongoose = require("mongoose");

// const MONGODB_URL = process.env.MONGODB_URL;

// async function connectToDatabase() {
//   try {
//     await mongoose.connect(MONGODB_URL, {
//       serverSelectionTimeoutMS: 5000,
//       // Add any additional options as needed
//     });

//     mongoose.connection.on("connected", () => {
//       console.log("Database connected!");
//     });

//     mongoose.connection.on("error", (err) => {
//       console.error("Error connecting to database:", err);
//     });
//   } catch (error) {
//     console.error("Error connecting to database:", error.message);
//   }
// }

// // Export the connectToDatabase function
// module.exports = connectToDatabase;
