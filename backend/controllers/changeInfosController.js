const hash = require ("../lib/utils")
const { query } = require("../config/queries");

async function updateProfilInfos(req, res) { 
  try {
    const userId = req.user.id;
    let { username, password, name, email } = req.body;

    const user = await query("SELECT * FROM users WHERE id = ?", [userId]);

    if ((!username) && (!password) && (!name) && (!email)) { //
      return res.status(400).json({ error: "Aucun changement" });
    }
    else {
      if (username && username !== user[0].username) {
        await query("UPDATE Users SET username = ? WHERE id = ?", [username, userId]);
      }
      if (password && password.length > 7) {
        const hashedPassword = await hash.hashPassword(password);
        if (hashedPassword === user[0].password) {
          return res.status(400).json({ error: "Le mot de passe n'a pas" +
                " changé" });
        }
        await query("UPDATE Users SET password = ? WHERE id = ?", [hashedPassword, userId]);
      }
      if (name && name !== user[0].name) {
        await query("UPDATE Users SET name = ? WHERE id = ?", [name, userId]);
      } 
      if (email && email !== user[0].email) {
        await query("UPDATE Users SET email = ? WHERE id = ?", [email, userId]);
      }
    }

    res.redirect('/settings')
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur dans la mise à jour du profil" });
  }
}

module.exports = { updateProfilInfos };