const express = require("express");
const router = express.Router();

// Controllers
const { 
    get_flights, 
    list_flight_offers, 
    get_offer_info, 
    get_offer_info_post_func,
    create_flight_order,
    get_prices_markup
} = require("../controllers/flightController");

router.post("/", get_flights);
router.post("/list/offers/", list_flight_offers);
router.get("/offers/:id", get_offer_info);
router.post("/offers/:id", get_offer_info_post_func);
router.post("/orders/create/", create_flight_order);
router.get("/price-markup/", get_prices_markup);

module.exports = router;