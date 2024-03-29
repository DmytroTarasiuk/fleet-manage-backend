const Report = require("../models/Report");

exports.createReport = async (req, res) => {
  try {
    const reportData = req.body;
    const newReport = new Report(reportData);
    await newReport.save();
    res.status(201).json({ message: "Report saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getReportById = async (req, res) => {
  const reportId = req.params.id;

  try {
    const report = await Report.findById(reportId);

    if (report) {
      res.status(200).json(report);
    } else {
      res.status(404).json({ error: "Report not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteReport = async (req, res) => {
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
};

exports.editReport = async (req, res) => {
  const reportId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      updatedData,
      { new: true }
    );

    if (updatedReport) {
      res
        .status(200)
        .json({ message: "Report updated successfully", updatedReport });
    } else {
      res.status(404).json({ error: "Report not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
