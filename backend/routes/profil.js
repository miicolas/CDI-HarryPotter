// routes/profil.js
const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const profilController = require("../controllers/profilController"); 



router.get("/profil", authenticateToken , profilController.getProfil); // Utilisez la fonction de contrôleur pour gérer la route

module.exports = router;
