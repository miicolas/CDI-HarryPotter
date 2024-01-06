// routes/index.js
const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController"); 


router.get("/cards", cardController.getAllCards); // Renvoie toutes les cartes de la base de données

module.exports = router; 
