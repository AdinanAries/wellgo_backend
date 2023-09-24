const express = require("express");
const router = express.Router();

// Controllers
const { get_flights } = require("../controllers/flightController");

router.get("/", get_flights);

module.exports = router;