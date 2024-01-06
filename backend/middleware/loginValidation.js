// middleware/loginValidation.js
const bcrypt = require("bcrypt");
const { query } = require("../config/queries");


async function validateLogin(req, res, next) {
  try {
    const { email, password } = req.body; // Récupère les données de l'utilisateur depuis le corps de la requête

    const result = await query("SELECT * FROM account WHERE email = ?", [ // Vérifie si l'email existe dans la base de données
      email,
    ]);

    if (result.length === 0) { // Si l'email n'existe pas dans la base de données
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const hashedPassword = result[0].password;  // Récupère le mot de passe hashé depuis la base de données

    const validPassword = await bcrypt.compare(password, hashedPassword); // Compare le mot de passe entré par l'utilisateur avec le mot de passe hashé
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    req.user = result[0]; // Ajoute les données de l'utilisateur à l'objet req
    next(); // Passe au middleware ou à la fonction suivante si la connexion est valide
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in" });
  }
}

module.exports = validateLogin;
