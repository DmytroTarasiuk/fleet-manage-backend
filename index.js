const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { createServer } = require("http");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors());

const server = createServer(app);

mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}/raports`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const Report = mongoose.model("Report", {
  date: String,
  symbol: String,
  description: String,
  income: Number,
  cost: Number,
});

app.post("/reports", async (req, res) => {
  try {
    const reportData = req.body;
    const newReport = new Report(reportData);
    await newReport.save();
    res.status(201).json({ message: "Report saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/reports", async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/reports/:id", async (req, res) => {
  const reportId = req.params.id;

  try {
    const deletedReport = await Report.findByIdAndDelete(reportId);

    if (deletedReport) {
      res
        .status(200)
        .json({ message: "Report deleted successfully", deletedReport });
    } else {
      res.status(404).json({ error: "Report not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

server.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port ${process.env.PORT || 5001}`);
});

module.exports = { app, server };
