// routes/login.js
const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController"); 
const validateLogin = require("../middleware/loginValidation");

router.post("/login", validateLogin,loginController.login); // Utilisez la fonction de contrôleur pour gérer la route

module.exports = router;
