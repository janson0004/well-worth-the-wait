const express = require("express");
const router = express.Router();

const RestaurantController = require("../controllers/restaurant");
const checkAuth = require("../middleware/auth");
const checkAdmin = require("../middleware/admin");

//post route for creating new restaurant
router.post("/", checkAuth, checkAdmin, RestaurantController.restaurant_create);

//post route for creating restaurant comment
router.post(
  "/comment",
  checkAuth,
  checkAdmin,
  RestaurantController.restaurant_comment
);

// get route for getting all restaurants
router.get("/", RestaurantController.restaurant_all);

//get route for getting specified restaurant
router.get("/:placeId", RestaurantController.restaurant_one);

//get route for getting restaurant waiting time
router.get("/wait/:placeId", RestaurantController.restaurant_wait);

//get route for getting restaurant popular time
router.get("/popular/:placeId", RestaurantController.restaurant_popular);

//put route for updating specified restaurant
router.put(
  "/:placeId",
  checkAuth,
  checkAdmin,
  RestaurantController.restaurant_update
);

//delete route for deleting specified restaurant
router.delete(
  "/:placeId",
  checkAuth,
  checkAdmin,
  RestaurantController.restaurant_delete
);

//testing populartime_api route *will delete after finished
router.get("/test/:placeId", RestaurantController.restaurant_test);

//add fav place
router.post("/fav", checkAuth, RestaurantController.add_fav);

//refresh restaurant data
router.put("/refresh/:placeId", 
  checkAuth,
  checkAdmin,
  RestaurantController.restaurant_refresh
);

module.exports = router;
