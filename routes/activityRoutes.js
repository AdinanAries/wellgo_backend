const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const { logActivity, logWarning, logFailedBookings } = require("../controllers/activityController");

router.post("/log/", logActivity);
router.post("/warn/", logWarning);
router.post("/failed_bookings/", logFailedBookings);

module.exports = router;