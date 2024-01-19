const express = require("express");
const router = express.Router();

const { getWeather, getCity } = require("../controllers/weatherController");

router.get("/:longitude/:latitude/:start_date/:end_date", getWeather);
router.get("city/:longitude/:latitude/", getCity);

module.exports = router;