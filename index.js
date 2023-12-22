const express = require("express");
const cors = require("cors");
const { createServer } = require("http");

const app = express();

app.use(cors());

const server = createServer(app);

app.get("/test", async (req, res) => {
  res.send("Test");
});

app.get("/", async (req, res) => {
  res.send("Home");
});

app.get("/dashboard", async (req, res) => {
  res.send("Dashboard");
});

server.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port ${process.env.PORT || 5001}`);
});

module.exports = { app, server };
