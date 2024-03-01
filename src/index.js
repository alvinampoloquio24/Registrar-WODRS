const express = require("express");
const user = require("./routers/user");
const errorHander = require("./middleware/errorHandler");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Route to set a key in Redis

// Define the async function to interact with Redis

app.use(user);
app.use(errorHander); // Error handling middleware should be added after other middleware and routes

const port = process.env.PORT || 3001; // Use environment variable for port or default to 3001
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
