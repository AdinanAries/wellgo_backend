const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const { addLog, getLog, getLogs, addLogAnonymous, getLogAnonymous } = require("../controllers/bookingController");

router.get("/single/:id", protect, getLog);
router.get("/anonymous-user/single/", getLogAnonymous)
router.get("/all/", protect, getLogs);
router.post("/add/", protect, addLog);
router.post("/anonymous-user/add/", addLogAnonymous);

module.exports = router;