const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const { 
    addCard, 
    getCard, 
    getCards, 
    editCard, 
    deleteCard 
} = require("../controllers/cardController");

router.get("/single/:id", protect, getCard);
router.get("/all/", protect, getCards);
router.post("/add/", protect, addCard);
router.put("/edit/", protect, editCard);
router.delete("/delete/", protect, deleteCard);

module.exports = router;