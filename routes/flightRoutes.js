const express = require("express");
const router = express.Router();

// Controllers
const { get_flights, list_flight_offers } = require("../controllers/flightController");

router.post("/", get_flights);
router.post("/list/offers/", list_flight_offers);

module.exports = router;