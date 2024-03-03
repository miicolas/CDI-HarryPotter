// controllers/profilController.js
import { query } from "../config/queries.js";

export async function getAllCards(req, res) {
  try {
    console.log("getAllCards");
    const cards = await query("SELECT id_card, name , house FROM db.cards"); // Récupère toutes les cartes de la base de données
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
}
}

export async function getCard(req, res) {
  try {
    const cardId = req.query.card;
    console.log("getCard", cardId);
    const card = await query("SELECT * FROM db.cards WHERE id_card = ?", [cardId]); // Récupère une carte spécifique de la base de données
    res.status(200).json({
      name : card[0].name,
      house : card[0].house,
      image : card[0].image,
      description : card[0].description,
      power : card[0].power,
      rarity : card[0].rarity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
}