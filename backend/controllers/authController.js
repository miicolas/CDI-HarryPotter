// controllers/loginController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { query } = require("../config/queries");

async function login(req, res) {
  try { 
    const user = req.user; // Récupère l'utilisateur authentifié par le middleware authenticateToken 
    const token = jwt.sign({ user }, "secretKey"); // Crée un token avec l'utilisateur authentifié
    res.cookie("AuthToken", token, { // Crée un cookie avec le token
      httpOnly: true, 
      secure: false,
      sameSite: "strict",
    }).redirect('/profil'); // Redirige vers la page du profil
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in" });
  }
}

async function logout(req, res) {
  try {
    // Supprime le cookie d'authentification
    res.clearCookie("AuthToken").redirect('/'); // Supprime le cookie d'authentification et redirige vers la page d'accueil
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging out" });
  }
};
async function signup(req, res) {
  try {
    const { username, password, name, email } = req.body; // Récupère les données du formulaire d'inscription

    const confirmUsername = await query( // Vérifie si le nom d'utilisateur existe déjà
      "SELECT username, email FROM account WHERE username = ?",
      [username]
    );
 
    const confirmEmail = await query( // Vérifie si l'email existe déjà
      "SELECT email FROM account WHERE email = ?",
      [email]
    );

    if (confirmUsername.length > 0) { // Si le nom d'utilisateur existe déjà, renvoie une erreur
      return res.status(400).json({ error: "Username already exists" });
    } 
    if (confirmEmail.length > 0) { // Si l'email existe déjà, renvoie une erreur
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash le mot de passe avec 10 tours de salage

    await query( // Crée un nouvel utilisateur
      "INSERT INTO account (email, username, password, name) VALUES  (?, ?, ?, ?)",
      [email, username, hashedPassword, name]
    );

    res.redirect("/login");

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error signing up" });
  }
}


module.exports = { 
  login,
  logout,
  signup,
}; 
