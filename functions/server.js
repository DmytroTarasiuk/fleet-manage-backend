const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}/raports`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const authRoutes = require("../routes/authRoutes");
const reportRoutes = require("../routes/reportRoutes");
const mailRoutes = require("../routes/mailRoutes");

app.use("/api/auth", authRoutes);
app.use("/", reportRoutes);
app.use("/", mailRoutes);

module.exports.handler = serverless(app);
