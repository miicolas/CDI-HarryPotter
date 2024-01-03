// controllers/profilController.js
const { query } = require("../config/queries");
const path = require("path");

async function getAllCards(req, res) {
  try {
    const cards = await query("SELECT image, altText, house FROM cards");
    // res.sendFile(path.join(__dirname, "../../frontend/index.html"))
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
}
}

module.exports = {
  getAllCards,
};
