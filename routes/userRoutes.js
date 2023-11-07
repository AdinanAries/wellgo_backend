const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const { getUserDetails, login, signup, updateUserDetails } = require("../controllers/userController");

router.get("/me/", protect, getUserDetails);
router.post("/login/", login);
router.post("/register/", signup);
router.put("/me/edit/", protect, updateUserDetails);

module.exports = router;