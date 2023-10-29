const express = require("express");
const router = express.Router();

// Controllers
const { getUserDetails, login, signup, updateUserDetails } = require("../controllers/userController");

router.get("/me/:id", getUserDetails);
router.post("/login/", login);
router.post("/register/", signup);
router.put("/me/edit/:id", updateUserDetails);

module.exports = router;