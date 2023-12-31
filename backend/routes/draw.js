// routes/card.js
const express = require("express");
const router = express.Router();
const drawController = require("../controllers/drawController");
const drawTime = require("../middleware/drawTimeValidation");
const authenticateToken = require("../middleware/authenticateToken"); 


router.get("/draw", authenticateToken, drawTime, drawController.getDrawCards); 

module.exports = router;
