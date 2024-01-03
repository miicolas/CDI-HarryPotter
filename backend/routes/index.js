// routes/index.js
const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController"); 


router.get("/cards", cardController.getAllCards); 

module.exports = router;
