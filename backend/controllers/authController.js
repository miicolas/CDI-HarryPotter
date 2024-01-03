// controllers/loginController.js
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function login(req, res) {
  try {
    const user = req.user; 
    const token = jwt.sign({ user }, "secretKey");
    res.cookie("AuthToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    }).redirect('/profil.html');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in" });
  }
}

async function logout(req, res) {
  try {
    // Supprime le cookie d'authentification
    res.clearCookie("AuthToken").redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging out" });
  }
};
async function signup(req, res) {
  try {
    const { username, password, name, email } = req.body;

    const confirmUsername = await query(
      "SELECT username, email FROM account WHERE username = ?",
      [username]
    );

    const confirmEmail = await query( 
      "SELECT email FROM account WHERE email = ?",
      [email]
    );

    if (confirmUsername.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }
    if (confirmEmail.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await query(
      "INSERT INTO account (email, username, password, name) VALUES  (?, ?, ?, ?)",
      [email, username, hashedPassword, name]
    );

    res.redirect("/");

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
