// routes/card.js
const express = require("express");
const router = express.Router();
const drawController = require("../controllers/drawController");
const drawTime = require("../middleware/drawTimeValidation");
const authenticateToken = require("../middleware/authenticateToken"); 


router.get("/draw", authenticateToken, drawTime, drawController.getDrawCards); // Vérifie le token, vérifie si l'utilisateur a déjà tiré une carte aujourd'hui et renvoie les cartes tirées par l'utilisateur

module.exports = router;
