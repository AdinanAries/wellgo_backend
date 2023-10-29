const express = require("express");
const router = express.Router();

// Controllers
const { addPassport, getPassport, getPassports } = require("../controllers/passportController");

router.get("/single/:id", getPassports);
router.get("/all/:user_id", getPassport);
router.post("/add/", addPassport);

module.exports = router;