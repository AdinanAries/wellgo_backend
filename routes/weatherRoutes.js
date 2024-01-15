const express = require("express");
const router = express.Router();

const { getWeather } = require("../controllers/weatherController");

router.get("/:longitude/:latitude/:start_date/:end_date", getWeather);

module.exports = router;