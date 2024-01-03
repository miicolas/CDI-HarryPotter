// routes/signup.js

const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/getuserinfos", authenticateToken, settingsController.getProfilInfos); 
module.exports = router;
