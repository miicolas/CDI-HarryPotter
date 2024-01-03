// routes/signup.js

const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/settings", authenticateToken, settingsController.getProfilInfos); 
module.exports = router;
