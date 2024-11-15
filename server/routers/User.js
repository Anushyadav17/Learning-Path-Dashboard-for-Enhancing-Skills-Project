const express = require("express");
const router = express.Router();

// Import the controller functions
const { login, signUp, sendOTP, changePassword } = require("../controllers/Auth");
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");
const { AIchat } = require('../controllers/AIchat'); // AI chat controller for /classify endpoint

// Import the middleware
const { auth } = require("../middlewares/auth"); // Authentication middleware

// Define the routes
router.post("/login", login); 
router.post("/signup", signUp); 
router.post("/sendotp", sendOTP); 
router.post("/changepassword", auth, changePassword); 
router.post("/reset-password-token", resetPasswordToken); 
router.post("/reset-password", resetPassword); 
router.post("/classify", AIchat); 
module.exports = router;
