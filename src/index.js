const express = require("express");
const user = require("./routers/user");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "config", ".env") });
const connectToDatabase = require("./config/database");
const app = express();
app.use(express.json());
connectToDatabase();

app.get("/", (req, res) => {
  res.send("hello");
});
app.use(user);
app.listen(3001, () => {
  console.log("Server is running at 3001");
});
