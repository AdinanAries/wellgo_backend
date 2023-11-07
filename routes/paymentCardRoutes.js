const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const { addCard, getCard, getCards } = require("../controllers/cardController");

router.get("/single/:id", protect, getCard);
router.get("/all/", protect, getCards);
router.post("/add/", protect, addCard);

module.exports = router;