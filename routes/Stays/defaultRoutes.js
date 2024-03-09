const express = require("express");
const router = express.Router();

// Controllers
const { 
    get_stays,
    get_rooms_and_rates,
    get_final_quote,
    create_stay_booking,
} = require("../../controllers/Stays/defaultController");

// Routes
router.post("/", get_stays);
router.get("/rooms-and-rates/:id/", get_rooms_and_rates);
router.get("/get-final-quote/:id/", get_final_quote);
router.post("/create-booking/", create_stay_booking);

module.exports = router;