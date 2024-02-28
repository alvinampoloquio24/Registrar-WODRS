const express = require("express");
const user = require("./routers/user");
const errorHander = require("./middleware/errorHandler");

const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});
app.use(user);
app.use(errorHander);
app.listen(3001, () => {
  console.log("Server is running at 3001");
});
