const express = require("express");
const router = express.Router();

const { getSecret } = require("../controllers/paymentController");

router.post("/secret/", getSecret);

module.exports = router;


