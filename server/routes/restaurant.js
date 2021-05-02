const express = require("express");
const router = express.Router();

const RestaurantController = require("../controllers/restaurant");

//post route for creating new restaurant
router.post("/", RestaurantController.restaurant_create)

// get route for getting all restaurants
router.get("/", RestaurantController.restaurant_all);

//get route for getting specified restaurant
router.get("/:placeId", RestaurantController.restaurant_one);

//get route for getting restaurant waiting time
router.get("/time/:placeId", RestaurantController.restaurant_time);

//put route for updating specified restaurant
router.put("/:placeId", RestaurantController.restaurant_update);

//delete route for deleting specified restaurant
router.delete("/:placeId", RestaurantController.restaurant_delete);

//testing populartime_api route *will delete after finished
router.get("/test/:placeId", RestaurantController.restaurant_test);

module.exports = router;