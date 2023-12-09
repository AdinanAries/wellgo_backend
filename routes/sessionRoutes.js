const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const { verifyUserToken } = require("../controllers/sessionController");

router.get("/verify-token/", protect, verifyUserToken);

module.exports = router;