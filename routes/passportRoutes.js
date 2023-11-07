const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const { addPassport, getPassport, getPassports } = require("../controllers/passportController");

router.get("/single/:id", protect, getPassport);
router.get("/all/", protect, getPassports);
router.post("/add/", protect, addPassport);

module.exports = router;