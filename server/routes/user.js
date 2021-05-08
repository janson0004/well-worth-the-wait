const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");
const checkAuth = require("../middleware/auth");
const checkAdmin = require("../middleware/admin");

// post route for sing up
router.post("/signup", UserController.user_signup);

// post route for login
router.post("/login", UserController.user_login);

// get route for get user info
router.get("/", checkAuth, UserController.user_info);

// get all users info
router.get("/all", checkAuth, checkAdmin, UserController.all_user_info);

//update user info, admin required
router.put("/", checkAuth, checkAdmin, UserController.user_update);

//logout
router.post("/logout", checkAuth, UserController.user_logout);

//delete user
router.delete("/:userId", checkAuth, checkAdmin, UserController.user_delete);

module.exports = router;
