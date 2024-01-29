const express = require("express");
const router = express.Router();

const { getSecret } = require("../controllers/paymentController");

router.get("/secret/", getSecret);

module.exports = router;


