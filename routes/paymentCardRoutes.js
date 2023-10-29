const express = require("express");
const router = express.Router();

// Controllers
const { addCard, getCard, getCards } = require("../controllers/cardController");

router.get("/single/:id", getCard);
router.get("/all/:user_id", getCards);
router.post("/add/", addCard);

module.exports = router;