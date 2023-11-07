const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const { addLog, getLog, getLogs } = require("../controllers/bookingController");

router.get("/single/:id", protect, getLog);
router.get("/all/", protect, getLogs);
router.post("/add/", protect, addLog);

module.exports = router;