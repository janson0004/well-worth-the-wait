const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");
const checkAuth = require("../middleware/auth");

// post route for sing up
router.post("/signup", UserController.user_signup);

// post route for login
router.post("/login", UserController.user_login);

// get route for get user info
router.get("/", checkAuth, UserController.user_info);

module.exports = router;
