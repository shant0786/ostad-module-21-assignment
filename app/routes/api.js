const express = require("express");

const UserController = require("../controllers/UserController");
const Authenticator = require("../middlewares/Authenticator");

const router = express.Router();

// Login User Users UpdateUser DeleteUser

//Registration
router.post("/registration", UserController.Registration);
//Login
router.post("/login", UserController.Login);
//Logout
router.get("/logout", UserController.Logout);
// Get Single User
router.get("/user", Authenticator, UserController.User);
// Get All Users
router.get("/users", Authenticator, UserController.Users);
// Update Single User
router.post("/updateUser", Authenticator, UserController.UpdateUser);
// Delete Single User
router.delete("/deleteUser", Authenticator, UserController.DeleteUser);

module.exports = router;
