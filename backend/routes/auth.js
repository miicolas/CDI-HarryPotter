// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authValidation = require("../middleware/authValidation");

router.post("/signup", authValidation.validateSignup, authController.signup); // Vérifie
// les données du
// formulaire d'inscription et crée un nouvel utilisateur
router.get("/logout", authValidation.validateLogout,authController.logout);  // Supprime le token pour déconnecter l'utilisateur
router.post("/login", authValidation.validateLogin,authController.login);  // Vérifie les données du formulaire de connexion et connecte l'utilisateur


module.exports = router;
