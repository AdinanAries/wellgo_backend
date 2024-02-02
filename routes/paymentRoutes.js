const express = require("express");
const router = express.Router();

const { 
    getSecret, 
    getIntentDetailsById,

} = require("../controllers/paymentController");

router.post("/secret/", getSecret);
router.get("/get-intent/:id/", getIntentDetailsById);

module.exports = router;


