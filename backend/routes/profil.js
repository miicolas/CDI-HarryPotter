// routes/profil.js
const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const profilController = require("../controllers/profilController"); 

router.get("/getprofile", authenticateToken, profilController.getProfil);

module.exports = router;
