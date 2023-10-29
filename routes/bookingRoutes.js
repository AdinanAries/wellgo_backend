const express = require("express");
const router = express.Router();

// Controllers
const { addLog, getLog, getLogs } = require("../controllers/bookingController");

router.get("/single/:id", getLog);
router.get("/all/:user_id", getLogs);
router.post("/add/", addLog);

module.exports = router;