// routes/logout.js
const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/logoutController"); 
const validateLogout = require("../middleware/logoutValidation");

router.get("/logout", validateLogout,logoutController.logout); 

module.exports = router;

