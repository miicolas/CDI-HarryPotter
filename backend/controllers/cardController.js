// controllers/profilController.js
const { query } = require("../config/queries");

async function getAllCards(req, res) {
  try {
    const userLoggedIn = req.cookies.AuthToken || req.user;
    const cards = await query("SELECT image, altText, house FROM cards");
    res.render('index', { userLoggedIn, cards });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
}
}

module.exports = {
  getAllCards,
};
