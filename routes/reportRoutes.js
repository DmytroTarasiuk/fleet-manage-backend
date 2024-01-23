const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.post("/reports", reportController.createReport);
router.get("/reports", reportController.getReports);
router.delete("/reports/:id", reportController.deleteReport);
router.put("/reports/:id", reportController.editReport);

module.exports = router;
