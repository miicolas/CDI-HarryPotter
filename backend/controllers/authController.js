// controllers/loginController.js
import { hashPassword } from "../lib/utils.js";
import { query } from "../config/queries.js";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  try { 
    const user = req.user; // Récupère l'utilisateur authentifié par le middleware authenticateToken 
    const token = jwt.sign({ user }, "secretKey"); // Crée un token avec l'utilisateur authentifié
    res.cookie("AuthToken", token, { // Crée un cookie avec le token
      httpOnly: true,  
      secure: false, 
      sameSite: "strict", 
      expires: 0 ,
    }).redirect('/dashboard'); // Redirige vers la page du profil
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
    const { username_signup, password_signup, email_signup } = req.body;

    const confirmUsername = await query("SELECT username, email FROM Users WHERE username = ?", [username_signup]);
    const confirmEmail = await query("SELECT email FROM Users WHERE email = ?", [email_signup]);

    if (confirmUsername.length > 0) {
      return res.status(400).json({ error: "L'utilisateur existe déjà" });
    } 
    if (confirmEmail.length > 0) {
      return res.status(400).json({ error: "L'email existe déjà" });
    }

    const hashedPassword = hashPassword(password_signup);

    await query(
      "INSERT INTO Users (email, username, password) VALUES (?, ?, ?)",
      [email_signup, username_signup, hashedPassword]
    );

    res.redirect("/signin.html");

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de l'inscription" });
  }
}
