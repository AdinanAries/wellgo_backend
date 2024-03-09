const express = require("express");
const router = express.Router();

// Controllers
const { 
    get_stays,
} = require("../../controllers/Stays/defaultController");

// Routes
router.post("/", get_stays);

module.exports = router;