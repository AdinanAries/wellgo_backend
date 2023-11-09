const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const { addPassport, getPassport, getPassports, editPassport, deletePassport } = require("../controllers/passportController");

router.get("/single/:id", protect, getPassport);
router.get("/all/", protect, getPassports);
router.post("/add/", protect, addPassport);
router.put("/edit/", protect, editPassport);
router.delete("/delete/", protect, deletePassport);

module.exports = router;