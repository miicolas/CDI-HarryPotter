// routes/login.js
const express = require("express");
const bcrypt = require("bcrypt");
const { query } = require("../js/queries");
const router = express.Router();

router.post("/login", async (req, res) => {
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

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in" });
  }
});

module.exports = router;
