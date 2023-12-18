const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { query } = require("../js/queries");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/signup", async (req, res) => {
  try {

    const { username, password, name } = req.body;
    const confirmUsername = await query(
      "SELECT username FROM account WHERE username = ?",
      [username]
    );
  
    if (!(username.length > 0) || !(password.length > 7) || !(name.length>0)) { // Check if username and password are valid
      if (!(password.length > 8)) { // Check if password is at least 8 characters
        return res
          .status(400)
          .json({ error: "Password must be at least 8 characters" });
      }
      if (!(username.length > 0)) { // Check if username is valid
        return res.status(400).json({ error: "Invalid username" }); 
      }
      if (!(name.length>0)) { // Check if username is valid
        return res.status(400).json({ error: "Invalid name" }); 
      }
      return res.status(400).json({ error: "Invalid username" }); 
    }
    if (confirmUsername.length > 0) { // Check if username already exists
      return res.status(400).json({ error: "Username already exists" }); 
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before storing it

    const result = await query(
      "INSERT INTO account (username, password, name) VALUES  (?, ?, ?)",
      [username, hashedPassword, name] // Store the hashed password in the database
    );
    res.redirect("/"); // Redirect to the homepage

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding data" });
  }
});

module.exports = router;
