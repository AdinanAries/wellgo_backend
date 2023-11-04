const express = require("express");
const router = express.Router();

// Controllers
const { addPassport, getPassport, getPassports } = require("../controllers/passportController");

router.get("/single/:id", getPassport);
router.get("/all/:user_id", getPassports);
router.post("/add/", addPassport);

module.exports = router;