const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const { logActivity, logError, logFailedBookings } = require("../controllers/activityController");

router.post("/log/", logActivity);
router.post("/error/", logError);
router.post("/failed_bookings/", logFailedBookings);

module.exports = router;