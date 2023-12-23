// middleware/loginValidation.js
const bcrypt = require("bcrypt");
const { query } = require("../config/queries");

async function validateLogin(req, res, next) {
  try {
    const { username, password } = req.body;

    const result = await query("SELECT * FROM account WHERE username = ?", [
      username,
    ]);

    if (result.length === 0) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const hashedPassword = result[0].password; 

    const validPassword = await bcrypt.compare(password, hashedPassword);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    req.user = result[0]; // Ajoute les données de l'utilisateur à l'objet req
    next(); // Passe au middleware ou à la fonction suivante si la connexion est valide
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in" });
  }
}

module.exports = validateLogin;
