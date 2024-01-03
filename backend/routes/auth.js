// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); 
const validateLogin = require("../middleware/loginValidation");
const validateLogout = require("../middleware/logoutValidation");
const validateSignup = require("../middleware/signupValidation");

router.post("/signup", validateSignup, authController.signup);
router.get("/logout", validateLogout,authController.logout); 
router.post("/login", validateLogin,authController.login); 


module.exports = router;
