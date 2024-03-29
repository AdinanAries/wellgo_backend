const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const { 
    logActivity, 
    logError, 
    logFailedBookings, 
    createBookingIntent, 
    addIntentUpdate,
} = require("../controllers/activityController");

router.post("/log/", logActivity);
router.post("/error/", logError);
router.post("/failed-booking/", logFailedBookings);
router.post("/booking-intent/", createBookingIntent);
router.post("/add-booking-intent-update/", addIntentUpdate);

module.exports = router;