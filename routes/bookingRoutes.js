const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const { addLog, getLog, getLogs, addLogAnonymous, getLogAnonymous } = require("../controllers/bookingController");

// Protected routes
router.get("/single/:id", protect, getLog);
router.get("/all/", protect, getLogs);
router.post("/add/", protect, addLog);

// Unprotected routes
router.get("/anonymous-user/single/:ref/:email", getLogAnonymous)
router.post("/anonymous-user/add/", addLogAnonymous);

module.exports = router;