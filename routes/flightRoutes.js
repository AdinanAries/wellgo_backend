const express = require("express");
const router = express.Router();

// Controllers
const { get_flights, list_flight_offers, get_offer_info } = require("../controllers/flightController");

router.post("/", get_flights);
router.post("/list/offers/", list_flight_offers);
router.get("/offers/:id", get_offer_info);

module.exports = router;