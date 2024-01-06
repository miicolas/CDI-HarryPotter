// controllers/profilController.js
const { query } = require("../config/queries");

async function getAllCards(req, res) {
  try {
    const cards = await query("SELECT image, altText, house FROM cards"); // Récupère toutes les cartes de la base de données
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
}
}

module.exports = {
  getAllCards,
};
