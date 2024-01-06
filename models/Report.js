const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  date: String,
  symbol: String,
  description: String,
  income: Number,
  cost: Number,
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
