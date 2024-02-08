const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(3001, () => {
  console.log("Server is running at 3001");
});
