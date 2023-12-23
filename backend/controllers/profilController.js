// controllers/profilController.js
const { query } = require("../config/queries");

async function getProfil(req, res) {
  try {
    const userId = req.user.id // Récupération de l'id de l'utilisateur depuis le token
    

    const result = await query("SELECT username, name FROM account WHERE id = ?", [userId]);

    if (result.length === 0) {
      res.redirect('login');
    }

    res.render ('profil', {username: result[0].username, name: result[0].name});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error signing up" });
  }
}

module.exports = {
  getProfil,
};
