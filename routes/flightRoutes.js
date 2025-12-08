const express = require("express");
const router = express.Router();
const { approveTransaction } = require("../middlewares/verifyAgentMiddleware");

// Controllers
const { 
    get_flights, 
    list_flight_offers, 
    get_offer_info, 
    get_offer_info_post_func,
    create_flight_order,
    get_prices_markup
} = require("../controllers/flightController");

router.post("/", approveTransaction, get_flights);
router.post("/list/offers/", approveTransaction,list_flight_offers);
router.get("/offers/:id", approveTransaction, get_offer_info);
router.post("/offers/", approveTransaction, get_offer_info_post_func);
router.post("/orders/create/", approveTransaction, create_flight_order);
router.get("/price-markup/", get_prices_markup);

module.exports = router;