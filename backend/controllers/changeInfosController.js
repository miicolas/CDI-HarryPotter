const { hash } = require("bcrypt");
const { query } = require("../config/queries");

async function updateProfilInfos(req, res) { 
  try {
    const userId = req.user.id;
    let { username, password, name, email } = req.body;

    const user = await query("SELECT * FROM account WHERE id = ?", [userId]);

    if ((!username) && (!password) && (!name) && (!email)) { //
      return res.status(400).json("No changes were made");
    }
    else {
      if (username && username !== user[0].username) {
        await query("UPDATE account SET username = ? WHERE id = ?", [username, userId]);
      }
      if (password && password.length > 7) {
        const hashedPassword = await hash(password, 10);
        await query("UPDATE account SET password = ? WHERE id = ?", [hashedPassword, userId]);
      }
      if (name && name !== user[0].name) {
        await query("UPDATE account SET name = ? WHERE id = ?", [name, userId]);
      } 
      if (email && email !== user[0].email) {
        await query("UPDATE account SET email = ? WHERE id = ?", [email, userId]);
      }
    }

    res.redirect('/settings')
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating user profile" });
  }
}

module.exports = { updateProfilInfos };