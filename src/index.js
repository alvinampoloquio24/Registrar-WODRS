const express = require("express");
const user = require("./routers/user");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config({ path: path.join(__dirname, "config", ".env") });
const connectToDatabase = require("./config/database");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Handle JSON data
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
connectToDatabase();

app.get("/", (req, res) => {
  res.send("hello");
});
app.use(user);

app.listen(3001, () => {
  console.log("Server is running at 3001");
});
