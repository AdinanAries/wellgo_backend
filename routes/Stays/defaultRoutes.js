const express = require("express");
const router = express.Router();

// Controllers
const { 
    get_stays,
    get_rooms_and_rates,
} = require("../../controllers/Stays/defaultController");

// Routes
router.post("/", get_stays);
router.get("/rooms-and-rates/:id/", get_rooms_and_rates);

module.exports = router;