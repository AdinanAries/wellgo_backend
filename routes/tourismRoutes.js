const express = require("express");
const router = express.Router();

const { getTouristAttraction } = require("../controllers/tourismController");

router.get("/:longitude/:latitude/", getTouristAttraction);

module.exports = router;