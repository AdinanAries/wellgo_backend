const express = require("express");
const router = express.Router();

const { 
    getAllRatedPlace, 
    getRatedPlace,
    getRatedPlacesByCity
} = require("../controllers/ratedPlacesController");

router.get("/", getAllRatedPlace);
router.get("/:id", getRatedPlace);
router.get("/:city", getRatedPlacesByCity);