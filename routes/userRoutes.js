const express = require("express");
const router = express.Router();

// Authentication
const { passport, isLoggedIn } = require("../middlewares/authMiddleware");

// Controllers
const { getUserDetails, login, signup, updateUserDetails } = require("../controllers/userController");

router.get("/me/:id", /*isLoggedIn,*/ getUserDetails);
router.post("/login/", passport.authenticate("local"), login);
router.post("/register/", signup);
router.put("/me/edit/:id", isLoggedIn, updateUserDetails);

module.exports = router;