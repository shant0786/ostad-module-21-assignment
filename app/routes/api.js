const express = require("express");

const UserController = require("../controllers/UserController");
const Authenticator = require("../middlewares/Authenticator");

const router = express.Router();

// Login User Users UpdateUser DeleteUser

//Registration
router.post("/registration", UserController.Registration);
//Login
router.post("/login", UserController.Login);
// Sending Email OTP
router.get("/sendingOTP",Authenticator, UserController.SendOTP);
// Account Verification
router.get("/verifyingAccount/:otp", Authenticator, UserController.VerifyAccount,);

// Get Single User
router.get("/user", Authenticator, UserController.User);
// Get All Users
router.get("/users", Authenticator, UserController.Users);
// Update Single User
router.post("/updateUser", Authenticator, UserController.UpdateUser);
// Delete Single User
router.delete("/deleteUser", Authenticator, UserController.DeleteUser);
//Logout
router.get("/logout", UserController.Logout);
module.exports = router;
