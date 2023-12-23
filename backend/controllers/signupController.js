// controllers/signupController.js

const bcrypt = require("bcrypt");
const { query } = require("../config/queries");

async function signup(req, res) {
  try {
    const { username, password, name } = req.body;

    const confirmUsername = await query(
      "SELECT username FROM account WHERE username = ?",
      [username]
    );

    if (confirmUsername.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await query(
      "INSERT INTO account (username, password, name) VALUES  (?, ?, ?)",
      [username, hashedPassword, name]
    );

    res.redirect("/");

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error signing up" });
  }
}

module.exports = {
  signup,
};
