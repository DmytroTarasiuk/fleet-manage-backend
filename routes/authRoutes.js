const express = require("express");
const router = express.Router();
const authController = require("../controllers/authContoller");
const validateRegistration = require("../middleware/validateRegistration");

router.post("/login", authController.login);
router.post("/register", validateRegistration, authController.register);

module.exports = router;
