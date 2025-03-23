const express = require("express");
const router = express.Router();

// Controllers
const { 
    get_flights, 
    list_flight_offers, 
    get_offer_info, 
    create_flight_order,
    get_prices_markup_percentage
} = require("../controllers/flightController");

router.post("/", get_flights);
router.post("/list/offers/", list_flight_offers);
router.get("/offers/:id", get_offer_info);
router.post("/orders/create/", create_flight_order);
router.get("/price-markup-percentage/", get_prices_markup_percentage);

module.exports = router;