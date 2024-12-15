const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const {
    getUserDetails,
    login,
    signup,
    updateUserDetails,
    updateUserPassword,
    subScribeToPriceAlerts,
    resetPasswordRequestController,
    resetPasswordController
} = require("../controllers/userController");

router.get("/me/", protect, getUserDetails);
router.post("/login/", login);
router.post("/register/", signup);
router.put("/edit/", protect, updateUserDetails);
router.put("/edit/password", protect, updateUserPassword);
router.post("/request-password-reset", resetPasswordRequestController);
router.post("/reset-password", resetPasswordController);
router.post("/price-alerts/subscribe", subScribeToPriceAlerts);

module.exports = router;
