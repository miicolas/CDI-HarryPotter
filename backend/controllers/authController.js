// controllers/loginController.js
import { hashPassword } from "../lib/utils.js";
import { query } from "../config/queries.js";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  try { 
    const user = req.user; // Récupère l'utilisateur authentifié par le middleware authenticateToken 
    const token = jwt.sign({ user }, "secretKey"); // Crée un token avec l'utilisateur authentifié
    console.log(token);
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

export async function logout(req, res) {
  try {
    // Supprime le cookie d'authentification
    res.clearCookie("AuthToken").redirect('/'); // Supprime le cookie d'authentification et redirige vers la page d'accueil
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur dans la déconnexion" });
  }
};
export async function signup(req, res) {
  try {
    const { username, password, name, email } = req.body; // Récupère les données du formulaire d'inscription

    const confirmUsername = await query( // Vérifie si le nom d'utilisateur existe déjà
      "SELECT username, email FROM Users WHERE username = ?",
      [username]
    );
 
    const confirmEmail = await query( // Vérifie si l'email existe déjà
      "SELECT email FROM Users WHERE email = ?",
      [email]
    );

    if (confirmUsername.length > 0) { // Si le nom d'utilisateur existe déjà, renvoie une erreur
      return res.status(400).json({ error: "L'utilisateur existe déjà" });
    } 
    if (confirmEmail.length > 0) { // Si l'email existe déjà, renvoie une erreur
      return res.status(400).json({ error: "L'email existe déjà" });
    }

    const hashedPassword = await hashPassword(password); // Hash le mot de passe entré par l'utilisateur

    await query( // Crée un nouvel utilisateur
      "INSERT INTO Users (email, username, password, name) VALUES  (?, ?, ?," +
        " ?)",
      [email, username, hashedPassword, name]
    );

    res.redirect("/login.html");

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de l'inscription" });
  }
}
