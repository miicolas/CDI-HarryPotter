// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); 
const validateLogin = require("../middleware/loginValidation");
const validateLogout = require("../middleware/logoutValidation");
const validateSignup = require("../middleware/signupValidation");

router.post("/signup", validateSignup, authController.signup); // Vérifie les données du formulaire d'inscription et crée un nouvel utilisateur
router.get("/logout", validateLogout,authController.logout);  // Supprime le token pour déconnecter l'utilisateur
router.post("/login", validateLogin,authController.login);  // Vérifie les données du formulaire de connexion et connecte l'utilisateur


module.exports = router;
