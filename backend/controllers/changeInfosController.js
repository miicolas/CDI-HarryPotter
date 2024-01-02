const { hash } = require("bcrypt");
const { query } = require("../config/queries");

async function updateProfilInfos(req, res) {
  try {
    const userId = req.user.id;
    let { username, password, name, email } = req.body;

    const confirmUsername = await query("SELECT * FROM account WHERE username = ?", [username]);
    const confirmEmail = await query("SELECT * FROM account WHERE email = ?", [email]);

    const user = await query("SELECT * FROM account WHERE id = ?", [userId]);

    // Check if the username is already taken by another user
    if (confirmUsername.length > 0 && username !== user[0].username) {
        return res.status(400).json({ error: "Username already exists" });
    }
    // Check if the email is already taken by another user
    if (confirmEmail.length > 0 && email !== user[0].email ) { 
        return res.status(400).json({ error: "Email already exists" });
    }
    

    let queryStr = "UPDATE account SET ";
    const values = [];

    if (username && username !== user[0].username) {
      queryStr += "username = ?, ";
      values.push(username);
    }

    if (password && password.length > 7) {
      const hashedPassword = await hash(password, 10);
      queryStr += "password = ?, ";
      values.push(hashedPassword);
    }

    if (name && name !== user[0].name) {
      queryStr += "name = ?, ";
      values.push(name);
    }

    if (email && email !== user[0].email) {
      queryStr += "email = ?, ";
      values.push(email);
    }

    // Retrait de la virgule finale et ajout de la clause WHERE
    queryStr = queryStr.slice(0, -2); // Pour enlever la dernière virgule et l'espace
    queryStr += " WHERE id = ?";
    values.push(userId);

    await query(queryStr, values);

    res.redirect("/settings");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating user profile" });
  }
}

module.exports = { updateProfilInfos };
