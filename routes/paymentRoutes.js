const express = require("express");
const router = express.Router();

const { 
    getSecret, 
    getIntentDetailsById,
    updateIntentAmount,

} = require("../controllers/paymentController");

router.post("/secret/", getSecret);
router.post("/update-intent-amount/", updateIntentAmount);
router.get("/get-intent/:id/", getIntentDetailsById);

module.exports = router;


