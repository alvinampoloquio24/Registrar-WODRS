const mongoose = require("mongoose");
const config = require("./config");

const env = process.env.NODE_ENV || "development";
console.log("Running in", env);
async function connectToDatabase() {
  try {
    await mongoose.connect(config[env].MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
      // Add any additional options as needed
    });

    mongoose.connection.on("connected", () => {
      console.log("Database connected!");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Error connecting to database:", err);
    });
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  }
}

// Export the connectToDatabase function
module.exports = connectToDatabase;
