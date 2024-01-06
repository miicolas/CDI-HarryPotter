// routes/signup.js

const express = require("express");
const router = express.Router();
const changeInfosController = require("../controllers/changeInfosController");
const authenticateToken = require("../middleware/authenticateToken");
const updateInfosValidation = require("../middleware/updateInfosValidation");

router.post("/changeinfos", authenticateToken, updateInfosValidation, changeInfosController.updateProfilInfos); // Vérifie le token et met à jour les infos de l'utilisateur

module.exports = router;
