const express = require("express");
const router = express.Router();

const RestaurantController = require("../controllers/restaurant");

//post route for create new restaurant
router.post("/", RestaurantController.restaurant_create)

// get route for get all restaurants
router.get("/", RestaurantController.restaurant_all);

//get route for get specified restaurant
router.get("/:placeId", RestaurantController.restaurant_one);

router.put("/:placeId", RestaurantController.restaurant_update);

router.delete("/:placeId", RestaurantController.restaurant_delete);

module.exports = router;