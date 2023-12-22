const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.get("/test", async (req, res) => {
  res.send("Test");
});

app.get("/", async (req, res) => {
  res.send("Home");
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { app, server };
