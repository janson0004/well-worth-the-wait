const express = require("express");
const router = express.Router();

const RestaurantController = require("../controllers/restaurant");

// get route for get all restaurants
router.get("/", RestaurantController.restaurant_all);
router.get("/:placeId", RestaurantController.restaurant_one);

module.exports = router;