// routes/profil.js
const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const profilController = require("../controllers/profilController"); 

router.get("/getprofile", authenticateToken, profilController.getProfil); // Vérifie le token et renvoie les infos de l'utilisateur du profil
router.get("/getuserinfos", authenticateToken, profilController.getProfilSettings);  // Vérifie le token et renvoie les infos de l'utilisateur pour les réglages du compte

module.exports = router;
