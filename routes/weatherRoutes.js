const express = require("express");
const router = express.Router();

const { getWeather } = require("../controllers/weatherController");

router.get("/:longitude/:latitude", getWeather);

module.exports = router;